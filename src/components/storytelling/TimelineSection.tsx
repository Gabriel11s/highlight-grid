"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  image?: string;
}

interface TimelineSectionProps {
  title?: string;
  items: TimelineItem[];
  brandColor?: string;
}

export default function TimelineSection({ title = "The Journey", items, brandColor = "hsl(220 15% 45%)" }: TimelineSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-display font-black text-foreground tracking-tighter text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {title}
        </motion.h2>

        <div className="relative">
          {/* Static line background */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          {/* Animated progress line */}
          <motion.div
            className="absolute left-6 md:left-1/2 top-0 w-px md:-translate-x-1/2 origin-top"
            style={{ height: lineHeight, backgroundColor: brandColor }}
          />

          {/* Timeline items */}
          <div className="space-y-16 md:space-y-32">
            {items.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {/* ─── MOBILE ─── */}
                  <div className="md:hidden relative flex items-start gap-6 pl-2">
                    <div className="relative z-10 flex-shrink-0 mt-2">
                      <motion.div
                        className="w-3 h-3 rounded-full border-2 bg-background"
                        style={{ borderColor: brandColor }}
                        whileInView={{ scale: [0, 1.3, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>
                    <div className="flex-1 pb-2">
                      {item.image && (
                        <motion.div
                          className="relative overflow-hidden rounded-xl mb-4 bg-zinc-900/30"
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-auto max-h-[300px] object-contain rounded-xl"
                          />
                        </motion.div>
                      )}
                      {!item.image && (
                        <span
                          className="font-display text-3xl font-black tracking-tighter block mb-1"
                          style={{ color: brandColor }}
                        >
                          {item.year}
                        </span>
                      )}
                      <h3 className="text-lg font-display font-bold text-foreground tracking-tight mt-1 mb-1">
                        {item.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* ─── DESKTOP ─── */}
                  <div className={`hidden md:flex relative items-center gap-10 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                    {/* Text side */}
                    <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
                      <span
                        className="font-display text-5xl font-black tracking-tighter"
                        style={{ color: brandColor }}
                      >
                        {item.year}
                      </span>
                      <h3 className="text-xl font-display font-bold text-foreground tracking-tight mt-2 mb-2">
                        {item.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-md inline-block">
                        {item.description}
                      </p>
                    </div>

                    {/* Center dot — larger with pulse */}
                    <div className="relative z-10 flex-shrink-0">
                      <motion.div
                        className="w-5 h-5 rounded-full border-[3px] bg-background shadow-lg"
                        style={{ borderColor: brandColor }}
                        whileInView={{ scale: [0, 1.4, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      />
                      {/* Pulse ring */}
                      <motion.div
                        className="absolute inset-[-4px] rounded-full opacity-0"
                        style={{ border: `2px solid ${brandColor}` }}
                        whileInView={{ opacity: [0, 0.5, 0], scale: [0.8, 1.5] }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                      />
                    </div>

                    {/* Image side (or spacer) */}
                    <div className="flex-1">
                      {item.image ? (
                        <motion.div
                          className="relative overflow-hidden rounded-2xl shadow-2xl bg-zinc-900/30"
                          initial={{ opacity: 0, x: isLeft ? 40 : -40, scale: 0.9 }}
                          whileInView={{ opacity: 1, x: 0, scale: 1 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-auto max-h-[400px] object-contain transition-transform duration-700 hover:scale-105 rounded-2xl"
                          />
                        </motion.div>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
