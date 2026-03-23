"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxQuoteProps {
  quote: string;
  attribution?: string;
  brandColor?: string;
}

export default function ParallaxQuote({ quote, attribution, brandColor = "hsl(35 90% 55%)" }: ParallaxQuoteProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative py-40 px-6 overflow-hidden bg-[hsl(240_10%_4%)]">
      {/* Animated gradient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-[150px]"
        style={{ backgroundColor: brandColor }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div className="relative z-10 max-w-5xl mx-auto text-center" style={{ x, opacity }}>
        {/* Large decorative quote mark */}
        <span
          className="block font-display text-[12rem] md:text-[18rem] leading-none opacity-5 select-none -mb-32 md:-mb-48"
          style={{ color: brandColor }}
        >
          &ldquo;
        </span>

        <p className="font-display text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2] italic">
          {quote}
        </p>

        {attribution && (
          <span
            className="inline-block mt-8 font-body text-sm font-bold tracking-[0.2em] uppercase"
            style={{ color: brandColor }}
          >
            — {attribution}
          </span>
        )}
      </motion.div>
    </section>
  );
}
