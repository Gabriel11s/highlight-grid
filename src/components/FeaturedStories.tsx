"use client";

import { motion } from "framer-motion";
import featured1 from "@/assets/featured-1.jpg";
import featured2 from "@/assets/featured-2.jpg";
import featured3 from "@/assets/featured-3.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const },
  }),
};

const FeaturedStories = () => {
  const { t } = useLanguage();

  return (
    <section id="stories" className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-12">
        <div>
          <span className="editorial-label block mb-2">{t("featured.label")}</span>
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground tracking-tight">
            {t("featured.title")}
          </h2>
        </div>
        <button className="hidden md:inline-flex px-5 py-2.5 border border-border text-muted-foreground font-body text-xs font-bold tracking-[0.1em] uppercase rounded-sm hover:border-foreground hover:text-foreground transition-colors duration-200">
          {t("featured.viewAll")}
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <motion.div
          className="col-span-12 lg:col-span-8 editorial-card group cursor-pointer relative"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <div className="overflow-hidden rounded-[calc(0.75rem-4px)]">
            <img src={typeof featured1 === "string" ? featured1 : featured1.src} alt="Corporate conference room" className="editorial-image aspect-[16/9]" />
          </div>
          <div className="p-6">
            <span className="editorial-badge mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {t("featured.live")}
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-black text-foreground tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">
              {t("featured.mainTitle")}
            </h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-2xl">
              {t("featured.mainDesc")}
            </p>
          </div>
          <div className="highlight-line" />
        </motion.div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <motion.div
            className="editorial-card group cursor-pointer relative flex-1"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <div className="overflow-hidden rounded-[calc(0.75rem-4px)]">
              <img src={typeof featured2 === "string" ? featured2 : featured2.src} alt="Premium office" className="editorial-image aspect-[4/3]" />
            </div>
            <div className="p-5">
              <span className="editorial-label block mb-2">{t("featured.innovation")}</span>
              <h3 className="text-lg font-display font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                {t("featured.innovTitle")}
              </h3>
            </div>
            <div className="highlight-line" />
          </motion.div>

          <motion.div
            className="editorial-card group cursor-pointer relative flex-1"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            <div className="overflow-hidden rounded-[calc(0.75rem-4px)]">
              <img src={typeof featured3 === "string" ? featured3 : featured3.src} alt="Geometric architecture" className="editorial-image aspect-[4/3]" />
            </div>
            <div className="p-5">
              <span className="editorial-label block mb-2">{t("featured.architecture")}</span>
              <h3 className="text-lg font-display font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                {t("featured.archTitle")}
              </h3>
            </div>
            <div className="highlight-line" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories;
