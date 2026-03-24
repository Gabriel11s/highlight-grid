"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useUserEvents } from "@/hooks/useDashboardData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import {
  ArrowLeft, Plus, Loader2, Calendar, MapPin, Trash2, Edit3, Eye, EyeOff,
  X, Save, CheckCircle2, Clock,
} from "lucide-react";

export default function EventsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { events, loading, createEvent, updateEvent, deleteEvent } = useUserEvents(user?.id);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", date: "", location: "", ticket_url: "", ticket_info: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [user, authLoading, router]);

  const resetForm = () => {
    setForm({ title: "", description: "", date: "", location: "", ticket_url: "", ticket_info: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    if (editingId) {
      await updateEvent(editingId, form);
    } else {
      await createEvent({ ...form, status: "draft" });
    }
    setSaving(false);
    resetForm();
  };

  const startEdit = (e: typeof events[0]) => {
    setForm({
      title: e.title,
      description: e.description || "",
      date: e.date ? new Date(e.date).toISOString().slice(0, 16) : "",
      location: e.location || "",
      ticket_url: e.ticket_url || "",
      ticket_info: e.ticket_info || "",
    });
    setEditingId(e.id);
    setShowForm(true);
  };

  const toggleStatus = async (e: typeof events[0]) => {
    await updateEvent(e.id, { status: e.status === "published" ? "draft" : "published" });
  };

  if (authLoading || loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-28 pb-20 px-6 max-w-3xl mx-auto">
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/dashboard" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-black text-foreground tracking-tight">Meus Eventos</h1>
              <p className="font-body text-sm text-muted-foreground mt-1">{events.length} evento{events.length !== 1 && "s"}</p>
            </div>
            <button
              onClick={() => { resetForm(); setShowForm(true); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-body text-sm font-bold hover:opacity-90 transition-all"
            >
              <Plus className="w-4 h-4" /> Novo evento
            </button>
          </div>
        </motion.div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="bg-card border border-border rounded-2xl p-6 mb-8 space-y-4"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-foreground">{editingId ? "Editar evento" : "Novo evento"}</h2>
                <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Nome do evento *"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-primary/50 transition-all"
              />
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Descrição do evento"
                rows={3}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-primary/50 transition-all resize-none"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-primary/50 transition-all" />
                <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Local"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-primary/50 transition-all" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input value={form.ticket_url} onChange={(e) => setForm({ ...form, ticket_url: e.target.value })} placeholder="URL dos ingressos"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-primary/50 transition-all" />
                <input value={form.ticket_info} onChange={(e) => setForm({ ...form, ticket_info: e.target.value })} placeholder="Info de ingressos"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-primary/50 transition-all" />
              </div>
              <div className="flex justify-end">
                <button onClick={handleSave} disabled={saving || !form.title.trim()}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-body text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-all">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {editingId ? "Atualizar" : "Criar evento"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Events list */}
        {events.length === 0 && !showForm ? (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <p className="font-body text-muted-foreground mb-4">Nenhum evento criado ainda</p>
            <button onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 font-body text-sm font-bold text-primary">
              <Plus className="w-4 h-4" /> Criar seu primeiro evento
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((e, i) => (
              <motion.div
                key={e.id}
                className="bg-card border border-border rounded-2xl p-5 group hover:border-primary/20 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-body text-[10px] font-bold uppercase tracking-wider ${e.status === "published" ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"}`}>
                        {e.status === "published" ? <><CheckCircle2 className="w-3 h-3" /> Publicado</> : <><Clock className="w-3 h-3" /> Rascunho</>}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground tracking-tight">{e.title}</h3>
                    {e.description && <p className="font-body text-sm text-muted-foreground mt-1 line-clamp-2">{e.description}</p>}
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                      {e.date && (
                        <span className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" /> {new Date(e.date).toLocaleDateString("pt-BR")}
                        </span>
                      )}
                      {e.location && (
                        <span className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" /> {e.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => toggleStatus(e)} title={e.status === "published" ? "Despublicar" : "Publicar"}
                      className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                      {e.status === "published" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button onClick={() => startEdit(e)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteEvent(e.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
