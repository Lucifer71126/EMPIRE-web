"use client";

import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react";

type ToastContextValue = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const timerRef = useRef<number | null>(null);

  const value = useMemo(
    () => ({
      showToast(nextMessage: string) {
        setMessage(nextMessage);
        if (timerRef.current) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => setMessage(""), 2500);
      }
    }),
    []
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {message ? (
        <div className="fixed bottom-5 left-4 right-4 z-[80] mx-auto max-w-md rounded-md border px-4 py-3 text-sm shadow-gold sm:left-auto sm:right-6" style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}>
          <span className="mr-2 font-semibold" style={{ color: "var(--gold)" }}>●</span>
          {message}
        </div>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}

export async function copyWechat(wechat: string, showToast: (message: string) => void) {
  try {
    await navigator.clipboard.writeText(wechat);
    showToast(`已复制微信号 ${wechat}，请前往微信粘贴搜索，并备注来意即可。`);
  } catch {
    showToast(`复制失败，请手动复制微信号：${wechat}`);
  }
}
