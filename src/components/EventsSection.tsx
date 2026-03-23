"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

const events = [
  { date: "MAR 28", title: "FuelFest Tampa", location: "Tampa, FL", statusKey: "events.nextUp", featured: true },
  { date: "APR 04", title: "Bimmer Invasion West Palm Beach", location: "West Palm Beach, FL", statusKey: "events.confirmed" },
];

const EventsSection = () => {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <section id="events" className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24">
      <div className="mb-14">
        <span className="editorial-label block mb-2">{t("section.upcoming")}</span>
        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground tracking-tight">{t("section.events")}</h2>
      </div>
      <div className="space-y-5">
        {events.map((event, i) => (
          <motion.div
            key={i}
            className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-8 bg-surface rounded-xl border border-border hover:border-primary/30 cursor-pointer transition-all duration-300"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const }}
            whileHover={{ y: -2 }}
            onClick={() => router.push(`/events?event=${encodeURIComponent(event.title)}`)}
          >
            <div className="md:w-28 shrink-0 text-center">
              <span className="block font-display text-3xl font-black text-foreground leading-none">{event.date.split(" ")[0]}</span>
              <span className="block font-body text-xs text-primary font-bold tracking-wider uppercase">{event.date.split(" ")[1]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-display font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">{event.title}</h3>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground font-body mt-1"><MapPin className="w-3.5 h-3.5" />{event.location}</span>
            </div>
            <div className="flex items-center gap-4">
              {event.featured && (<span className="editorial-badge text-[9px] py-0.5 px-2"><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />{t("events.featured")}</span>)}
              <span className="font-body text-sm text-muted-foreground">{t(event.statusKey)}</span>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
