"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Mic, Newspaper, Radio } from "lucide-react";

interface MediaMention {
  outlet: string;
  title: string;
  type: "podcast" | "article" | "video";
  date: string;
  href?: string;
}

interface MediaMomentosProps {
  title?: string;
  mentions: MediaMention[];
  photos: string[];
  brandColor?: string;
}

const typeIcons = {
  podcast: Mic,
  article: Newspaper,
  video: Radio,
};

export default function MediaMomentosSection({
  title = "Na Mídia",
  mentions,
  photos,
  brandColor = "hsl(0 75% 50%)",
}: MediaMomentosProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* Photo mosaic background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-1 h-full opacity-[0.08]">
          {photos.concat(photos).concat(photos).slice(0, 24).map((src, i) => (
            <div key={i} className="overflow-hidden">
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[hsl(240_10%_4%)]" style={{ opacity: 0.92 }} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tighter">
            {title}
          </h2>
          <motion.div
            className="h-1 w-16 rounded-full mt-4 mx-auto"
            style={{ backgroundColor: brandColor }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </motion.div>

        {/* Media cards */}
        <div className="space-y-4">
          {mentions.map((m, i) => {
            const Icon = typeIcons[m.type] || Newspaper;
            const isLinked = !!m.href;
            const Wrapper = isLinked ? "a" : "div";
            const wrapperProps = isLinked
              ? { href: m.href, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Wrapper
                  {...wrapperProps}
                  className="group flex items-center gap-5 p-5 md:p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-white/15 hover:bg-white/[0.05] transition-all duration-400 cursor-pointer"
                >
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `color-mix(in srgb, ${brandColor} 15%, transparent)` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: brandColor }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="font-body text-xs font-bold tracking-[0.1em] uppercase"
                        style={{ color: brandColor }}
                      >
                        {m.outlet}
                      </span>
                      <span className="font-body text-[10px] text-white/30">
                        {m.date}
                      </span>
                    </div>
                    <h4 className="font-display text-sm md:text-base font-bold text-white/80 group-hover:text-white transition-colors truncate">
                      {m.title}
                    </h4>
                  </div>

                  {/* Arrow */}
                  {isLinked && (
                    <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors flex-shrink-0" />
                  )}
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
