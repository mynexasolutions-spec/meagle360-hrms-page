"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneInput } from "./PhoneInput";
import {
  matchFaq,
  getGreeting,
  getFallback,
  getTopic,
  FAQ_TOPICS,
  FAQ_COUNT,
  QUICK_QUESTIONS,
} from "../../lib/chatbot-faq";

type Message = {
  role: "user" | "bot";
  text: string;
  link?: { label: string; href: string };
};

const GATE_AFTER_MESSAGES = 3;
const GATE_PROMPT =
  "I'd love to keep helping — could you share your name and phone number (with country code) so we can stay in touch if you need more detail?";
const GATE_THANKS = "Thanks! Go ahead, ask me anything else.";
// How many questions of a topic to list before the "Show all" chip.
const TOPIC_PREVIEW_COUNT = 8;

export function ChatBot({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: getGreeting() }]);
  const [input, setInput] = useState("");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [topicExpanded, setTopicExpanded] = useState(false);
  const [gateActive, setGateActive] = useState(false);
  const [gateDone, setGateDone] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneFull, setPhoneFull] = useState("");
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const [gateError, setGateError] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const showHero = userMessageCount === 0;
  const topic = activeTopic ? getTopic(activeTopic) : undefined;

  // Keep the latest message in view — but not on the very first render, so
  // the panel opens showing the greeting rather than scrolled past it to the
  // bottom of the topic menu.
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, gateActive, activeTopic, topicExpanded]);

  /** Adds the visitor's message, then the bot's, then opens the gate if due. */
  function respond(userText: string, botMsg: Message) {
    const next: Message[] = [...messages, { role: "user", text: userText }];
    setMessages(next);
    window.setTimeout(() => {
      setMessages([...next, botMsg]);
      const newUserCount = next.filter((m) => m.role === "user").length;
      if (newUserCount >= GATE_AFTER_MESSAGES && !gateDone) {
        window.setTimeout(() => {
          setMessages((cur) => [...cur, { role: "bot", text: GATE_PROMPT }]);
          setGateActive(true);
        }, 450);
      }
    }, 350);
  }

  /** Free-text question — answered through the keyword matcher. */
  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || gateActive) return;
    setInput("");
    const match = matchFaq(trimmed);
    respond(
      trimmed,
      match ? { role: "bot", text: match.answer, link: match.link } : { role: "bot", text: getFallback() }
    );
  }

  /** Tapped from the topic menu — answered with that exact FAQ, no matching. */
  function askFaq(faq: { q: string; a: string; link?: { label: string; href: string } }) {
    if (gateActive) return;
    respond(faq.q, { role: "bot", text: faq.a, link: faq.link });
  }

  function openTopic(id: string) {
    setActiveTopic(id);
    setTopicExpanded(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  async function handleGateSubmit() {
    const trimmedName = name.trim();
    const digits = phone.replace(/\D/g, "");
    if (!trimmedName) {
      setGateError("Please enter your name.");
      return;
    }
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
          name: trimmedName,
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
      setMessages((cur) => [
        ...cur,
        { role: "user", text: `${trimmedName} — ${phoneFull}` },
        { role: "bot", text: GATE_THANKS },
      ]);
      setGateActive(false);
      setGateDone(true);
    } catch {
      setGateError("Something went wrong. Please try again.");
    }
    setGateSubmitting(false);
  }

  const visibleQuestions = topic
    ? topicExpanded
      ? topic.questions
      : topic.questions.slice(0, TOPIC_PREVIEW_COUNT)
    : [];

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

        {/* The browsable menu stays available for the whole conversation. */}
        {!gateActive && (
          <div className="chatbot-suggestions">
            {topic ? (
              <>
                <div className="chatbot-suggest-head">
                  <button type="button" className="chatbot-back-chip" onClick={() => setActiveTopic(null)}>
                    ← All topics
                  </button>
                  <span className="chatbot-suggest-label">{topic.label}</span>
                </div>
                <div className="chatbot-quick-questions">
                  {visibleQuestions.map((faq) => (
                    <button type="button" key={faq.q} className="chatbot-chip" onClick={() => askFaq(faq)}>
                      {faq.q}
                    </button>
                  ))}
                  {!topicExpanded && topic.questions.length > TOPIC_PREVIEW_COUNT && (
                    <button type="button" className="chatbot-chip chatbot-chip-more" onClick={() => setTopicExpanded(true)}>
                      Show all {topic.questions.length} questions
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="chatbot-quick-questions">
                  {QUICK_QUESTIONS.map((q) => (
                    <button type="button" key={q} className="chatbot-chip" onClick={() => send(q)}>
                      {q}
                    </button>
                  ))}
                </div>
                <p className="chatbot-suggest-label">Browse {FAQ_COUNT} questions by topic</p>
                <div className="chatbot-topics">
                  {FAQ_TOPICS.map((t) => (
                    <button type="button" key={t.id} className="chatbot-topic-chip" onClick={() => openTopic(t.id)}>
                      {t.label}
                      <span className="chatbot-topic-count">{t.questions.length}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {gateActive ? (
        <div className="chatbot-gate">
          <input
            type="text"
            className="chatbot-gate-name"
            placeholder="Your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <PhoneInput
            required
            placeholder="Phone number"
            value={phone}
            onChange={(full, national) => {
              setPhone(national);
              setPhoneFull(full);
            }}
          />
          <button type="button" className="btn btn-primary chatbot-gate-submit" onClick={handleGateSubmit} disabled={gateSubmitting}>
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
