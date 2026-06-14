"use client";

import type { ReactNode } from "react";
import { AnnotationTool } from "@/components/AnnotationTool";
import { LanguageRuntime } from "@/components/LanguageRuntime";
import { ToastProvider } from "@/components/Toast";
import { VisualEditor } from "@/components/VisualEditor";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <LanguageRuntime />
      <AnnotationTool />
      <VisualEditor />
    </ToastProvider>
  );
}
