"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useUserPosts } from "@/hooks/useDashboardData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import {
  ArrowLeft, Plus, Loader2, FileText, Trash2, Edit3, Eye, EyeOff,
  X, Save, CheckCircle2, Clock, Tag, Palette,
} from "lucide-react";
import dynamic from "next/dynamic";
import type { PageDocument } from "@/lib/builder/schema";

const InlineBuilder = dynamic(() => import("@/components/builder/InlineBuilder"), { ssr: false });

const CATEGORIES = ["news", "market", "events", "opinion", "tutorial"];

export default function PostsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { posts, loading, createPost, updatePost, deletePost } = useUserPosts(user?.id);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", content: "", category: "news", image_url: "" });
  const [saving, setSaving] = useState(false);
  const [builderPostId, setBuilderPostId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [user, authLoading, router]);

  const resetForm = () => {
    setForm({ title: "", content: "", category: "news", image_url: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    if (editingId) {
      await updatePost(editingId, form);
    } else {
      await createPost({ ...form, status: "draft" });
    }
    setSaving(false);
    resetForm();
  };

  const startEdit = (p: typeof posts[0]) => {
    setForm({
      title: p.title,
      content: p.content || "",
      category: p.category || "news",
      image_url: p.image_url || "",
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const toggleStatus = async (p: typeof posts[0]) => {
    await updatePost(p.id, { status: p.status === "published" ? "draft" : "published" });
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
              <h1 className="text-3xl font-display font-black text-foreground tracking-tight">Meus Posts</h1>
              <p className="font-body text-sm text-muted-foreground mt-1">{posts.length} post{posts.length !== 1 && "s"}</p>
            </div>
            <button
              onClick={() => { resetForm(); setShowForm(true); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-body text-sm font-bold hover:opacity-90 transition-all"
            >
              <Plus className="w-4 h-4" /> Novo post
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
                <h2 className="font-display text-lg font-bold text-foreground">{editingId ? "Editar post" : "Novo post"}</h2>
                <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Título do post *"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-primary/50 transition-all"
              />
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Conteúdo do post... Escreva sua notícia, opinião ou tutorial"
                rows={8}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-primary/50 transition-all resize-none"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Categoria</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-primary/50 transition-all"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <input
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="URL da imagem de capa"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-primary/50 transition-all self-end"
                />
              </div>
              <div className="flex justify-end">
                <button onClick={handleSave} disabled={saving || !form.title.trim()}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-body text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-all">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {editingId ? "Atualizar" : "Criar post"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts list */}
        {posts.length === 0 && !showForm ? (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <p className="font-body text-muted-foreground mb-4">Nenhum post criado ainda</p>
            <button onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 font-body text-sm font-bold text-primary">
              <Plus className="w-4 h-4" /> Criar seu primeiro post
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((p, i) => (
              <motion.div
                key={p.id}
                className="bg-card border border-border rounded-2xl p-5 group hover:border-primary/20 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-body text-[10px] font-bold uppercase tracking-wider ${p.status === "published" ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"}`}>
                        {p.status === "published" ? <><CheckCircle2 className="w-3 h-3" /> Publicado</> : <><Clock className="w-3 h-3" /> Rascunho</>}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted font-body text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        <Tag className="w-3 h-3" /> {p.category}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground tracking-tight">{p.title}</h3>
                    {p.content && <p className="font-body text-sm text-muted-foreground mt-1 line-clamp-2">{p.content}</p>}
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                        <Eye className="w-3 h-3" /> {p.views} views
                      </span>
                      <span className="font-body text-xs text-muted-foreground">
                        {new Date(p.created_at).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => toggleStatus(p)} title={p.status === "published" ? "Despublicar" : "Publicar"}
                      className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                      {p.status === "published" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button onClick={() => startEdit(p)} title="Editar detalhes" className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setBuilderPostId(p.id)} title="Personalizar layout" className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary">
                      <Palette className="w-4 h-4" />
                    </button>
                    <button onClick={() => deletePost(p.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Visual Builder overlay */}
      {builderPostId && (
        <InlineBuilder
          contentType="post"
          initialDoc={{
            title: posts.find((p) => p.id === builderPostId)?.title || "Post",
            slug: builderPostId,
          }}
          onSave={async (doc: PageDocument) => {
            await updatePost(builderPostId, { builder_layout: JSON.stringify(doc) });
            setBuilderPostId(null);
          }}
          onClose={() => setBuilderPostId(null)}
        />
      )}
    </div>
  );
}
