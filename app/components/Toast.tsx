"use client";

export function Toast({ show, message }: { show: boolean; message: string }) {
  return (
    <div className={`toast${show ? " show" : ""}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      <span>{message}</span>
    </div>
  );
}
