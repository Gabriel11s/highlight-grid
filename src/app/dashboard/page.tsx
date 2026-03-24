"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useProfile, useUserEvents, useUserPosts } from "@/hooks/useDashboardData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  User,
  Calendar,
  FileText,
  BarChart3,
  ArrowRight,
  LogOut,
  Loader2,
  Eye,
  TrendingUp,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function DashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const { profile, loading: profileLoading } = useProfile(user?.id);
  const { events, loading: eventsLoading } = useUserEvents(user?.id);
  const { posts, loading: postsLoading } = useUserPosts(user?.id);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const displayName = profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0] || "Usuário";
  const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url;
  const publishedEvents = events.filter((e) => e.status === "published");
  const draftEvents = events.filter((e) => e.status === "draft");
  const publishedPosts = posts.filter((p) => p.status === "published");
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
  const profileComplete = !!(profile?.full_name && profile?.bio);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
        {/* Welcome + Profile completion */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              {avatarUrl ? (
                <img src={avatarUrl} alt="" className="w-14 h-14 rounded-full object-cover ring-2 ring-border" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-border">
                  <span className="font-display text-xl font-bold text-primary">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-black text-foreground tracking-tight">
                  Olá, {displayName}
                </h1>
                <p className="font-body text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 py-2 px-4 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all font-body text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>

          {/* Profile completion banner */}
          {!profileComplete && (
            <motion.div
              className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-body text-sm text-foreground font-medium">Complete seu perfil</p>
                <p className="font-body text-xs text-muted-foreground">Adicione nome, bio e foto para aparecer na plataforma</p>
              </div>
              <Link href="/dashboard/profile" className="font-body text-xs font-bold text-amber-500 hover:text-amber-400">
                Completar →
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {[
            { label: "Views total", value: totalViews, icon: Eye, color: "text-blue-500" },
            { label: "Eventos ativos", value: publishedEvents.length, icon: Calendar, color: "text-green-500" },
            { label: "Posts publicados", value: publishedPosts.length, icon: FileText, color: "text-amber-500" },
            { label: "Rascunhos", value: draftEvents.length + posts.filter((p) => p.status === "draft").length, icon: Clock, color: "text-purple-500" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-card border border-border rounded-xl p-5 group hover:border-primary/20 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
              <span className="block font-display text-3xl font-black text-foreground tabular-nums">
                {stat.value}
              </span>
              <span className="block font-body text-xs text-muted-foreground mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick actions */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/dashboard/events"
            className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/15 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Plus className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="font-body text-sm font-semibold text-foreground">Criar evento</p>
              <p className="font-body text-xs text-muted-foreground">Publique e promova seu evento</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/dashboard/posts"
            className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/15 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Plus className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="font-body text-sm font-semibold text-foreground">Criar post</p>
              <p className="font-body text-xs text-muted-foreground">Publique notícias e conteúdo</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/15 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="font-body text-sm font-semibold text-foreground">Editar perfil</p>
              <p className="font-body text-xs text-muted-foreground">Bio, foto e redes sociais</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Recent activity */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Recent events */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-lg font-bold text-foreground tracking-tight">Meus Eventos</h3>
              <Link href="/dashboard/events" className="font-body text-xs font-bold text-primary">Ver todos →</Link>
            </div>
            {eventsLoading ? (
              <div className="flex items-center justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
            ) : events.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="font-body text-sm text-muted-foreground mb-3">Nenhum evento ainda</p>
                <Link href="/dashboard/events" className="inline-flex items-center gap-1 font-body text-xs font-bold text-primary">
                  <Plus className="w-3 h-3" /> Criar primeiro evento
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {events.slice(0, 3).map((e) => (
                  <Link
                    key={e.id}
                    href="/dashboard/events"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full ${e.status === "published" ? "bg-green-500" : "bg-amber-500"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-medium text-foreground truncate">{e.title}</p>
                      <p className="font-body text-xs text-muted-foreground">
                        {e.date ? new Date(e.date).toLocaleDateString("pt-BR") : "Sem data"} · {e.status === "published" ? "Publicado" : "Rascunho"}
                      </p>
                    </div>
                    {e.status === "published" ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Recent posts */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-lg font-bold text-foreground tracking-tight">Meus Posts</h3>
              <Link href="/dashboard/posts" className="font-body text-xs font-bold text-primary">Ver todos →</Link>
            </div>
            {postsLoading ? (
              <div className="flex items-center justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="font-body text-sm text-muted-foreground mb-3">Nenhum post ainda</p>
                <Link href="/dashboard/posts" className="inline-flex items-center gap-1 font-body text-xs font-bold text-primary">
                  <Plus className="w-3 h-3" /> Criar primeiro post
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {posts.slice(0, 3).map((p) => (
                  <Link
                    key={p.id}
                    href="/dashboard/posts"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full ${p.status === "published" ? "bg-green-500" : "bg-amber-500"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-medium text-foreground truncate">{p.title}</p>
                      <p className="font-body text-xs text-muted-foreground">
                        {p.views} views · {p.status === "published" ? "Publicado" : "Rascunho"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Eye className="w-3 h-3" />
                      <span className="font-body text-xs tabular-nums">{p.views}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </main>

      <SiteFooter />
    </div>
  );
}
