"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, User } from "lucide-react";
import { useUserSubmissions } from "@/hooks/useUserSubmissions";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import featured1 from "@/assets/featured-1.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import type { StaticImageData } from "next/image";

function imgSrc(img: string | StaticImageData): string {
  return typeof img === "string" ? img : img.src;
}

const ProductsPageContent = () => {
  const { t } = useLanguage();
  const { data: userProducts } = useUserSubmissions("product");

  const products = [
    {
      image: "/daniel/acelera-stage.png",
      label: "🔥 Featured",
      title: "Método DSM Acelera",
      description: "Programa de treinamento completo por Daniel Ribeiro — estratégias de venda, branding digital e operação de dealership. Imersões presenciais, Protocolo Negociador e acesso à comunidade de lojistas.",
      cta: "Conhecer o Método",
      featured: true,
      href: "https://metododsm.com.br",
      speakerName: "Daniel Ribeiro",
      speakerSlug: "/speaker/daniel-ribeiro",
    },
    {
      image: featured1,
      label: t("products.spotlight"),
      title: t("products.premiumTitle"),
      description: t("products.premiumDesc"),
      cta: t("products.subscribe"),
      featured: true,
    },
    {
      image: news2,
      label: t("products.newLabel"),
      title: t("products.briefingTitle"),
      description: t("products.briefingDesc"),
      cta: t("products.signUp"),
    },
    {
      image: news3,
      label: t("products.popular"),
      title: t("products.podcastTitle"),
      description: t("products.podcastDesc"),
      cta: t("products.listenNow"),
    },
    {
      image: news1,
      label: t("products.comingSoon"),
      title: t("products.intelTitle"),
      description: t("products.intelDesc"),
      cta: t("products.joinWaitlist"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">

      <section className="pt-32 pb-16 px-6 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const }}
        >
          <span className="editorial-label block mb-2">{t("products.label")}</span>
          <h1 className="text-4xl md:text-6xl font-display font-black text-foreground tracking-tighter mb-4">
            {t("products.title")}
          </h1>
          <p className="text-lg text-muted-foreground font-body max-w-lg">
            {t("products.description")}
          </p>
        </motion.div>
      </section>

      <section className="px-6 pb-12 max-w-[1600px] mx-auto">
        <motion.div
          className="editorial-card group cursor-pointer relative"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="overflow-hidden rounded-l-[calc(0.75rem-4px)]">
              <img src={imgSrc(products[0].image)} alt={products[0].title} className="editorial-image aspect-[16/10] lg:aspect-auto lg:h-full" />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="editorial-badge mb-4 inline-flex w-fit">{products[0].label}</span>
              <h2 className="text-2xl md:text-3xl font-display font-black text-foreground tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">
                {products[0].title}
              </h2>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">{products[0].description}</p>
              <span className="inline-flex items-center gap-1.5 font-body text-sm font-bold text-foreground group-hover:text-primary transition-colors uppercase tracking-[0.1em]">
                {products[0].cta}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </span>
            </div>
          </div>
          <div className="highlight-line" />
        </motion.div>
      </section>

      {/* User-submitted products with priority */}
      {userProducts && userProducts.length > 0 && (
        <section className="px-6 pb-12 max-w-[1600px] mx-auto">
          <h2 className="font-display text-xl font-black text-foreground tracking-tight mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            {t("submit.community")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userProducts.map((item, i) => (
              <motion.div
                key={item.id}
                className="editorial-card group cursor-pointer relative border-primary/20"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const }}
                onClick={() => item.website && window.open(item.website, "_blank", "noopener,noreferrer")}
              >
                {item.image_url && (
                  <div className="overflow-hidden rounded-[calc(0.75rem-4px)]">
                    <img src={item.image_url} alt={item.title} className="editorial-image aspect-[3/2]" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="editorial-badge text-[9px] py-0.5 px-2 bg-primary/10 border-primary/30 text-primary">{t("submit.community")}</span>
                    {item.price && <span className="font-body text-xs font-bold text-primary">{item.price}</span>}
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                  {item.description && <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">{item.description}</p>}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 font-body text-xs font-bold text-foreground group-hover:text-primary transition-colors uppercase tracking-[0.1em]">
                      {item.cta_label || t("products.listenNow")}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-muted-foreground" />
                      <span className="font-body text-xs text-muted-foreground">{item.author_name}</span>
                    </div>
                  </div>
                </div>
                <div className="highlight-line" />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <section className="px-6 pb-20 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.slice(1).map((item, i) => (
            <motion.div
              key={i}
              className="editorial-card group cursor-pointer relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const }}
            >
              <div className="overflow-hidden rounded-[calc(0.75rem-4px)]">
                <img src={imgSrc(item.image)} alt={item.title} className="editorial-image aspect-[3/2]" />
              </div>
              <div className="p-5">
                <span className="editorial-badge text-[9px] py-0.5 px-2 mb-3">{item.label}</span>
                <h3 className="text-xl font-display font-bold text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">{item.description}</p>
                <span className="inline-flex items-center gap-1.5 font-body text-xs font-bold text-foreground group-hover:text-primary transition-colors uppercase tracking-[0.1em]">
                  {item.cta}
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </span>
              </div>
              <div className="highlight-line" />
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ProductsPageContent;
