"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const FinalCTA = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-40 px-6 lg:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <span className="editorial-badge mb-6 inline-flex">{t("cta.label")}</span>
        <h2 className="text-4xl md:text-7xl font-display font-black text-foreground tracking-tighter mb-8 text-balance">
          {t("cta.title1")}
          <br />
          {t("cta.title2")}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground font-body mb-12 max-w-xl mx-auto text-pretty">
          {t("cta.description")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder={t("cta.emailPlaceholder")}
            className="w-full sm:w-96 px-6 py-5 bg-background border border-border rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          <button className="w-full sm:w-auto px-10 py-5 bg-primary text-primary-foreground font-body font-bold text-sm rounded-sm hover:bg-primary/90 transition-colors duration-200 uppercase tracking-[0.1em]">
            {t("cta.subscribe")}
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
