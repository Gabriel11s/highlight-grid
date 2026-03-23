"use client";

import { motion } from "framer-motion";

interface Highlight {
  emoji: string;
  label: string;
}

interface HighlightReelProps {
  highlights: Highlight[];
  brandColor?: string;
}

export default function HighlightReel({ highlights, brandColor = "hsl(35 90% 55%)" }: HighlightReelProps) {
  // Duplicate for infinite scroll illusion
  const doubled = [...highlights, ...highlights];

  return (
    <section className="py-12 bg-[hsl(240_10%_4%)] overflow-hidden">
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((h, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 whitespace-nowrap"
          >
            <span className="text-lg">{h.emoji}</span>
            <span className="font-body text-sm font-semibold text-white/70 tracking-wide">
              {h.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
