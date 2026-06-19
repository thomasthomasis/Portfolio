"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function PortfolioChat() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! Ask me anything about Thomas's portfolio." },
  ]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);

  // Tracks how far the keyboard has pushed the visual viewport up
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [open]);

  // Push chat above the software keyboard using the visualViewport API
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const onResize = () => {
      // Keyboard height = difference between layout viewport and visual viewport
      const offset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      setKeyboardOffset(offset);
    };

    vv.addEventListener("resize", onResize);
    vv.addEventListener("scroll", onResize);
    return () => {
      vv.removeEventListener("resize", onResize);
      vv.removeEventListener("scroll", onResize);
    };
  }, []);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const question = input;
    setInput("");
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question }),
    });

    const data = await response.json();
    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: data.answer ?? "Sorry, I couldn't answer that." },
    ]);
    setLoading(false);
  }

  // Bottom of the wrapper rises by the keyboard height so the chat stays visible
  const bottomPx = 24 + keyboardOffset;

  return (
    <div
      className="fixed right-3 sm:right-6 z-50 flex flex-col items-end"
      style={{ bottom: `${bottomPx}px` }}
    >
      {/* ── Chat window ─────────────────────────────────────────────────── */}
      {open && (
        <div className="
          mb-3
          w-[calc(100vw-24px)] sm:w-[360px]
          flex flex-col
          rounded-2xl
          border border-white/10
          bg-black/85 backdrop-blur-xl
          shadow-2xl overflow-hidden
          " style={{ height: "min(460px, 65dvh)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-white">Thomas AI</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/40 hover:text-white/80 transition-colors"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm leading-relaxed rounded-xl px-3 py-2.5 ${
                  msg.role === "user"
                    ? "bg-white/10 text-white ml-6 text-right"
                    : "bg-white/[0.06] text-white/80 mr-6"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bg-white/[0.06] rounded-xl px-3 py-2.5 mr-6 flex gap-1 items-center w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:300ms]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-white/10 flex gap-2 shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
              placeholder="Ask me something..."
              className="flex-1 bg-white/[0.07] text-white text-sm rounded-xl px-3 py-2.5 outline-none placeholder:text-white/30 focus:bg-white/10 transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ── Floating toggle button ───────────────────────────────────────── */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform"
      >
        {open ? <X size={18} /> : <MessageCircle size={20} />}
      </button>
    </div>
  );
}
