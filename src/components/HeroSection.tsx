"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import featured2 from "@/assets/featured-2.jpg";
import featured3 from "@/assets/featured-3.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -50]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-end pb-20 px-6 lg:px-10 pt-32 overflow-hidden"
    >
      {/* Parallax video background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: videoY }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[120%] object-cover opacity-30 dark:opacity-20"
        >
          <source src="/videos/newsroom-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background via-background/70 to-background/30" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/90 via-background/40 to-transparent" />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-[1600px] mx-auto w-full"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="grid grid-cols-12 gap-8 items-end">
          {/* Main heading */}
          <div className="col-span-12 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <span className="editorial-badge mb-6 inline-flex gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {t("hero.breaking")}
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-display font-black text-foreground tracking-tighter mb-6 text-balance leading-[0.88]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {t("hero.title1")}
              <br />
              <span className="text-primary">{t("hero.title2")}</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 text-pretty font-body leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <button
                onClick={() => router.push("/stories")}
                className="group px-10 py-5 bg-foreground text-background font-body font-bold text-sm tracking-[0.1em] uppercase rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center gap-3"
              >
                {t("hero.readStory")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => router.push("/events")}
                className="px-8 py-5 text-muted-foreground font-body font-bold text-sm tracking-[0.1em] uppercase rounded-lg border border-border hover:border-foreground/20 hover:text-foreground transition-all duration-300"
              >
                {t("nav.events")}
              </button>
            </motion.div>
          </div>

          {/* Side cards */}
          <motion.div
            className="col-span-12 lg:col-span-5 flex flex-col gap-4"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {[
              {
                img: typeof featured2 === "string" ? featured2 : featured2.src,
                label: t("hero.technology"),
                title: t("hero.techTitle"),
              },
              {
                img: typeof featured3 === "string" ? featured3 : featured3.src,
                label: t("hero.climate"),
                title: t("hero.climateTitle"),
              },
            ].map((card, i) => (
              <div
                key={i}
                className="editorial-card group cursor-pointer relative glow-hover"
                onClick={() => router.push("/stories")}
              >
                <div className="flex gap-5 p-5">
                  <div className="w-28 h-28 shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={card.img}
                      alt=""
                      className="editorial-image w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <span className="editorial-label block mb-2">
                      {card.label}
                    </span>
                    <h3 className="text-base font-display font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-2">
                      {card.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 mt-3 text-[10px] font-body font-bold text-muted-foreground/60 uppercase tracking-[0.15em] group-hover:text-primary transition-colors">
                      Read
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
                <div className="highlight-line" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Edition / date line */}
        <motion.div
          className="section-divider mt-16 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        />
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <span className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/40">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/40">
            Automotive Intelligence
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
