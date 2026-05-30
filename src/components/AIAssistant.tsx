import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, User, Loader2, Minimize2, Maximize2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the MENMED AI Medical Equipment Sales Assistant. Your role is to help hospitals, clinics, and laboratories procure physical medical hardware.

Key behaviors:
1. Professional, marketplace-focused, and knowledgeable about specific medical hardware.
2. Recommend specific equipment sales for clinics, ICU, and diagnostics (Ventilators, MRI machines, Glucometers, etc.).
3. Mention MENMED's direct supply chain and certified technician network.
4. If asked about pricing, explain that MENMED provides official quotes based on quantity and facility requirements.
5. Focus on the PHYSICAL HARDWARE and SALES, not abstract technology.
6. Do NOT give medical advice. Your focus is the EQUIPMENT SALES and PROCUREMENT.

Examples of equipment MENMED sells:
- MRI Machines: Lumax 3T High-Field System
- Ventilators: AeroForce V5 ICU Unit
- Glucometers: GlucoCheck Pro Analyzer
- Ultrasound Systems: ClearVortex V9 Diagnostics`;

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
    { role: 'assistant', text: "Welcome to MENMED Equipment Sales. I can help your hospital or clinic with official quotes for MRI machines, ICU Ventilators, or bulk diagnostic supplies like Glucometers. What are you looking for today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chat, setChat] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const initAI = () => {
    if (chat) return chat;
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const newChat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });
    setChat(newChat);
    return newChat;
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const currentChat = initAI();
      const response = await currentChat.sendMessage({ message: userMessage });
      const botResponse = response.text;
      setMessages(prev => [...prev, { role: 'assistant', text: botResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: "I apologize, I'm experiencing a technical connectivity issue. Please try again or contact our procurement hotline at +2348089770474." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[380px] h-[550px] overflow-hidden rounded-2xl shadow-2xl glass flex flex-col border border-slate-200"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-medical-600 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold">AI Assistant</div>
                  <div className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Procurement Support</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <Minimize2 size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 pb-10 space-y-4 bg-slate-50/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-medical-600 text-white rounded-tr-none' 
                      : 'bg-white shadow-sm border border-slate-200 text-slate-800 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white shadow-sm border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-medical-600" />
                    <span className="text-xs text-slate-500 font-medium">Assistant thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about MRI systems..."
                className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-medical-600 transition-all outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-2.5 bg-medical-600 text-white rounded-xl hover:bg-medical-700 transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-medical-600 text-white rounded-full shadow-xl shadow-medical-600/30 flex items-center justify-center relative group"
      >
        {isOpen ? <X size={28} /> : <Bot size={28} />}
        {!isOpen && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full" />
        )}
      </motion.button>
    </div>
  );
}
