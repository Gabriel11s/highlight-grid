"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, User, MapPin, Calendar } from "lucide-react";
import { useUserSubmissions } from "@/hooks/useUserSubmissions";
import { useLanguage } from "@/contexts/LanguageContext";

const UserContentSection = () => {
  const { data: submissions } = useUserSubmissions();
  const { t, language } = useLanguage();

  const dateLocale = language === "pt" ? "pt-BR" : language === "es" ? "es-ES" : language === "fr" ? "fr-FR" : language === "de" ? "de-DE" : language === "it" ? "it-IT" : language === "zh" ? "zh-CN" : language === "ja" ? "ja-JP" : language === "ko" ? "ko-KR" : language === "ar" ? "ar-SA" : "en-US";

  if (!submissions || submissions.length === 0) return null;

  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24">
      <div className="mb-14">
        <span className="editorial-label block mb-2">{t("submit.community")}</span>
        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground tracking-tight">
          {t("submit.community")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {submissions.slice(0, 6).map((item, i) => (
          <motion.article
            key={item.id}
            className="editorial-card group cursor-pointer relative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const }}
            onClick={() => {
              if (item.url) window.open(item.url, "_blank", "noopener,noreferrer");
              else if (item.website) window.open(item.website, "_blank", "noopener,noreferrer");
            }}
          >
            {item.image_url && (
              <div className="overflow-hidden rounded-[calc(0.75rem-4px)]">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="editorial-image aspect-[3/2]"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="editorial-badge text-[9px] py-0.5 px-2">
                  {item.type === "news" ? t("submit.typeNews") : item.type === "event" ? t("submit.typeEvent") : t("submit.typeProduct")}
                </span>
                {item.category && <span className="editorial-label">{item.category}</span>}
                {item.price && (
                  <span className="font-body text-xs font-bold text-primary">{item.price}</span>
                )}
              </div>
              <h3 className="text-lg font-display font-bold text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-2">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-3 line-clamp-2">
                  {item.description}
                </p>
              )}
              {item.type === "event" && item.event_date && (
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.event_date).toLocaleDateString(dateLocale, { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  {item.location && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  )}
                </div>
              )}
              <div className="flex items-center gap-2 mt-2">
                <User className="w-3 h-3 text-muted-foreground" />
                <span className="font-body text-xs text-muted-foreground">{item.author_name}</span>
              </div>
            </div>
            <div className="highlight-line" />
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default UserContentSection;
