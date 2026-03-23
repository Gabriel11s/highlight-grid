"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Brand {
  name: string;
  role: string;
  year: string;
  description: string;
  logo?: string;
  href?: string;
}

interface BrandShowcaseProps {
  title?: string;
  subtitle?: string;
  brands: Brand[];
  brandColor?: string;
}

export default function BrandShowcase({
  title = "Ecossistema",
  subtitle,
  brands,
  brandColor = "hsl(35 90% 55%)",
}: BrandShowcaseProps) {
  return (
    <section className="py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-black text-foreground tracking-tighter">
            {title}
          </h2>
          {subtitle && (
            <p className="font-body text-lg text-muted-foreground mt-4 max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brands.map((brand, i) => (
            <motion.div
              key={i}
              className="group relative p-8 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              {/* Year badge */}
              <div
                className="absolute -top-3 right-8 px-3 py-1 rounded-full text-xs font-body font-bold text-white tracking-wider"
                style={{ backgroundColor: brandColor }}
              >
                {brand.year}
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-xl"
                style={{ backgroundColor: brandColor }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-display font-black text-foreground tracking-tight">
                      {brand.name}
                    </h3>
                    <span
                      className="font-body text-xs font-bold tracking-[0.15em] uppercase"
                      style={{ color: brandColor }}
                    >
                      {brand.role}
                    </span>
                  </div>
                  {brand.href && (
                    <a
                      href={brand.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {brand.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
