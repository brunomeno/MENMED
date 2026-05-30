import { createClient } from "@supabase/supabase-js";

// Helper to sanitize strings from environment variables (e.g. removing quotes or handling empty placeholders)
const getEnvVar = (key: string, fallback: string): string => {
  const metaEnv = (import.meta as any).env;
  let value = metaEnv ? metaEnv[key] : "";
  
  if (typeof value !== "string") {
    return fallback;
  }
  
  // Clean quotes and trim spaces
  value = value.replace(/['"]/g, "").trim();
  
  // If the value is a placeholder or does not look like a proper value, use fallback
  if (!value || value.startsWith("MY_") || value.startsWith("YOUR_") || value === "undefined") {
    return fallback;
  }
  
  return value;
};

const supabaseUrlRaw = getEnvVar("VITE_SUPABASE_URL", "https://qdziocehobqvkrnzrbnd.supabase.co");
// Double check that it is a valid URL starting with http/https
let supabaseUrl = (supabaseUrlRaw.startsWith("http://") || supabaseUrlRaw.startsWith("https://")) 
  ? supabaseUrlRaw 
  : `https://${supabaseUrlRaw}`;

// Healing logic for truncated environment variable URLs
if (supabaseUrl === "https://qdziocehobq.supabase.co" || supabaseUrl === "https://qdziocehobq" || supabaseUrl.includes("qdziocehobq.supabase.co")) {
  supabaseUrl = "https://qdziocehobqvkrnzrbnd.supabase.co";
}

const supabaseAnonKey = getEnvVar("VITE_SUPABASE_ANON_KEY", "sb_publishable_TZbAdHfd5RtT2NMBn5zIKw_qoFOj9oa");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

