import React, { useState, useRef, useEffect } from "react";
import { Message } from "../types";
import { MessageSquare, X, Send, Sparkles, User, HelpCircle, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { UI_TRANSLATIONS } from "../translations";

interface ChatBotProps {
  onPreFillLead: (serviceTitle: string, details: string) => void;
  language?: "es" | "en";
}

// Simple Helper to parse bold, lists, and linebreaks from Markdown in the AI text response
function renderFormatedMessage(text: string) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5 text-xs md:text-sm text-gray-800 leading-relaxed font-sans">
      {lines.map((line, idx) => {
        // Detect bullet points
        const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-") || line.trim().startsWith("*");
        let content = line;
        
        if (isBullet) {
          // Remove the indicator character
          content = line.replace(/^[•\-\*]\s*/, "");
        }

        // Process simple **bold** replacements
        const parts = content.split(/\*\*([\s\S]*?)\*\*/g);
        const parsedNode = parts.map((part, i) => {
          if (i % 2 === 1) {
            return <strong key={i} className="font-bold text-indigo-950">{part}</strong>;
          }
          return part;
        });

        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-2">
              <span className="text-indigo-500 font-bold select-none mt-0.5">•</span>
              <p className="flex-1">{parsedNode}</p>
            </div>
          );
        }

        // Return regular paragraph or space
        if (line.trim() === "") {
          return <div key={idx} className="h-2" />;
        }

        return <p key={idx}>{parsedNode}</p>;
      })}
    </div>
  );
}

