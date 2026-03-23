"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

interface StorytellingHeroProps {
  name: string;
  tagline: string;
  image: string;
  brandColor?: string;
}

export default function StorytellingHero({ name, tagline, image, brandColor = "hsl(220 15% 20%)" }: StorytellingHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const nameWords = name.split(" ");

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background image */}
      <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 text-center px-6 max-w-4xl" style={{ opacity }}>
        {/* Animated tagline */}
        <motion.span
          className="inline-block font-body text-sm font-bold tracking-[0.3em] uppercase mb-6"
          style={{ color: brandColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {tagline}
        </motion.span>

        {/* Name with stagger reveal */}
        <h1 className="font-display font-black tracking-tighter leading-[0.85] mb-8">
          {nameWords.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block text-6xl md:text-8xl lg:text-[10rem] text-white"
              initial={{ opacity: 0, y: 60, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.5 + i * 0.15,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              {word}
              {i < nameWords.length - 1 && <span>&nbsp;</span>}
            </motion.span>
          ))}
        </h1>

        {/* Accent line */}
        <motion.div
          className="w-24 h-1 mx-auto rounded-full mb-8"
          style={{ backgroundColor: brandColor }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
