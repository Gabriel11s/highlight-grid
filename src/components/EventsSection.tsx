"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar, Mic2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import danielRibeiro from "@/assets/daniel-ribeiro.jpg";

const events = [
  { date: "MAR 28", title: "FuelFest Tampa", location: "Tampa, FL", statusKey: "events.nextUp", featured: false },
  { date: "APR 04", title: "Bimmer Invasion West Palm Beach", location: "West Palm Beach, FL", statusKey: "events.confirmed", featured: false },
  { date: "APR 09–11", title: "Imersão Método DSM Acelera", location: "Alphaville, SP", statusKey: "events.confirmed", featured: false },
];

const EventsSection = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const heroImg = typeof danielRibeiro === "string" ? danielRibeiro : danielRibeiro.src;

  return (
    <section id="events" className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24">
      {/* Section header */}
      <div className="mb-14">
        <span className="editorial-label block mb-2">{t("section.upcoming")}</span>
        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground tracking-tight">{t("section.events")}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Featured Speaker Card — Daniel Ribeiro */}
        <motion.div
          className="lg:col-span-5 group cursor-pointer"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          onClick={() => router.push("/speaker/daniel-ribeiro")}
        >
          <div className="relative overflow-hidden rounded-2xl h-full min-h-[360px]">
            <img
              src={heroImg}
              alt="Daniel Ribeiro"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="relative z-10 h-full flex flex-col justify-end p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase bg-amber-500/20 border border-amber-500/30 text-amber-400 backdrop-blur-sm">
                  <Mic2 className="w-3 h-3" />
                  Featured Speaker
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight mb-1 group-hover:text-amber-400 transition-colors duration-300">
                Daniel Ribeiro
              </h3>
              <p className="font-body text-sm text-white/70 mb-3">
                CEO DSM Multimarcas · Método Acelera · Do Capão Redondo ao topo do mercado automotivo
              </p>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs text-white/50 font-body">
                  <Calendar className="w-3 h-3" />
                  Abr 9–11, 2026
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/50 font-body">
                  <MapPin className="w-3 h-3" />
                  Alphaville, SP
                </span>
              </div>

              <span className="inline-flex items-center gap-1.5 mt-4 font-body text-xs font-bold text-amber-400 tracking-[0.1em] uppercase group-hover:gap-2.5 transition-all">
                Ver perfil completo
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </motion.div>

        {/* Events list */}
        <div className="lg:col-span-7 space-y-4">
          {events.map((event, i) => (
            <motion.div
              key={i}
              className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 md:p-8 bg-card rounded-xl border border-border hover:border-primary/30 cursor-pointer transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              whileHover={{ y: -2 }}
              onClick={() => router.push(`/events?event=${encodeURIComponent(event.title)}`)}
            >
              <div className="md:w-28 shrink-0 text-center">
                <span className="block font-display text-2xl md:text-3xl font-black text-foreground leading-none">
                  {event.date.split(" ")[0]}
                </span>
                <span className="block font-body text-xs text-primary font-bold tracking-wider uppercase">
                  {event.date.split(" ")[1]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-display font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                  {event.title}
                </h3>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground font-body mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {event.location}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-body text-sm text-muted-foreground">{t(event.statusKey)}</span>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </motion.div>
          ))}

          {/* View all events CTA */}
          <motion.button
            className="w-full py-4 border border-border rounded-xl font-body text-sm font-bold text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-300 flex items-center justify-center gap-2"
            onClick={() => router.push("/events")}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Ver todos os eventos
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
