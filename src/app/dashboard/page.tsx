"use client";

import { useAuth } from "@/contexts/AuthContext";
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
  Settings,
  ArrowRight,
  LogOut,
  Loader2,
} from "lucide-react";

const dashboardCards = [
  {
    title: "Meu Perfil",
    description: "Edite sua bio, foto e redes sociais",
    icon: User,
    href: "/dashboard/profile",
    color: "hsl(220 70% 55%)",
  },
  {
    title: "Meus Eventos",
    description: "Crie e gerencie seus eventos",
    icon: Calendar,
    href: "/dashboard",
    color: "hsl(150 60% 45%)",
  },
  {
    title: "Meus Posts",
    description: "Publique notícias e conteúdo",
    icon: FileText,
    href: "/dashboard",
    color: "hsl(35 90% 55%)",
  },
  {
    title: "Analytics",
    description: "Visualizações, cliques e engajamento",
    icon: BarChart3,
    href: "/dashboard",
    color: "hsl(280 60% 55%)",
  },
];

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const displayName =
    user.user_metadata?.full_name || user.email?.split("@")[0] || "Usuário";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
        {/* Welcome */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span className="editorial-label block mb-2">Dashboard</span>
          <h1 className="text-3xl md:text-5xl font-display font-black text-foreground tracking-tighter mb-2">
            Olá, {displayName}
          </h1>
          <p className="font-body text-muted-foreground">
            Gerencie seu perfil, eventos e conteúdo
          </p>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {[
            { label: "Views este mês", value: "—" },
            { label: "Eventos ativos", value: "0" },
            { label: "Posts publicados", value: "0" },
            { label: "Seguidores", value: "—" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-4 text-center"
            >
              <span className="block font-display text-2xl font-black text-foreground">
                {stat.value}
              </span>
              <span className="block font-body text-xs text-muted-foreground mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {dashboardCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
            >
              <Link
                href={card.href}
                className="group block bg-card border border-border rounded-2xl p-6 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${card.color}20` }}
                >
                  <card.icon
                    className="w-6 h-6"
                    style={{ color: card.color }}
                  />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground tracking-tight mb-1 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-3">
                  {card.description}
                </p>
                <span className="inline-flex items-center gap-1 font-body text-xs font-bold text-primary tracking-wide uppercase">
                  Acessar{" "}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Account section */}
        <motion.div
          className="flex items-center justify-between bg-card border border-border rounded-2xl p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-display text-lg font-bold text-primary">
                {displayName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-body text-sm font-semibold text-foreground">
                {displayName}
              </p>
              <p className="font-body text-xs text-muted-foreground">
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
        </motion.div>
      </main>

      <SiteFooter />
    </div>
  );
}
