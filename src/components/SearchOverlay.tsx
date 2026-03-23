"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchItem {
  title: string;
  category: string;
  type: "story" | "event" | "product";
  path: string;
}

const allItems: SearchItem[] = [
  { title: "FuelFest Tampa", category: "Entusiastas", type: "event", path: "/events" },
  { title: "Bimmer Invasion West Palm Beach", category: "BMW / Performance", type: "event", path: "/events" },
  { title: "FIADA Used Car Summit", category: "Dealer / Usados", type: "event", path: "/events" },
  { title: "Barrett-Jackson Palm Beach", category: "Collector / Luxo", type: "event", path: "/events" },
  { title: "Formula 1 Miami Grand Prix", category: "Premium", type: "event", path: "/events" },
  { title: "NEWS Premium", category: "Product", type: "product", path: "/products" },
];

const typeLabels: Record<string, string> = { story: "Story", event: "Event", product: "Product" };

interface SearchOverlayProps { open: boolean; onClose: () => void; }

const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { t } = useLanguage();

  const results = query.length > 0
    ? allItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (open) { setQuery(""); setTimeout(() => inputRef.current?.focus(), 100); }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div className="fixed top-[20%] left-1/2 z-[70] w-full max-w-lg -translate-x-1/2" initial={{ opacity: 0, y: -20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.98 }}>
            <div className="mx-4 bg-surface border border-border rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("search.placeholder")} className="flex-1 bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground outline-none" />
                <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
              </div>
              {query.length > 0 && (
                <div className="max-h-72 overflow-y-auto py-2">
                  {results.length === 0 ? (
                    <p className="px-5 py-6 text-center text-sm text-muted-foreground font-body">No results for &quot;{query}&quot;</p>
                  ) : results.map((item, i) => (
                    <button key={i} onClick={() => { router.push(item.path); onClose(); }} className="w-full flex items-center gap-4 px-5 py-3 hover:bg-accent/50 transition-colors text-left group">
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm font-body font-medium text-foreground truncate group-hover:text-primary transition-colors">{item.title}</span>
                        <span className="text-xs text-muted-foreground font-body">{typeLabels[item.type]} · {item.category}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}
              {query.length === 0 && (
                <div className="px-5 py-6 text-center"><p className="text-xs text-muted-foreground font-body">Type to search · <kbd className="px-1.5 py-0.5 bg-background rounded text-[10px] border border-border">ESC</kbd> to close</p></div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
