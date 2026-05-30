import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs";
import dns from "dns";

// Prefer IPv4 DNS resolution for fetch connections to bypass potential IPv6 resolver timeouts in sandbox containers
dns.setDefaultResultOrder("ipv4first");

// Load local environment variables
dotenv.config();

const RAW_SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://qdziocehobqvkrnzrbnd.supabase.co";
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_TZbAdHfd5RtT2NMBn5zIKw_qoFOj9oa";

// Sanitize and heal known truncated configuration strings
function healSupabaseUrl(url: string): string {
  let clean = url.replace(/['"]/g, "").trim();
  if (!clean.startsWith("http")) {
    clean = `https://${clean}`;
  }
  if (clean === "https://qdziocehobq.supabase.co" || clean === "https://qdziocehobq" || clean.includes("qdziocehobq.supabase.co")) {
    return "https://qdziocehobqvkrnzrbnd.supabase.co";
  }
  return clean;
}

const cleanUrl = healSupabaseUrl(RAW_SUPABASE_URL);
const cleanKey = SUPABASE_ANON_KEY.replace(/['"]/g, "").trim();

const supabase = createClient(cleanUrl, cleanKey);

const LOCAL_DB_PATH = path.join(process.cwd(), "quotes_db.json");

// High-reliability local persistent file load for submissions if Supabase is offline/paused/unreachable
function loadFallbackQuotes(): any[] {
  try {
    if (fs.existsSync(LOCAL_DB_PATH)) {
      const fileData = fs.readFileSync(LOCAL_DB_PATH, "utf-8");
      if (fileData.trim()) {
        const parsed = JSON.parse(fileData);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    }
  } catch (err) {
    console.error("Failed to read quotes_db.json fallback, starting fresh:", err);
  }
  return [];
}

// Save backup data to disk
function saveFallbackQuotes(quotes: any[]) {
  try {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(quotes, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to quotes_db.json backup:", err);
  }
}

const localFallbackQuotes: any[] = loadFallbackQuotes();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse incoming JSON bodies
  app.use(express.json());

  // API to retrieve currently cached submissions
  app.get("/api/quote/fallback-list", (req, res) => {
    res.json({
      fallback_count: localFallbackQuotes.length,
      quotes: localFallbackQuotes
    });
  });

  // API endpoint for proxying quote request to Supabase (bypasses browser fetch blocks / CORS)
  app.post("/api/quote", async (req, res) => {
    try {
      const { full_name, organization, email, category, message } = req.body;

      if (!full_name || !organization || !email) {
        return res.status(400).json({ 
          error: "Missing required fields: full_name, organization, and email are required." 
        });
      }

      const quoteObject = {
        full_name,
        organization,
        email,
        category: category || "Other",
        message: message || "",
        created_at: new Date().toISOString()
      };

      // Always attempt to write to Supabase directly first
      try {
        const { data, error } = await supabase
          .from("quotes")
          .insert([
            {
              full_name: quoteObject.full_name,
              organization: quoteObject.organization,
              email: quoteObject.email,
              category: quoteObject.category,
              message: quoteObject.message
            }
          ])
          .select();

        if (error) {
          throw error;
        }

        console.log("Successfully logged quote directly to Supabase database!");
        return res.status(200).json({ success: true, fallback: false, data });
      } catch (supabaseError: any) {
        const errorMessage = supabaseError.message || String(supabaseError);
        const errCode = String(supabaseError.code || "");
        
        const isNetworkOrTimeout = 
          errorMessage.toLowerCase().includes("fetch") || 
          errorMessage.toLowerCase().includes("network") ||
          errorMessage.toLowerCase().includes("unreachable") ||
          errorMessage.toLowerCase().includes("dns") ||
          errorMessage.toLowerCase().includes("timeout") ||
          errCode === "ENOTFOUND" ||
          errCode === "ECONNREFUSED" ||
          errCode === "ETIMEDOUT" ||
          errCode === "EAI_AGAIN" ||
          errCode === "ECONNRESET";

        if (!isNetworkOrTimeout) {
          // This is a direct Postgres SQL error (such as a missing table or RLS policy violation).
          // Propagate this error back to the frontend so the user gets correct troubleshooting steps.
          console.error("Supabase SQL/Policy DB error:", supabaseError);
          return res.status(400).json({ 
            error: errorMessage, 
            code: errCode,
            details: supabaseError.details || null
          });
        }

        console.warn(`[Supabase Connection Offline] ${errorMessage}. Saving locally inside quotes_db.json fallback.`);
        
        // Save to server-side JSON backup
        localFallbackQuotes.push(quoteObject);
        saveFallbackQuotes(localFallbackQuotes);

        return res.status(200).json({ 
          success: true, 
          fallback: true, 
          data: [quoteObject],
          warning: `Saved securely to active server-side offline storage because Supabase is offline: ${errorMessage}`
        });
      }
    } catch (err: any) {
      return res.status(500).json({ error: err.message || "Internal Server Error" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", supabaseUrl: cleanUrl });
  });

  // Vite middleware setup for Development vs Production
  if (process.env.NODE_ENV !== "production") {
    console.log("Loading Vite in developer middleware mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static files from dist production directory...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running and listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
