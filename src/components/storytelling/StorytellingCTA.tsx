"use client";

import { motion } from "framer-motion";
import { ArrowRight, Instagram, Linkedin, Globe, Youtube } from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.63a8.23 8.23 0 004.81 1.54V6.72a4.83 4.83 0 01-1.05-.03z" />
    </svg>
  );
}

interface SocialLink {
  platform: string;
  url: string;
}

interface StorytellingCTAProps {
  headline: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  socialLinks?: SocialLink[];
  brandColor?: string;
}

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  linkedin: Linkedin,
  website: Globe,
  tiktok: TikTokIcon,
  youtube: Youtube,
};

export default function StorytellingCTA({
  headline,
  description,
  ctaText,
  ctaHref,
  socialLinks = [],
  brandColor = "hsl(220 15% 45%)",
}: StorytellingCTAProps) {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[hsl(240_10%_4%)]" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-15 blur-[150px]"
        style={{ backgroundColor: brandColor }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-display font-black text-white tracking-tighter mb-6"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {headline}
        </motion.h2>

        <motion.p
          className="font-body text-lg text-white/60 leading-relaxed mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 text-white font-body font-bold text-sm tracking-[0.15em] uppercase rounded-lg hover:gap-4 transition-all duration-300 hover:shadow-2xl"
            style={{ backgroundColor: brandColor }}
          >
            {ctaText}
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Social links */}
        {socialLinks.length > 0 && (
          <motion.div
            className="flex items-center justify-center gap-4 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {socialLinks.map((link, i) => {
              const Icon = socialIcons[link.platform] || Globe;
              return (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
