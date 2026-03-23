"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image?: string;
}

interface TestimonialsSectionProps {
  title?: string;
  testimonials: Testimonial[];
  brandColor?: string;
}

export default function TestimonialsSection({
  title = "What People Say",
  testimonials,
  brandColor = "hsl(220 15% 45%)",
}: TestimonialsSectionProps) {
  return (
    <section className="py-32 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-display font-black text-foreground tracking-tighter text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="relative p-8 rounded-2xl bg-background border border-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Quote className="w-8 h-8 mb-4 opacity-20" style={{ color: brandColor }} />
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-border"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: brandColor }}
                  >
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <span className="block font-body text-sm font-semibold text-foreground">
                    {t.name}
                  </span>
                  <span className="block font-body text-xs text-muted-foreground">
                    {t.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
