import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, AlertCircle, Bot } from "lucide-react";
import { ChatMessage } from "../types";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Hi there! 🌸 I'm your Spotless Care Assistant. I can help answer questions about our background-checked crew, eco-friendly checklists, insurance guarantees, or help you calculate a quote. What can I do for you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when chats adjust
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setErrorStatus(null);
    const userMsg: ChatMessage = {
      role: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Map existing history to expected backend schema
      const historyPayload = messages.slice(1).map((m) => ({
        role: m.role === "model" ? "model" : "user",
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error("Could not parse server response properly.");
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: data.text || "I was unable to process that. Please contact support at support@spotlesshq.com.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (e: any) {
      console.error("Chat error:", e);
      setErrorStatus("Connection is experiencing high traffic. Please retry in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetClick = (presetText: string) => {
    handleSendMessage(presetText);
  };

  const presets = [
    "Are you fully insured & bonded?",
    "Do you use non-toxic eco products?",
    "What is your Satisfaction Guarantee?",
    "How much does a deep clean cost?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Expanded chat window */}
      {isOpen && (
        <div className="w-[320px] sm:w-[380px] h-[480px] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden mb-4 pointer-events-auto transition-transform duration-200">
          {/* Header */}
          <div className="bg-sky-600 text-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="p-1 px-2 rounded-lg bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-sm tracking-tight flex items-center gap-1.5">
                  Spotless Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                </h3>
                <p className="text-[10px] text-sky-100">AI Caretaker • Typically answers instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-sky-100 hover:text-white hover:bg-sky-700 rounded-lg transition-colors cursor-pointer"
              aria-label="Close chat window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages block */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            {messages.map((msg, idx) => {
              const isAssistant = msg.role === "model";
              return (
                <div
                  key={idx}
                  className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-xs ${
                      isAssistant
                        ? "bg-white text-slate-800 border border-slate-100"
                        : "bg-sky-600 text-white"
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                    <span
                      className={`text-[9px] block text-right mt-1.5 ${
                        isAssistant ? "text-slate-400" : "text-sky-200"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-800 border border-slate-100 rounded-2xl p-3 shadow-xs max-w-[85%] flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
                  </span>
                  <span className="text-xs text-slate-400">Assistant is typing...</span>
                </div>
              </div>
            )}

            {errorStatus && (
              <div className="flex justify-center">
                <div className="bg-rose-50 border border-rose-100 text-rose-700 rounded-xl p-2.5 text-xs flex items-center gap-1.5 max-w-[90%]">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorStatus}</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Preset Buttons for instant engagement */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 pointer-events-auto">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-yellow-500" /> Suggested questions
              </p>
              <div className="flex flex-wrap gap-1">
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePresetClick(preset)}
                    className="text-xs bg-white text-slate-700 hover:bg-sky-50 hover:text-sky-700 border border-slate-200 rounded-full px-2.5 py-1 text-left transition-colors font-medium cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="p-3 bg-white border-t border-slate-100 flex gap-2 pointer-events-auto"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask us anything about cleaning..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-800"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-2 px-3.5 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-14 h-14 bg-sky-600 sm:w-16 sm:h-16 hover:bg-sky-500 text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-150 relative"
        aria-label="Open support chat assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6 sm:w-8 sm:h-8" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8" />
            {/* Notification badge */}
            <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
          </>
        )}
      </button>
    </div>
  );
}
