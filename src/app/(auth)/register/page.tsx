"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Por favor, insira seu nome");
      return;
    }
    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres");
      return;
    }
    setLoading(true);
    try {
      const { error } = await signUpWithEmail(email, password, name);
      if (error) {
        // Map common Supabase errors to Portuguese
        if (error.includes("already registered")) {
          setError("Este email já está cadastrado. Tente fazer login.");
        } else if (error.includes("not authorized") || error.includes("Signups not allowed")) {
          setError("Cadastro temporariamente indisponível. Entre em contato com o administrador.");
        } else if (error.includes("rate limit")) {
          setError("Muitas tentativas. Aguarde alguns minutos.");
        } else {
          setError(error);
        }
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("Erro de conexão. Verifique sua internet e tente novamente.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-display font-black text-foreground tracking-tighter">NEWS</h1>
          </Link>
          <p className="text-sm text-muted-foreground font-body mt-2">
            Crie sua conta e comece a publicar
          </p>
        </div>

        {success ? (
          <motion.div
            className="bg-card border border-border rounded-2xl p-8 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-xl font-display font-bold text-foreground mb-2">
              Conta criada!
            </h2>
            <p className="text-sm text-muted-foreground font-body mb-6">
              Enviamos um email de confirmação para <strong className="text-foreground">{email}</strong>. Verifique sua caixa de entrada.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-body font-bold text-primary hover:underline"
            >
              Ir para login <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-8">
            <button
              onClick={async () => {
                setError("");
                setGoogleLoading(true);
                try {
                  await signInWithGoogle();
                } catch {
                  setError("Erro ao conectar com Google. Tente novamente.");
                  setGoogleLoading(false);
                }
              }}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-border bg-background hover:bg-accent disabled:opacity-50 transition-colors duration-200 mb-6"
            >
              {googleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              )}
              <span className="font-body text-sm font-medium text-foreground">Criar com Google</span>
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-card px-3 text-muted-foreground font-body">ou</span></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-body font-bold text-muted-foreground uppercase tracking-wide mb-1.5">Nome</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Seu nome" className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-body font-bold text-muted-foreground uppercase tracking-wide mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="seu@email.com" className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-body font-bold text-muted-foreground uppercase tracking-wide mb-1.5">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Mínimo 6 caracteres" className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all" />
                </div>
              </div>

              {error && (
                <motion.p className="text-xs text-destructive font-body bg-destructive/5 border border-destructive/20 rounded-lg p-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {error}
                </motion.p>
              )}

              <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-primary-foreground font-body font-bold text-sm tracking-wide rounded-xl hover:opacity-90 disabled:opacity-50 transition-all">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Criar conta</span><ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            <p className="text-center text-xs text-muted-foreground font-body mt-6">
              Já tem conta? <Link href="/login" className="text-primary font-bold hover:underline">Entrar</Link>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
