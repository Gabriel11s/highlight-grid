"use client";

import { motion } from "framer-motion";
import { Podcast, Newspaper, Tv, ExternalLink } from "lucide-react";

interface Mention {
  outlet: string;
  title: string;
  type: "podcast" | "article" | "video";
  date: string;
  href?: string;
}

interface MediaMentionsProps {
  title?: string;
  mentions: Mention[];
  brandColor?: string;
}

const typeIcons = {
  podcast: Podcast,
  article: Newspaper,
  video: Tv,
};

export default function MediaMentions({
  title = "Na Mídia",
  mentions,
  brandColor = "hsl(35 90% 55%)",
}: MediaMentionsProps) {
  return (
    <section className="py-32 px-6 bg-card">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-display font-black text-foreground tracking-tighter text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>

        <div className="space-y-4">
          {mentions.map((m, i) => {
            const Icon = typeIcons[m.type];
            return (
              <motion.div
                key={i}
                className="group flex items-center gap-5 p-5 rounded-xl border border-border bg-background hover:border-primary/20 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${brandColor}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: brandColor }} />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="block font-body text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1">
                    {m.outlet} · {m.date}
                  </span>
                  <span className="block font-body text-sm font-semibold text-foreground truncate">
                    {m.title}
                  </span>
                </div>

                {m.href && (
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-foreground transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
