"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax the title
  const titleX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-[hsl(240_10%_4%)]">
      {/* Header with parallax */}
      <div className="px-6 max-w-7xl mx-auto mb-12">
        <div className="flex items-end justify-between">
          <motion.div style={{ x: titleX }}>
            <motion.h2
              className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-white/10"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.h2>
            <motion.h3
              className="text-3xl md:text-4xl font-display font-black tracking-tighter text-white -mt-4 md:-mt-6"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.h3>
          </motion.div>

          {/* Navigation arrows */}
          <motion.div
            className="hidden md:flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Horizontal scroll carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-6 pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Left spacer */}
        <div className="flex-shrink-0 w-0 md:w-12" />

        {items.map((item, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 snap-center group cursor-pointer relative"
            initial={{ opacity: 0, y: 40, rotateY: -5 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => setLightbox(i)}
          >
            {/* Card */}
            <div className="relative w-[260px] md:w-[320px] lg:w-[360px] overflow-hidden rounded-2xl bg-zinc-900">
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <motion.img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/20 opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Year badge */}
                {item.year && (
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase text-white backdrop-blur-sm"
                    style={{ backgroundColor: `color-mix(in srgb, ${brandColor} 70%, transparent)` }}
                  >
                    {item.year}
                  </div>
                )}

                {/* Zoom icon on hover */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>

                {/* Caption that reveals on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-body text-sm text-white/90 leading-relaxed line-clamp-2">
                    {item.caption}
                  </p>
                </div>

                {/* Brand accent line */}
                <div
                  className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                  style={{ backgroundColor: brandColor }}
                />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Right spacer */}
        <div className="flex-shrink-0 w-4 md:w-12" />
      </div>

      {/* Scroll hint line */}
      <motion.div
        className="mt-8 mx-6 max-w-7xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="h-px bg-white/5" />
        <p className="font-body text-[10px] text-white/20 tracking-[0.3em] uppercase mt-3 text-center md:text-left">
          Arraste para explorar →
        </p>
      </motion.div>

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
            <p className="text-center font-body text-sm text-white/60 mt-4 max-w-md mx-auto">
              {items[lightbox].caption}
            </p>
          </motion.div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 font-body text-xs text-white/30 tracking-[0.2em]">
            {lightbox + 1} / {items.length}
          </div>
        </motion.div>
      )}
    </section>
  );
}
