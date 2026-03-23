import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Language = "en" | "pt" | "es" | "fr" | "de" | "it" | "zh" | "ja" | "ko" | "ar";

export function getDateLocale(language: Language): string {
  const localeMap: Record<Language, string> = {
    en: "en-US",
    pt: "pt-BR",
    es: "es-ES",
    fr: "fr-FR",
    de: "de-DE",
    it: "it-IT",
    zh: "zh-CN",
    ja: "ja-JP",
    ko: "ko-KR",
    ar: "ar-SA",
  };
  return localeMap[language] || "en-US";
}
