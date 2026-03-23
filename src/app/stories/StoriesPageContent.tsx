"use client";

import { motion } from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import { useNewsArticles } from "@/hooks/useNewsArticles";
import { useUserSubmissions } from "@/hooks/useUserSubmissions";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";

const StoriesPageContent = () => {
  const { data: articles, isLoading, error } = useNewsArticles(12);
  const { data: userNews } = useUserSubmissions("news");
  const { t, language } = useLanguage();

  const dateLocale = language === "pt" ? "pt-BR" : language === "es" ? "es-ES" : language === "fr" ? "fr-FR" : language === "de" ? "de-DE" : language === "it" ? "it-IT" : language === "zh" ? "zh-CN" : language === "ja" ? "ja-JP" : language === "ko" ? "ko-KR" : language === "ar" ? "ar-SA" : "en-US";

  const openArticle = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <div className="min-h-screen bg-background">

      <section className="pt-32 pb-16 px-6 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const }}
        >
          <span className="editorial-label block mb-2">{t("stories.label")}</span>
          <h1 className="text-4xl md:text-6xl font-display font-black text-foreground tracking-tighter mb-4">
            {t("stories.title")}
          </h1>
          <p className="text-lg text-muted-foreground font-body max-w-lg">
            {t("stories.description")}
          </p>
        </motion.div>
      </section>

      <section className="px-6 pb-20 max-w-[1600px] mx-auto">
        {isLoading && (
          <div className="space-y-8">
            <div className="editorial-card">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <Skeleton className="aspect-[16/10] rounded-l-[calc(0.75rem-4px)]" />
                <div className="p-8 space-y-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="editorial-card">
                  <Skeleton className="aspect-[3/2] rounded-[calc(0.75rem-4px)]" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <p className="text-muted-foreground font-body text-sm text-center py-12">
            {t("stories.error")}
          </p>
        )}

        {!isLoading && !error && articles && articles.length === 0 && (
          <p className="text-muted-foreground font-body text-sm text-center py-12">
            {t("stories.empty")}
          </p>
        )}

        {/* User-submitted news with priority */}
        {userNews && userNews.length > 0 && (
          <div className="mb-10">
            <h2 className="font-display text-xl font-black text-foreground tracking-tight mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              {t("submit.community")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {userNews.map((item, i) => (
                <motion.article
                  key={item.id}
                  className="editorial-card group cursor-pointer relative border-primary/20"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const }}
                  onClick={() => item.url && window.open(item.url, "_blank", "noopener,noreferrer")}
                >
                  {item.image_url && (
                    <div className="overflow-hidden rounded-[calc(0.75rem-4px)]">
                      <img src={item.image_url} alt={item.title} className="editorial-image aspect-[3/2]" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="editorial-badge text-[9px] py-0.5 px-2 bg-primary/10 border-primary/30 text-primary">{t("submit.community")}</span>
                      {item.category && <span className="editorial-label">{item.category}</span>}
                    </div>
                    <h3 className="text-base font-display font-bold text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-2">{item.title}</h3>
                    {item.description && <p className="text-sm text-muted-foreground font-body leading-relaxed mb-2 line-clamp-2">{item.description}</p>}
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3 text-muted-foreground" />
                      <span className="font-body text-xs text-muted-foreground">{item.author_name}</span>
                    </div>
                  </div>
                  <div className="highlight-line" />
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {!isLoading && !error && articles && articles.length > 0 && (
          <>
            <motion.article
              className="editorial-card group cursor-pointer relative mb-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const }}
              onClick={() => openArticle(articles[0].url)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="overflow-hidden rounded-l-[calc(0.75rem-4px)]">
                  <img
                    src={articles[0].image_url || "/placeholder.svg"}
                    alt={articles[0].title}
                    className="editorial-image aspect-[16/10] lg:aspect-auto lg:h-full"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  {articles[0].source_name && (
                    <span className="editorial-badge mb-4 inline-flex w-fit">{articles[0].source_name}</span>
                  )}
                  <span className="editorial-label block mb-2">{articles[0].category || t("news.category")}</span>
                  <h2 className="text-2xl md:text-3xl font-display font-black text-foreground tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">
                    {articles[0].title}
                  </h2>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4 line-clamp-3">
                    {articles[0].description}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="font-body text-xs text-muted-foreground tabular-nums">
                      {articles[0].published_at ? new Date(articles[0].published_at).toLocaleDateString(dateLocale, { month: "short", day: "numeric", year: "numeric" }) : ""}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </div>
              <div className="highlight-line" />
            </motion.article>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(1).map((item, i) => (
                <motion.article
                  key={item.id}
                  className="editorial-card group cursor-pointer relative"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const }}
                  onClick={() => openArticle(item.url)}
                >
                  <div className="overflow-hidden rounded-[calc(0.75rem-4px)]">
                    <img
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.title}
                      className="editorial-image aspect-[3/2]"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="editorial-label">{item.category || t("news.category")}</span>
                      {item.source_name && <span className="editorial-badge text-[9px] py-0.5 px-2">{item.source_name}</span>}
                    </div>
                    <h3 className="text-base font-display font-bold text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <span className="font-body text-xs text-muted-foreground tabular-nums">
                      {item.published_at ? new Date(item.published_at).toLocaleDateString(dateLocale, { month: "short", day: "numeric", year: "numeric" }) : ""}
                    </span>
                  </div>
                  <div className="highlight-line" />
                </motion.article>
              ))}
            </div>
          </>
        )}
      </section>

    </div>
  );
};

export default StoriesPageContent;
