"use client";

interface BreakingItem {
  label: string;
  text: string;
}

interface BreakingBarProps {
  items?: BreakingItem[];
}

const fallbackItems: BreakingItem[] = [
  { label: "BREAKING", text: "Latest automotive news loading..." },
  { label: "TRENDING", text: "Stay tuned for market updates" },
];

const BreakingBar = ({ items }: BreakingBarProps) => {
  const displayItems = items && items.length > 0 ? items : fallbackItems;

  // Duplicate for infinite marquee
  const marqueeItems = [...displayItems, ...displayItems];

  return (
    <div className="w-full py-4 bg-surface border-y border-border overflow-hidden">
      <div className="flex gap-12 items-center animate-marquee whitespace-nowrap">
        {marqueeItems.map((item, i) => (
          <div key={i} className="flex items-center gap-4 shrink-0">
            <span className="text-primary font-body font-bold text-xs tracking-[0.15em] uppercase">
              {item.label}
            </span>
            <span className="text-foreground font-body font-medium text-sm line-clamp-1 max-w-[300px]">
              {item.text}
            </span>
            <span className="text-muted-foreground">/</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreakingBar;
