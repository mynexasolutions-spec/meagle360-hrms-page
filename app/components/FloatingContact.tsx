"use client";

import { useEffect, useState } from "react";
import { ChatBot } from "./ChatBot";

const TEASER_SHOW_DELAY_MS = 2500;
const TEASER_MESSAGE = "👋 Hi! Need help? Ask me anything about Meagle 360.";

export function FloatingContact() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);

  // The teaser stays on screen until the visitor dismisses it (the × button)
  // or opens the chat — no auto-hide timer.
  useEffect(() => {
    if (teaserDismissed || chatOpen) return;
    const showTimer = window.setTimeout(() => setShowTeaser(true), TEASER_SHOW_DELAY_MS);
    return () => window.clearTimeout(showTimer);
  }, [teaserDismissed, chatOpen]);

  function openChat() {
    setChatOpen(true);
    setShowTeaser(false);
    setTeaserDismissed(true);
  }

  function dismissTeaser(e: React.MouseEvent) {
    e.stopPropagation();
    setShowTeaser(false);
    setTeaserDismissed(true);
  }

  return (
    <>
      <div className="floating-contact">
        <div className="floating-bot-wrap">
          {showTeaser && (
            <div className="floating-teaser" role="status">
              <span>{TEASER_MESSAGE}</span>
              <button
                type="button"
                className="floating-teaser-close"
                onClick={dismissTeaser}
                aria-label="Dismiss"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          <button
            type="button"
            className="floating-btn floating-bot"
            aria-label={chatOpen ? "Close chat" : "Chat with Meagle360 assistant"}
            onClick={() => (chatOpen ? setChatOpen(false) : openChat())}
          >
            <video
              className="floating-bot-video"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/bot/meagle-bot-avatar-256.webp"
            >
              <source src="/bot/meagle-bot-avatar-512.mp4" type="video/mp4" />
            </video>
            <img className="floating-bot-still" src="/bot/meagle-bot-avatar-256.webp" alt="" />
          </button>
        </div>
        <a
          href="https://wa.me/918077313241"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn floating-whatsapp"
          aria-label="Chat with us on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.16c-.24.68-1.4 1.33-1.94 1.4-.5.07-1.12.1-1.81-.11-.42-.13-.95-.3-1.64-.6-2.88-1.24-4.76-4.12-4.9-4.31-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1.01-2.4.26-.29.57-.36.76-.36h.55c.18 0 .42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.32.02.52-.1.19-.15.31-.3.48-.15.17-.31.38-.44.5-.15.15-.3.31-.13.6.17.29.76 1.26 1.64 2.04 1.13 1.01 2.08 1.32 2.37 1.47.29.15.46.13.63-.05.17-.19.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.65.78 1.93.92.29.14.48.22.55.34.07.13.07.72-.17 1.4z" />
          </svg>
        </a>
      </div>

      {chatOpen && <ChatBot onClose={() => setChatOpen(false)} />}
    </>
  );
}
