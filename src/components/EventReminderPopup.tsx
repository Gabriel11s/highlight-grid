"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useUpcomingUserEvents } from "@/hooks/useUserSubmissions";
import { useLanguage } from "@/contexts/LanguageContext";
import { CalendarClock, MapPin, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EventReminderPopup = () => {
  const { data: events } = useUpcomingUserEvents();
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState<string[]>([]);

  const dateLocale = language === "pt" ? "pt-BR" : language === "es" ? "es-ES" : language === "fr" ? "fr-FR" : language === "de" ? "de-DE" : language === "it" ? "it-IT" : language === "zh" ? "zh-CN" : language === "ja" ? "ja-JP" : language === "ko" ? "ko-KR" : language === "ar" ? "ar-SA" : "en-US";

  useEffect(() => {
    if (!events || events.length === 0) return;

    // Check sessionStorage for already dismissed
    const sessionDismissed = JSON.parse(sessionStorage.getItem("dismissed_event_reminders") || "[]");
    setDismissed(sessionDismissed);

    const activeEvents = events.filter((e) => !sessionDismissed.includes(e.id));
    if (activeEvents.length > 0) {
      const timer = setTimeout(() => setOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [events]);

  const handleDismiss = () => {
    if (events) {
      const ids = events.map((e) => e.id);
      const newDismissed = [...dismissed, ...ids];
      sessionStorage.setItem("dismissed_event_reminders", JSON.stringify(newDismissed));
      setDismissed(newDismissed);
    }
    setOpen(false);
  };

  const activeEvents = events?.filter((e) => !dismissed.includes(e.id)) || [];

  if (activeEvents.length === 0) return null;

  const getDaysUntil = (dateStr: string) => {
    const now = new Date();
    const eventDate = new Date(dateStr);
    const diff = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleDismiss()}>
      <DialogContent className="max-w-lg bg-background border-primary/20">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-black tracking-tight flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-primary" />
            {t("reminder.title")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-body">
            {t("reminder.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          <AnimatePresence>
            {activeEvents.map((event, i) => {
              const days = getDaysUntil(event.event_date!);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-lg border border-primary/20 bg-primary/5 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-[0.1em] uppercase bg-primary text-primary-foreground">
                          {days === 0
                            ? t("reminder.today")
                            : days === 1
                            ? t("reminder.tomorrow")
                            : `${days} ${t("reminder.daysLeft")}`}
                        </span>
                        <span className="text-xs text-muted-foreground font-body">
                          {t("reminder.by")} {event.author_name}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-foreground text-lg tracking-tight">
                        {event.title}
                      </h3>
                      {event.description && (
                        <p className="text-sm text-muted-foreground font-body line-clamp-2 mt-1">
                          {event.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 flex-wrap">
                        {event.location && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground font-body">
                          {new Date(event.event_date!).toLocaleDateString(dateLocale, {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  {event.website && (
                    <a
                      href={event.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-body font-bold text-primary hover:underline"
                    >
                      {t("reminder.viewMore")}
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <button
          onClick={handleDismiss}
          className="w-full mt-2 py-2.5 px-4 rounded-lg border border-border text-muted-foreground font-body text-sm font-semibold hover:border-foreground hover:text-foreground transition-colors"
        >
          {t("reminder.dismiss")}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default EventReminderPopup;
