"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface MomentoItem {
  src: string;
  caption: string;
  year?: string;
}

interface MomentosCarouselProps {
  title?: string;
  items: MomentoItem[];
  brandColor?: string;
}

export default function MomentosCarousel({
  title = "Momentos",
  items,
  brandColor = "hsl(35 90% 55%)",
}: MomentosCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  // Track scroll position for indicators + button visibility
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
    // Calculate active index
    const cardWidth = 300;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(idx, items.length - 1));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [items.length]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.55;
    scrollRef.current.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-[hsl(240_10%_4%)]">
      {/* Header */}
      <div className="px-6 max-w-7xl mx-auto mb-10">
        <div className="flex items-end justify-between">
          <motion.div style={{ x: titleX }}>
            <motion.h2
              className="text-4xl md:text-5xl font-display font-black tracking-tighter text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.h2>
            <motion.div
              className="h-1 w-16 rounded-full mt-3"
              style={{ backgroundColor: brandColor }}
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </motion.div>

          {/* Navigation arrows — desktop */}
          <motion.div
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Horizontal carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-5 overflow-x-auto px-6 pb-6 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {/* Left spacer */}
        <div className="flex-shrink-0 w-0 md:w-8 lg:w-16" />

        {items.map((item, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 snap-start group cursor-pointer relative"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.5,
              delay: Math.min(i * 0.05, 0.4),
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => setLightbox(i)}
          >
            <div className="relative w-[240px] md:w-[280px] lg:w-[320px] overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/5 group-hover:ring-white/15 transition-all duration-500">
              <div className="relative overflow-hidden">
                <motion.img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-auto min-h-[300px] max-h-[420px] object-contain"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 80%, color-mix(in srgb, ${brandColor} 15%, transparent) 0%, transparent 70%)`,
                  }}
                />

                {/* Year badge */}
                {item.year && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-sm text-[10px] font-bold tracking-[0.15em] uppercase text-white/70">
                    {item.year}
                  </div>
                )}

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-600 ease-out"
                  style={{ backgroundColor: brandColor }}
                />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Right spacer */}
        <div className="flex-shrink-0 w-4 md:w-8 lg:w-16" />
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {items.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? 24 : 6,
              backgroundColor: i === activeIndex ? brandColor : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setLightbox(null)}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

          <button
            className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-all"
            onClick={() => setLightbox(null)}
          >
            <X className="w-5 h-5" />
          </button>

          <button
            className="absolute left-4 md:left-8 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-all"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + items.length) % items.length); }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 md:right-8 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-all"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % items.length); }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <motion.div
            key={lightbox}
            className="relative z-40 max-w-[90vw] max-h-[85vh]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={items[lightbox].src}
              alt={items[lightbox].caption}
              className="max-w-full max-h-[80vh] object-contain rounded-xl"
            />
          </motion.div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 font-body text-xs text-white/30 tracking-[0.2em]">
            {lightbox + 1} / {items.length}
          </div>
        </motion.div>
      )}
    </section>
  );
}
