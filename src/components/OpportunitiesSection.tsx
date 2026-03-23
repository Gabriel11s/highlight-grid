"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";

const opportunities = [
  {
    image: news1,
    label: "Spotlight",
    title: "Enterprise AI Suite",
    description: "Next-generation intelligence platform for modern organizations.",
    cta: "Explore",
  },
  {
    image: news2,
    label: "New",
    title: "Data Sovereignty Cloud",
    description: "Full-stack cloud infrastructure with regional compliance built in.",
    cta: "Learn More",
  },
  {
    image: news3,
    label: "Limited",
    title: "Executive Advisory Program",
    description: "Exclusive access to strategic insights and senior leadership mentoring.",
    cta: "Apply Now",
  },
];

const OpportunitiesSection = () => {
  return (
    <section id="opportunities" className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24">
      <div className="mb-14">
        <span className="editorial-label block mb-2">Opportunities</span>
        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground tracking-tight">
          Products & Spotlight
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {opportunities.map((item, i) => (
          <motion.div
            key={i}
            className="editorial-card group cursor-pointer relative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="overflow-hidden rounded-[calc(0.75rem-4px)]">
              <img src={typeof item.image === "string" ? item.image : item.image.src} alt={item.title} className="editorial-image aspect-[3/2]" />
            </div>
            <div className="p-6">
              <span className="editorial-badge text-[9px] py-0.5 px-2 mb-4">{item.label}</span>
              <h3 className="text-xl font-display font-bold text-foreground tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5">
                {item.description}
              </p>
              <span className="inline-flex items-center gap-1.5 font-body text-xs font-bold text-foreground group-hover:text-primary transition-colors duration-200 uppercase tracking-[0.1em]">
                {item.cta}
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </span>
            </div>
            <div className="highlight-line" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OpportunitiesSection;