export default function ChatBot({ onPreFillLead, language = "es" }: ChatBotProps) {
  const t = UI_TRANSLATIONS[language];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-msg",
      role: "model",
      text: "¡Hola! Bienvenido/a a **Estudio Creativo Web** 🚀\n\nSoy tu asistente virtual con inteligencia artificial. Te puedo orientar en el costo y características de nuestros servicios:\n\n• **Landing Pages**\n• **Diseño Web Profesional**\n• **Tienda Online (E-commerce)**\n• **Rediseño, SEO Básico o Branding**\n\n¿Tienes alguna duda sobre precios, plazos o te gustaría que agendemos una consultoría de diseño gratuita para tu negocio?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync initial greeting on language changes
  useEffect(() => {
    if (messages.length === 1 && (messages[0].id === "initial-msg" || messages[0].id === "initial-msg-en")) {
      setMessages([
        {
          id: language === "en" ? "initial-msg-en" : "initial-msg",
          role: "model",
          text: language === "en" ? (
            "Hi there! Welcome to **Estudio Creativo Web** 🚀\n\nI am your AI virtual assistant. I can guide you on the costs and features of our web solutions:\n\n• **Landing Pages**\n• **Professional Web Design**\n• **E-commerce Stores**\n• **Redesign, Basic SEO, or Brand Kits**\n\nDo you want to know about quotes, timelines, or schedule a free 15-minute consulting call for your business?"
          ) : (
            "¡Hola! Bienvenido/a a **Estudio Creativo Web** 🚀\n\nSoy tu asistente virtual con inteligencia artificial. Te puedo orientar en el costo y características de nuestros servicios:\n\n• **Landing Pages**\n• **Diseño Web Profesional**\n• **Tienda Online (E-commerce)**\n• **Rediseño, SEO Básico o Branding**\n\n¿Tienes alguna duda sobre precios, plazos o te gustaría que agendemos una consultoría de diseño gratuita para tu negocio?"
          ),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [language]);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Format previous messages as history for Gemini (max trailing messages for context efficiency)
    const historyContext = messages.slice(-8).map((m) => ({
      role: m.role,
      text: m.text,
    }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyContext,
          lang: language,
        }),
      });

      if (!response.ok) {
        throw new Error("Respuesta de servidor fallida");
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "model",
        text: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Detect if user provided contact details inside the chat to automatically prefill the main form
      // e.g. "Nombre: Carlos, Email: carlos@mail.com" or if the agent mentions registering their info
      if (textToSend.toLowerCase().includes("@") && textToSend.length > 10) {
        // Offer to load info into the contact form
        onPreFillLead(
          language === "en" ? "Chat Consult" : "Consulta por Chat",
          language === "en" ? `Copied from Chat conversation: "${textToSend}"` : `Copiado de conversación por Chat: "${textToSend}"`
        );
      }

    } catch (err) {
      console.error("Error communicating with general Chatbot API:", err);
      
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: "model",
        text: t.chatOfflineError,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmitInput = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const quickQuestions = language === "en" ? [
    { text: "How much does a website cost?", short: "💰 Pricing" },
    { text: "What is included in Basic SEO?", short: "🔍 What is SEO?" },
    { text: "How long does a Landing Page take?", short: "⏱️ Timelines" },
    { text: "I want a quote for an E-commerce store", short: "🛒 Quote Store" }
  ] : [
    { text: "¿Precios de las webs?", short: "💰 Precios" },
    { text: "¿Qué incluye el SEO Básico?", short: "🔍 ¿Qué es SEO?" },
    { text: "¿Cuánto tarda una Landing Page?", short: "⏱️ Plazos" },
    { text: "Quiero cotizar una Tienda Online", short: "🛒 Cotizar Tienda" }
  ];

  return (
    <>
      {/* Floating Action Circle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl hover:shadow-indigo-500/30 cursor-pointer border border-white/15"
          id="btn-chatbot-float"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} className="stroke-[2.5px]" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <MessageSquare size={22} className="stroke-[2.5px]" />
                {/* Visual Ping notifications alert */}
                <span className="absolute top-0 right-0 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Floating Chat Container Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            className="fixed bottom-24 right-4 md:right-6 w-[360px] md:w-[400px] h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col z-50 overflow-hidden"
            id="chatbot-container"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center text-indigo-400">
                  <Sparkles size={16} />
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight font-sans">
                    {t.chatIntroTitle}
                  </h4>
                  <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <span>•</span> Estudio Creativo Web
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Message Feed container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex gap-2 max-w-[85%]">
                    {msg.role !== "user" && (
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] mt-1 flex-shrink-0 font-bold h-fit shadow-sm">
                        ECW 
                      </div>
                    )}
                    <div className="flex flex-col">
                      <div
                        className={`p-3 rounded-2xl text-xs md:text-sm ${
                          msg.role === "user"
                            ? "bg-indigo-600 text-white rounded-tr-none"
                            : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-none"
                        }`}
                      >
                        {msg.role === "user" ? (
                          <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                        ) : (
                          renderFormatedMessage(msg.text)
                        )}
                      </div>
                      <span className={`text-[9px] text-gray-400 mt-1 px-1 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[80%]">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] mt-1 flex-shrink-0 font-bold h-fit spinner">
                      ECW
                    </div>
                    <div className="p-3 bg-white border border-gray-100 rounded-2xl rounded-tl-none text-xs text-gray-500 shadow-sm flex items-center gap-2 pr-5">
                      <span className="flex gap-1">
                        <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </span>
                      <span>{language === "en" ? "Analyzing..." : "Analizando..."}</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick action questions pills scroll */}
            <div className="px-3 py-2 bg-slate-50 border-t border-gray-100 flex gap-2 overflow-x-auto scrollbar-none flex-shrink-0">
              {quickQuestions.map((qq, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(qq.text)}
                  className="flex-shrink-0 px-2.5 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 text-[10px] font-semibold hover:border-indigo-400 hover:text-indigo-600 hover:shadow-sm transition-all cursor-pointer"
                >
                  {qq.short}
                </button>
              ))}
            </div>

            {/* Form Input Footer */}
            <form
              onSubmit={handleFormSubmitInput}
              className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 flex-shrink-0"
              id="chatbot-form"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chatInputPlaceholder}
                disabled={isLoading}
                className="flex-1 bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white text-xs py-2.5 px-3.5 rounded-xl outline-none text-gray-800 placeholder-gray-400 disabled:opacity-60 transition-all font-sans"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:hover:bg-indigo-600 cursor-pointer"
                id="btn-chatbot-send"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
