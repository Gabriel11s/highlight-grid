"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const breakingKeys = [
  { labelKey: "breaking.breaking", textKey: "breaking.1" },
  { labelKey: "breaking.trending", textKey: "breaking.2" },
  { labelKey: "breaking.featured", textKey: "breaking.3" },
  { labelKey: "breaking.new", textKey: "breaking.4" },
  { labelKey: "breaking.breaking", textKey: "breaking.1" },
  { labelKey: "breaking.trending", textKey: "breaking.2" },
  { labelKey: "breaking.featured", textKey: "breaking.3" },
  { labelKey: "breaking.new", textKey: "breaking.4" },
];

const BreakingBar = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full py-4 bg-surface border-y border-border overflow-hidden">
      <div className="flex gap-12 items-center animate-marquee whitespace-nowrap">
        {breakingKeys.map((item, i) => (
          <div key={i} className="flex items-center gap-4 shrink-0">
            <span className="text-primary font-body font-bold text-xs tracking-[0.15em] uppercase">
              {t(item.labelKey)}
            </span>
            <span className="text-foreground font-body font-medium text-sm">
              {t(item.textKey)}
            </span>
            <span className="text-muted-foreground">/</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreakingBar;
