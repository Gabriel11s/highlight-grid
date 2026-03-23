"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import type { NewsArticle } from "@/lib/news-service";

interface HeroCompactProps {
  articles: NewsArticle[];
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function HeroCompact({ articles }: HeroCompactProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const hasArticles = articles.length > 0;

  return (
    <section className="pt-24 pb-8 px-6 lg:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Masthead */}
        <motion.div
          className="flex items-center justify-between py-6 border-b border-border mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-red-500">
                Live
              </span>
            </div>
            <div className="w-px h-4 bg-border" />
            <span className="font-body text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <span className="hidden md:block font-body text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
            Automotive Intelligence
          </span>
        </motion.div>

        {hasArticles ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main featured article */}
            <motion.article
              className="lg:col-span-7 group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={() => window.open(articles[0].url, "_blank", "noopener,noreferrer")}
            >
              <div className="relative overflow-hidden rounded-xl mb-5">
                <img
                  src={articles[0].image_url || "/placeholder.svg"}
                  alt={articles[0].title}
                  className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                  <span className="editorial-badge bg-white/10 border-white/20 text-white backdrop-blur-sm">
                    {articles[0].category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-body font-bold text-white/70">
                    <Clock className="w-3 h-3" />
                    {timeAgo(articles[0].published_at)}
                  </span>
                </div>
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-[2.75rem] font-display font-black text-foreground tracking-tighter leading-[1.05] mb-3 group-hover:text-primary transition-colors duration-300">
                {articles[0].title}
              </h1>
              <p className="font-body text-base text-muted-foreground leading-relaxed line-clamp-2 mb-4 max-w-2xl">
                {articles[0].description}
              </p>
              <div className="flex items-center gap-3">
                <span className="font-body text-xs font-semibold text-muted-foreground">
                  {articles[0].source_name}
                </span>
                <span className="inline-flex items-center gap-1 font-body text-xs font-bold text-primary group-hover:gap-2 transition-all">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.article>

            {/* Sidebar — trending articles */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                  Trending Now
                </span>
              </div>

              <div className="space-y-0 divide-y divide-border">
                {articles.slice(1, 4).map((article, i) => (
                  <motion.article
                    key={article.id}
                    className="group cursor-pointer py-5 first:pt-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                    onClick={() => window.open(article.url, "_blank", "noopener,noreferrer")}
                  >
                    <div className="flex gap-4">
                      {/* Number */}
                      <span className="font-display text-4xl font-black text-muted-foreground/20 leading-none shrink-0 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="editorial-label">{article.category}</span>
                          <span className="text-[10px] font-body text-muted-foreground/50">
                            {timeAgo(article.published_at)}
                          </span>
                        </div>
                        <h3 className="font-display text-base font-bold text-foreground tracking-tight leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
                          {article.title}
                        </h3>
                        <span className="font-body text-[10px] font-semibold text-muted-foreground/60 mt-1.5 block">
                          {article.source_name}
                        </span>
                      </div>
                      {/* Thumbnail */}
                      {article.image_url && (
                        <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={article.image_url}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
                        </div>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* CTA to stories */}
              <motion.button
                className="mt-6 w-full py-4 border border-border rounded-xl font-body text-sm font-bold text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-300 flex items-center justify-center gap-2"
                onClick={() => router.push("/stories")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                View all stories
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        ) : (
          /* Empty state — no articles yet */
          <motion.div
            className="py-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-foreground tracking-tighter mb-4 leading-[0.9]">
              Automotive
              <br />
              <span className="text-primary">Intelligence</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              {t("hero.description")}
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => router.push("/stories")}
                className="px-8 py-4 bg-foreground text-background font-body font-bold text-sm tracking-[0.1em] uppercase rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Explore Stories
              </button>
              <button
                onClick={() => router.push("/events")}
                className="px-8 py-4 border border-border font-body font-bold text-sm tracking-[0.1em] uppercase rounded-lg text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-300"
              >
                Events
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
