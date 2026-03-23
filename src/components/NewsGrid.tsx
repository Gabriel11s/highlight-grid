"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import type { NewsArticle } from "@/lib/news-service";

interface NewsGridProps {
  articles?: NewsArticle[];
}

const NewsGrid = ({ articles }: NewsGridProps) => {
  const { t, language } = useLanguage();

  const dateLocale =
    language === "pt" ? "pt-BR" :
    language === "es" ? "es-ES" :
    language === "fr" ? "fr-FR" :
    language === "de" ? "de-DE" :
    "en-US";

  const items = articles || [];
  const isEmpty = items.length === 0;

  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24">
      <div className="flex items-center justify-between mb-14">
        <div>
          <span className="editorial-label block mb-2">{t("news.label")}</span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground tracking-tight">
            {t("news.title")}
          </h2>
        </div>
      </div>

      {isEmpty && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="editorial-card">
              <Skeleton className="aspect-[3/2] rounded-[calc(0.75rem-4px)]" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isEmpty && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.article
              key={item.id}
              className="editorial-card group cursor-pointer relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                ease: [0.2, 0.8, 0.2, 1] as const,
              }}
              onClick={() =>
                window.open(item.url, "_blank", "noopener,noreferrer")
              }
            >
              <div className="overflow-hidden rounded-[calc(0.75rem-4px)]">
                <img
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.title}
                  className="editorial-image aspect-[3/2]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="editorial-label">
                    {item.category || t("news.category")}
                  </span>
                  {item.source_name && (
                    <span className="editorial-badge text-[9px] py-0.5 px-2">
                      {item.source_name}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-display font-bold text-foreground tracking-tight mb-3 group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-2">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                    {item.description}
                  </p>
                )}
                <span className="font-body text-xs text-muted-foreground tabular-nums">
                  {item.published_at
                    ? new Date(item.published_at).toLocaleDateString(
                        dateLocale,
                        { month: "short", day: "numeric", year: "numeric" }
                      )
                    : ""}
                </span>
              </div>
              <div className="highlight-line" />
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewsGrid;
