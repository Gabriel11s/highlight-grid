"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Ticket } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface EventPromo {
  title: string;
  date: string;
  location: string;
  description: string;
  href: string;
  image?: string;
  ticketInfo?: string;
}

interface EventPromoSectionProps {
  title?: string;
  events: EventPromo[];
  brandColor?: string;
}

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
      };
    };
    setTimeLeft(calc());
    const interval = setInterval(() => setTimeLeft(calc()), 60000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-4">
      {Object.entries(timeLeft).map(([unit, val]) => (
        <div key={unit} className="text-center">
          <span className="block font-display text-3xl font-black text-foreground tabular-nums">
            {String(val).padStart(2, "0")}
          </span>
          <span className="block font-body text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function EventPromoSection({ title = "Upcoming Events", events, brandColor = "hsl(220 15% 45%)" }: EventPromoSectionProps) {
  return (
    <section className="py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-display font-black text-foreground tracking-tighter text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>

        <div className="space-y-8">
          {events.map((event, i) => (
            <motion.div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                {event.image && (
                  <div className="lg:col-span-2 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 lg:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className={`${event.image ? "lg:col-span-3" : "lg:col-span-5"} p-8 flex flex-col justify-center`}>
                  <Countdown targetDate={event.date} />

                  <h3 className="text-2xl font-display font-black text-foreground tracking-tight mt-6 mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-4 mb-6 flex-wrap">
                    <span className="flex items-center gap-1.5 font-body text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" style={{ color: brandColor }} />
                      {new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1.5 font-body text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" style={{ color: brandColor }} />
                      {event.location}
                    </span>
                  </div>

                  {event.ticketInfo && (
                    <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <Ticket className="w-4 h-4" style={{ color: brandColor }} />
                      <span className="font-body text-xs text-muted-foreground">{event.ticketInfo}</span>
                    </div>
                  )}

                  <Link
                    href={event.href}
                    className="inline-flex items-center gap-2 font-body text-sm font-bold tracking-[0.1em] uppercase group-hover:gap-3 transition-all"
                    style={{ color: brandColor }}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
