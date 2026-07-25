"use client";

import { createContext, useContext, useRef, useState } from "react";
import { Toast } from "./Toast";

const ToastContext = createContext<(message: string) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState({ show: false, message: "" });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showToast(message: string) {
    setToast({ show: true, message });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setToast((t) => ({ ...t, show: false }));
    }, 3200);
  }

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toast show={toast.show} message={toast.message} />
    </ToastContext.Provider>
  );
}
