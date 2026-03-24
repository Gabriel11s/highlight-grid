"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useDashboardData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import {
  ArrowLeft, Save, Loader2, User, Globe, Instagram, Youtube, Linkedin, MapPin, CheckCircle2,
} from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.63a8.23 8.23 0 004.81 1.54V6.72a4.83 4.83 0 01-1.05-.03z" />
    </svg>
  );
}

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { profile, loading: profileLoading, updateProfile } = useProfile(user?.id);

  const [form, setForm] = useState({
    full_name: "",
    bio: "",
    location: "",
    website: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    linkedin: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || "",
        bio: profile.bio || "",
        location: profile.location || "",
        website: profile.website || "",
        instagram: profile.instagram || "",
        tiktok: profile.tiktok || "",
        youtube: profile.youtube || "",
        linkedin: profile.linkedin || "",
      });
    }
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    const { error } = await updateProfile(form);
    setSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const Field = ({ label, icon: Icon, field, placeholder, type = "text" }: {
    label: string; icon: React.ElementType; field: keyof typeof form; placeholder: string; type?: string;
  }) => (
    <div>
      <label className="block font-body text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type={type}
          value={form[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          placeholder={placeholder}
          className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-28 pb-20 px-6 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/dashboard" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
          <h1 className="text-3xl font-display font-black text-foreground tracking-tight">Meu Perfil</h1>
          <p className="font-body text-sm text-muted-foreground mt-1">Edite suas informações públicas</p>
        </motion.div>

        {/* Avatar section */}
        <motion.div
          className="bg-card border border-border rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="flex items-center gap-5">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="w-20 h-20 rounded-full object-cover ring-2 ring-border" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-border">
                <User className="w-8 h-8 text-primary" />
              </div>
            )}
            <div>
              <p className="font-body text-sm font-medium text-foreground">{form.full_name || "Seu nome"}</p>
              <p className="font-body text-xs text-muted-foreground">{user.email}</p>
              <p className="font-body text-[10px] text-muted-foreground/60 mt-1">
                Membro desde {new Date(user.created_at).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Info pessoal */}
        <motion.div
          className="bg-card border border-border rounded-2xl p-6 mb-6 space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-display text-base font-bold text-foreground tracking-tight">Informações pessoais</h2>
          <Field label="Nome completo" icon={User} field="full_name" placeholder="Seu nome completo" />
          <div>
            <label className="block font-body text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Conte sobre você, sua trajetória e o que faz..."
              rows={4}
              className="w-full bg-card border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
            />
          </div>
          <Field label="Localização" icon={MapPin} field="location" placeholder="Ex: São Paulo, SP" />
        </motion.div>

        {/* Redes sociais */}
        <motion.div
          className="bg-card border border-border rounded-2xl p-6 mb-8 space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="font-display text-base font-bold text-foreground tracking-tight">Redes sociais</h2>
          <Field label="Website" icon={Globe} field="website" placeholder="https://seusite.com" type="url" />
          <Field label="Instagram" icon={Instagram} field="instagram" placeholder="@seuusuario" />
          <Field label="TikTok" icon={TikTokIcon} field="tiktok" placeholder="@seuusuario" />
          <Field label="YouTube" icon={Youtube} field="youtube" placeholder="@seucanal" />
          <Field label="LinkedIn" icon={Linkedin} field="linkedin" placeholder="linkedin.com/in/seuperfil" />
        </motion.div>

        {/* Save button */}
        <motion.div
          className="flex items-center justify-end gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {saved && (
            <motion.span
              className="flex items-center gap-1 font-body text-sm text-green-500"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <CheckCircle2 className="w-4 h-4" /> Salvo
            </motion.span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-body text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Salvando..." : "Salvar alterações"}
          </button>
        </motion.div>
      </main>
    </div>
  );
}
