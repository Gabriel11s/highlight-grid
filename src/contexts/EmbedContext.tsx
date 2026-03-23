"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";

interface EmbedContextValue {
  isEmbed: boolean;
  forcedTheme: "dark" | "light" | null;
  forcedLang: string | null;
}

const EmbedContext = createContext<EmbedContextValue>({
  isEmbed: false,
  forcedTheme: null,
  forcedLang: null,
});

export const useEmbed = () => useContext(EmbedContext);

export function EmbedProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const [isEmbed] = useState(() => searchParams.get("embed") === "true");
  const [forcedTheme] = useState<"dark" | "light" | null>(() => {
    const theme = searchParams.get("theme");
    return theme === "dark" || theme === "light" ? theme : null;
  });
  const [forcedLang] = useState<string | null>(() => searchParams.get("lang"));

  // Apply embed class to html element
  useEffect(() => {
    if (isEmbed) {
      document.documentElement.classList.add("embed-mode");
    }
    if (forcedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [isEmbed, forcedTheme]);

  // Auto-resize iframe for GHL
  useEffect(() => {
    if (!isEmbed) return;

    const sendHeight = () => {
      window.parent.postMessage(
        { type: "blamq-resize", height: document.body.scrollHeight },
        "*"
      );
    };

    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.body);
    sendHeight();

    return () => observer.disconnect();
  }, [isEmbed]);

  return (
    <EmbedContext.Provider value={{ isEmbed, forcedTheme, forcedLang }}>
      {children}
    </EmbedContext.Provider>
  );
}
