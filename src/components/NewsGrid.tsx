"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import type { NewsArticle } from "@/lib/news-service";

interface NewsGridProps {
  articles?: NewsArticle[];
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const NewsGrid = ({ articles }: NewsGridProps) => {
  const { t } = useLanguage();
  const router = useRouter();
  const items = articles || [];

  if (items.length === 0) return null;

  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-10 py-16">
      {/* Section header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-1 h-8 bg-primary rounded-full" />
          <div>
            <span className="editorial-label block">{t("news.label")}</span>
            <h2 className="text-2xl md:text-3xl font-display font-black text-foreground tracking-tight">
              {t("news.title")}
            </h2>
          </div>
        </div>
        <button
          onClick={() => router.push("/stories")}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg text-muted-foreground font-body text-xs font-bold tracking-[0.1em] uppercase hover:border-foreground/20 hover:text-foreground transition-all duration-300"
        >
          View all
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid: 2 large + remaining small */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <motion.article
            key={item.id}
            className={`editorial-card group cursor-pointer relative ${
              i < 2 && items.length > 3 ? "lg:row-span-1" : ""
            }`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.08,
              duration: 0.5,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
          >
            {/* Image */}
            <div className="overflow-hidden rounded-t-[calc(0.75rem-1px)]">
              <img
                src={item.image_url || "/placeholder.svg"}
                alt={item.title}
                className={`editorial-image ${i < 2 ? "aspect-[16/10]" : "aspect-[3/2]"}`}
                onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="editorial-label">{item.category || "News"}</span>
                <span className="flex items-center gap-1 text-[10px] font-body text-muted-foreground/50">
                  <Clock className="w-2.5 h-2.5" />
                  {timeAgo(item.published_at)}
                </span>
              </div>

              <h3 className={`font-display font-bold text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-2 ${
                i < 2 ? "text-lg" : "text-base"
              }`}>
                {item.title}
              </h3>

              {i < 2 && item.description && (
                <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                  {item.description}
                </p>
              )}

              <div className="flex items-center justify-between">
                <span className="font-body text-[10px] font-semibold text-muted-foreground/60">
                  {item.source_name}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
            <div className="highlight-line" />
          </motion.article>
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="md:hidden mt-8 text-center">
        <button
          onClick={() => router.push("/stories")}
          className="inline-flex items-center gap-2 font-body text-sm font-bold text-primary"
        >
          View all stories <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default NewsGrid;
