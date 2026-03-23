"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import featured2 from "@/assets/featured-2.jpg";
import featured3 from "@/assets/featured-3.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <section className="relative min-h-[90vh] flex items-end pb-20 px-6 lg:px-10 pt-32">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/videos/newsroom-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto w-full">
        <motion.div
          className="grid grid-cols-12 gap-8 items-end"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const }}
        >
          <div className="col-span-12 lg:col-span-7">
            <span className="editorial-badge mb-6 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {t("hero.breaking")}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-foreground tracking-tighter mb-6 text-balance leading-[0.9]">
              {t("hero.title1")}
              <br />
              {t("hero.title2")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 text-pretty font-body leading-relaxed">
              {t("hero.description")}
            </p>
            <button
              onClick={() => router.push("/stories")}
              className="px-10 py-5 bg-foreground text-background font-body font-bold text-sm rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              {t("hero.readStory")}
            </button>
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col gap-5">
            <div className="editorial-card group cursor-pointer relative">
              <div className="flex gap-5 p-5">
                <div className="w-32 h-32 shrink-0 overflow-hidden rounded-lg">
                  <img src={typeof featured2 === "string" ? featured2 : featured2.src} alt="Tech workspace" className="editorial-image w-full h-full" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <span className="editorial-label block mb-2">{t("hero.technology")}</span>
                  <h3 className="text-base font-display font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300 leading-snug">
                    {t("hero.techTitle")}
                  </h3>
                </div>
              </div>
              <div className="highlight-line" />
            </div>

            <div className="editorial-card group cursor-pointer relative">
              <div className="flex gap-5 p-5">
                <div className="w-32 h-32 shrink-0 overflow-hidden rounded-lg">
                  <img src={typeof featured3 === "string" ? featured3 : featured3.src} alt="Architecture detail" className="editorial-image w-full h-full" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <span className="editorial-label block mb-2">{t("hero.climate")}</span>
                  <h3 className="text-base font-display font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300 leading-snug">
                    {t("hero.climateTitle")}
                  </h3>
                </div>
              </div>
              <div className="highlight-line" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
