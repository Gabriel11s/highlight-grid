"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
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
      <div className="max-w-4xl mx-auto">
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
          {/* Static line background — left on mobile, center on desktop */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          {/* Animated progress line */}
          <motion.div
            className="absolute left-6 md:left-1/2 top-0 w-px md:-translate-x-1/2 origin-top"
            style={{ height: lineHeight, backgroundColor: brandColor }}
          />

          {/* Timeline items */}
          <div className="space-y-16 md:space-y-24">
            {items.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {/* MOBILE: single column, content to the right of the line */}
                  <div className="md:hidden relative flex items-start gap-6 pl-2">
                    {/* Dot */}
                    <div className="relative z-10 flex-shrink-0 mt-2">
                      <motion.div
                        className="w-3 h-3 rounded-full border-2 bg-background"
                        style={{ borderColor: brandColor }}
                        whileInView={{ scale: [0, 1.3, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <span
                        className="font-display text-3xl font-black tracking-tighter"
                        style={{ color: brandColor }}
                      >
                        {item.year}
                      </span>
                      <h3 className="text-lg font-display font-bold text-foreground tracking-tight mt-1 mb-1">
                        {item.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* DESKTOP: alternating left/right */}
                  <div
                    className={`hidden md:flex relative items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                  >
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

                    {/* Center dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <motion.div
                        className="w-4 h-4 rounded-full border-2 bg-background"
                        style={{ borderColor: brandColor }}
                        whileInView={{ scale: [0, 1.3, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />
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
