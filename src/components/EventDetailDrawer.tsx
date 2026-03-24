"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Clock, ExternalLink, Users, Ticket, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import type { StaticImageData } from "next/image";

function imgSrc(img: string | StaticImageData | undefined): string {
  if (!img) return "/placeholder.svg";
  return typeof img === "string" ? img : img.src;
}

interface EventSpeaker { name: string; role: string; image: string | StaticImageData; profileUrl: string; }

export interface EventDetail {
  date: string; year: string; title: string; location: string; description: string;
  status: string; featured?: boolean; segment: string; image?: string | StaticImageData;
  fullDescription: string; address: string; hours: string; website: string;
  howToParticipate: string[]; highlights: string[]; ticketInfo: string;
  speaker?: EventSpeaker;
}

const segmentColors: Record<string, string> = {
  "Entusiastas": "text-primary", "Dealer / Usados": "text-emerald-600",
  "Collector / Luxo": "text-amber-600", "Off-road / Comunidade": "text-sky-600",
  "Visibilidade / Premium": "text-primary", "Institucional": "text-neutral-500",
};

const EventDetailDrawer = ({ event, onClose }: { event: EventDetail | null; onClose: () => void }) => {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <AnimatePresence>
      {event && (
        <>
          <motion.div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-xl bg-card shadow-2xl overflow-y-auto" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }}>
            {event.image && (
              <div
                className={`relative h-56 overflow-hidden ${event.speaker?.profileUrl ? "cursor-pointer" : ""}`}
                onClick={() => {
                  if (event.speaker?.profileUrl) {
                    onClose();
                    setTimeout(() => router.push(event.speaker!.profileUrl), 300);
                  }
                }}
              >
                <img src={imgSrc(event.image)} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {event.speaker?.profileUrl && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white/80 font-body text-xs font-medium">
                    <ExternalLink className="w-3 h-3" />
                    Ver perfil completo
                  </div>
                )}
              </div>
            )}
            <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg">
              <X className="w-5 h-5" />
            </button>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className={`font-body text-[10px] font-bold tracking-[0.15em] uppercase ${segmentColors[event.segment] || "text-muted-foreground"}`}>{event.segment}</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-bold tracking-[0.15em] uppercase bg-primary/10 border border-primary/20 text-primary">{event.status}</span>
              </div>
              <h2 className="text-3xl font-display font-black text-foreground tracking-tight mb-2">{event.title}</h2>
              <div className="flex flex-col gap-2 mb-6 text-muted-foreground">
                <span className="flex items-center gap-2 font-body text-sm"><Calendar className="w-4 h-4 text-primary" />{event.date}, {event.year}</span>
                <span className="flex items-center gap-2 font-body text-sm"><MapPin className="w-4 h-4 text-primary" />{event.address}</span>
                <span className="flex items-center gap-2 font-body text-sm"><Clock className="w-4 h-4 text-primary" />{event.hours}</span>
              </div>
              {event.speaker && (
                <div className="mb-6 p-4 rounded-xl bg-surface border border-border flex items-center gap-4 cursor-pointer hover:border-primary/30 hover:shadow-md transition-all duration-300" onClick={() => { onClose(); setTimeout(() => router.push(event.speaker!.profileUrl), 300); }}>
                  <img src={imgSrc(event.speaker.image)} alt={event.speaker.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20 shrink-0" />
                  <div>
                    <h4 className="font-display text-base font-bold text-foreground">{event.speaker.name}</h4>
                    <p className="font-body text-xs text-muted-foreground">{event.speaker.role}</p>
                  </div>
                </div>
              )}
              <div className="h-px bg-border mb-6" />
              <div className="mb-8">
                <h3 className="font-display text-lg font-bold text-foreground mb-3">{t("drawer.about")}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{event.fullDescription}</p>
              </div>
              {event.highlights.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-display text-lg font-bold text-foreground mb-3">{t("drawer.highlights")}</h3>
                  <ul className="space-y-2">{event.highlights.map((h, i) => (<li key={i} className="flex items-start gap-2 font-body text-sm text-muted-foreground"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />{h}</li>))}</ul>
                </div>
              )}
              <div className="mb-8">
                <h3 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2"><Users className="w-5 h-5 text-primary" />{t("drawer.howTo")}</h3>
                <ol className="space-y-3">{event.howToParticipate.map((step, i) => (<li key={i} className="flex items-start gap-3 font-body text-sm text-muted-foreground"><span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>{step}</li>))}</ol>
              </div>
              <div className="mb-8 p-4 rounded-xl bg-surface border border-border">
                <h3 className="font-display text-base font-bold text-foreground mb-2 flex items-center gap-2"><Ticket className="w-4 h-4 text-primary" />{t("drawer.tickets")}</h3>
                <p className="font-body text-sm text-muted-foreground">{event.ticketInfo}</p>
              </div>
              <a href={event.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-bold tracking-[0.1em] uppercase rounded-sm hover:bg-primary/90 transition-colors duration-200">
                <Globe className="w-4 h-4" />{t("drawer.visitSite")}<ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EventDetailDrawer;
