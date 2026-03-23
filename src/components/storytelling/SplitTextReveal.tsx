"use client";

import { motion } from "framer-motion";

interface SplitTextRevealProps {
  topLine: string;
  bottomLine: string;
  description: string;
  brandColor?: string;
}

export default function SplitTextReveal({
  topLine,
  bottomLine,
  description,
  brandColor = "hsl(35 90% 55%)",
}: SplitTextRevealProps) {
  return (
    <section className="py-32 px-6 bg-background overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Large split text */}
        <div className="mb-12">
          <motion.h2
            className="font-display text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[0.9] text-foreground"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {topLine}
          </motion.h2>
          <motion.h2
            className="font-display text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[0.9]"
            style={{ color: brandColor }}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {bottomLine}
          </motion.h2>
        </div>

        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
