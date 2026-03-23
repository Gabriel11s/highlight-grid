"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const SiteFooter = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <span className="font-display text-lg font-black text-foreground tracking-tight">
          NEWS
        </span>
        <div className="mt-4">
          <span className="font-body text-xs text-muted-foreground">© 2026 NEWS.</span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
