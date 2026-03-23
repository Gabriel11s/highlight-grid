"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Newspaper, CalendarPlus, Package, Send, Loader2 } from "lucide-react";

type ContentType = "news" | "event" | "product";

interface SubmitContentDialogProps {
  open: boolean;
  onClose: () => void;
  defaultType?: ContentType;
}

const SubmitContentDialog = ({ open, onClose, defaultType = "news" }: SubmitContentDialogProps) => {
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  const [type, setType] = useState<ContentType>(defaultType);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    url: "",
    category: "",
    author_name: "",
    author_email: "",
    event_date: "",
    event_end_date: "",
    location: "",
    address: "",
    hours: "",
    price: "",
    cta_label: "",
    website: "",
  });

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const resetForm = () => {
    setForm({
      title: "", description: "", image_url: "", url: "", category: "",
      author_name: "", author_email: "", event_date: "", event_end_date: "",
      location: "", address: "", hours: "", price: "", cta_label: "", website: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author_name.trim()) return;

    setLoading(true);
    const { error } = await supabase.from("user_submissions").insert({
      type,
      title: form.title.trim(),
      description: form.description.trim() || null,
      image_url: form.image_url.trim() || null,
      url: form.url.trim() || null,
      category: form.category.trim() || null,
      author_name: form.author_name.trim(),
      author_email: form.author_email.trim() || null,
      event_date: form.event_date ? new Date(form.event_date).toISOString() : null,
      event_end_date: form.event_end_date ? new Date(form.event_end_date).toISOString() : null,
      location: form.location.trim() || null,
      address: form.address.trim() || null,
      hours: form.hours.trim() || null,
      price: form.price.trim() || null,
      cta_label: form.cta_label.trim() || null,
      website: form.website.trim() || null,
    });

    setLoading(false);

    if (error) {
      toast({ title: t("submit.error"), variant: "destructive" });
    } else {
      toast({ title: t("submit.success") });
      queryClient.invalidateQueries({ queryKey: ["user_submissions"] });
      queryClient.invalidateQueries({ queryKey: ["upcoming_user_events"] });
      resetForm();
      onClose();
    }
  };

  const types: { key: ContentType; icon: typeof Newspaper; labelKey: string }[] = [
    { key: "news", icon: Newspaper, labelKey: "submit.typeNews" },
    { key: "event", icon: CalendarPlus, labelKey: "submit.typeEvent" },
    { key: "product", icon: Package, labelKey: "submit.typeProduct" },
  ];

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-black tracking-tight">
            {t("submit.title")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-body">
            {t("submit.description")}
          </DialogDescription>
        </DialogHeader>

        {/* Type selector */}
        <div className="flex gap-2 mb-4">
          {types.map(({ key, icon: Icon, labelKey }) => (
            <button
              key={key}
              type="button"
              onClick={() => setType(key)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border font-body text-sm font-semibold transition-all duration-200 ${
                type === key
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {t(labelKey)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Common fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-body text-sm font-semibold">{t("submit.authorName")} *</Label>
              <Input value={form.author_name} onChange={(e) => update("author_name", e.target.value)} required maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label className="font-body text-sm font-semibold">{t("submit.authorEmail")}</Label>
              <Input type="email" value={form.author_email} onChange={(e) => update("author_email", e.target.value)} maxLength={255} />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-body text-sm font-semibold">{t("submit.contentTitle")} *</Label>
            <Input value={form.title} onChange={(e) => update("title", e.target.value)} required maxLength={200} />
          </div>

          <div className="space-y-2">
            <Label className="font-body text-sm font-semibold">{t("submit.contentDesc")}</Label>
            <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={4} maxLength={2000} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-body text-sm font-semibold">{t("submit.imageUrl")}</Label>
              <Input type="url" value={form.image_url} onChange={(e) => update("image_url", e.target.value)} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label className="font-body text-sm font-semibold">{t("submit.category")}</Label>
              <Input value={form.category} onChange={(e) => update("category", e.target.value)} maxLength={50} />
            </div>
          </div>

          {/* Event-specific fields */}
          {type === "event" && (
            <div className="space-y-4 p-4 rounded-lg border border-border bg-muted/30">
              <h3 className="font-display font-bold text-sm text-foreground">{t("submit.eventDetails")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-body text-sm font-semibold">{t("submit.eventDate")} *</Label>
                  <Input type="datetime-local" value={form.event_date} onChange={(e) => update("event_date", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-sm font-semibold">{t("submit.eventEndDate")}</Label>
                  <Input type="datetime-local" value={form.event_end_date} onChange={(e) => update("event_end_date", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-body text-sm font-semibold">{t("submit.location")}</Label>
                  <Input value={form.location} onChange={(e) => update("location", e.target.value)} maxLength={200} />
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-sm font-semibold">{t("submit.address")}</Label>
                  <Input value={form.address} onChange={(e) => update("address", e.target.value)} maxLength={300} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-body text-sm font-semibold">{t("submit.hours")}</Label>
                  <Input value={form.hours} onChange={(e) => update("hours", e.target.value)} placeholder="9h - 18h" maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-sm font-semibold">{t("submit.website")}</Label>
                  <Input type="url" value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="https://..." />
                </div>
              </div>
            </div>
          )}

          {/* Product-specific fields */}
          {type === "product" && (
            <div className="space-y-4 p-4 rounded-lg border border-border bg-muted/30">
              <h3 className="font-display font-bold text-sm text-foreground">{t("submit.productDetails")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-body text-sm font-semibold">{t("submit.price")}</Label>
                  <Input value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="$49.99" maxLength={50} />
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-sm font-semibold">{t("submit.ctaLabel")}</Label>
                  <Input value={form.cta_label} onChange={(e) => update("cta_label", e.target.value)} placeholder="Buy Now" maxLength={50} />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm font-semibold">{t("submit.website")}</Label>
                <Input type="url" value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="https://..." />
              </div>
            </div>
          )}

          {/* News-specific fields */}
          {type === "news" && (
            <div className="space-y-2">
              <Label className="font-body text-sm font-semibold">{t("submit.articleUrl")}</Label>
              <Input type="url" value={form.url} onChange={(e) => update("url", e.target.value)} placeholder="https://..." />
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !form.title.trim() || !form.author_name.trim()}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-primary text-primary-foreground font-body text-sm font-bold tracking-[0.1em] uppercase rounded-lg hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {t("submit.publish")}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitContentDialog;
