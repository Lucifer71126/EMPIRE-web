import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteContent } from "@/data/content";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "EMPIRE Ecosystem | 香港身份 × 财富 × 教育生态平台",
  description:
    "从香港身份开始，为高净值家庭、企业主及跨境客户提供身份、教育、财富、房产、传承及企业出海的一站式规划。"
};

function themeInitScript() {
  const theme = siteContent.theme;
  return `
    (function () {
      try {
        var config = ${JSON.stringify(theme)};
        var saved = localStorage.getItem("empire-theme-preference");
        var parsed = saved ? JSON.parse(saved) : null;
        var mode = parsed && parsed.mode ? parsed.mode : config.defaultMode;
        var manualTheme = parsed && parsed.theme ? parsed.theme : null;
        function systemTheme() {
          return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        function eastEightTheme() {
          var hour = Number(new Intl.DateTimeFormat("en-US", { timeZone: config.timeZone, hour: "2-digit", hour12: false }).format(new Date()));
          return hour >= config.dayStartHour && hour < config.nightStartHour ? "light" : "dark";
        }
        var resolved = mode === "manual" && manualTheme ? manualTheme : mode === "time" ? eastEightTheme() : systemTheme();
        document.documentElement.dataset.theme = resolved;
        document.documentElement.classList.toggle("empire-dark", resolved === "dark");
        document.documentElement.classList.toggle("empire-light", resolved === "light");
      } catch (error) {
        document.documentElement.dataset.theme = "light";
        document.documentElement.classList.add("empire-light");
      }
    })();
  `;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hans" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
