"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneInput } from "./PhoneInput";
import { matchFaq, getGreeting, getFallback, QUICK_QUESTIONS } from "../../lib/chatbot-faq";

type Message = {
  role: "user" | "bot";
  text: string;
  link?: { label: string; href: string };
};

const GATE_AFTER_MESSAGES = 3;
const GATE_PROMPT =
  "I'd love to keep helping — could you share your phone number (with country code) so we can stay in touch if you need more detail?";
const GATE_THANKS = "Thanks! Go ahead, ask me anything else.";

export function ChatBot({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: getGreeting() }]);
  const [input, setInput] = useState("");
  const [gateActive, setGateActive] = useState(false);
  const [gateDone, setGateDone] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneFull, setPhoneFull] = useState("");
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const [gateError, setGateError] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const showHero = userMessageCount === 0;

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, gateActive]);

  function pushBotReply(forText: string, nextMessages: Message[]) {
    const match = matchFaq(forText);
    const botMsg: Message = match
      ? { role: "bot", text: match.answer, link: match.link }
      : { role: "bot", text: getFallback() };
    const withReply = [...nextMessages, botMsg];
    setMessages(withReply);

    const newUserCount = nextMessages.filter((m) => m.role === "user").length;
    if (newUserCount >= GATE_AFTER_MESSAGES && !gateDone) {
      window.setTimeout(() => {
        setMessages((cur) => [...cur, { role: "bot", text: GATE_PROMPT }]);
        setGateActive(true);
      }, 450);
    }
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || gateActive) return;
    const next = [...messages, { role: "user" as const, text: trimmed }];
    setMessages(next);
    setInput("");
    window.setTimeout(() => pushBotReply(trimmed, next), 350);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  async function handlePhoneSubmit() {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 6) {
      setGateError("Enter a valid phone number.");
      return;
    }
    setGateError("");
    setGateSubmitting(true);
    try {
      const res = await fetch("/api/chatbot-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phoneFull,
          transcript: messages,
          source: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setGateError(data.error || "Something went wrong. Please try again.");
        setGateSubmitting(false);
        return;
      }
      setMessages((cur) => [...cur, { role: "user", text: phoneFull }, { role: "bot", text: GATE_THANKS }]);
      setGateActive(false);
      setGateDone(true);
    } catch {
      setGateError("Something went wrong. Please try again.");
    }
    setGateSubmitting(false);
  }

  return (
    <div className="chatbot-panel" role="dialog" aria-label="Meagle360 assistant chat">
      <div className="chatbot-header">
        <img src="/bot/meagle-bot-bust-transparent.webp" alt="" className="chatbot-header-avatar" />
        <div className="chatbot-header-text">
          <p className="chatbot-header-title">Meagle360 Assistant</p>
          <p className="chatbot-header-status">Usually replies instantly</p>
        </div>
        <button type="button" className="chatbot-close" onClick={onClose} aria-label="Close chat">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="chatbot-body" ref={bodyRef}>
        {showHero && (
          <div className="chatbot-hero">
            <img src="/bot/meagle-bot-full-transparent.webp" alt="" className="chatbot-hero-img" />
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`chatbot-msg chatbot-msg-${m.role}`}>
            <p>{m.text}</p>
            {m.link && (
              <a href={m.link.href} className="chatbot-msg-link">
                {m.link.label} →
              </a>
            )}
          </div>
        ))}

        {showHero && (
          <div className="chatbot-quick-questions">
            {QUICK_QUESTIONS.map((q) => (
              <button type="button" key={q} className="chatbot-chip" onClick={() => send(q)}>
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {gateActive ? (
        <div className="chatbot-gate">
          <PhoneInput
            required
            placeholder="Phone number"
            value={phone}
            onChange={(full, national) => {
              setPhone(national);
              setPhoneFull(full);
            }}
          />
          <button type="button" className="btn btn-primary chatbot-gate-submit" onClick={handlePhoneSubmit} disabled={gateSubmitting}>
            {gateSubmitting ? "Saving..." : "Continue"}
          </button>
          {gateError && <p className="chatbot-gate-error">{gateError}</p>}
        </div>
      ) : (
        <form className="chatbot-input-row" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ask a question..."
            aria-label="Your message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="chatbot-send" aria-label="Send" disabled={!input.trim()}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}
