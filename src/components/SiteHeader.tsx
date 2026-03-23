"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, PenSquare, User, LogOut, LayoutDashboard } from "lucide-react";
import SearchOverlay from "./SearchOverlay";
import SubmitContentDialog from "./SubmitContentDialog";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEmbed } from "@/contexts/EmbedContext";
import { useAuth } from "@/contexts/AuthContext";

const navKeys = [
  { key: "nav.stories", path: "/stories" },
  { key: "nav.events", path: "/events" },
  { key: "nav.products", path: "/products" },
];

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const { isEmbed } = useEmbed();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu on click outside
  useEffect(() => {
    if (!userMenuOpen) return;
    const close = () => setUserMenuOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [userMenuOpen]);

  if (isEmbed) return null;

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-3xl lg:text-4xl font-black tracking-tighter text-foreground leading-none"
          >
            NEWS
          </Link>

          <nav className="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
            {navKeys.map((item) => (
              <Link
                key={item.key}
                href={item.path}
                className={`relative font-body text-base lg:text-lg px-6 py-2 rounded-full transition-all duration-300 ${
                  pathname === item.path
                    ? "text-primary-foreground bg-primary font-semibold shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent hover:scale-105"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <LanguageSwitcher />
            <ThemeToggle />

            {/* Auth button */}
            {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setUserMenuOpen(!userMenuOpen);
                      }}
                      className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-display font-bold text-sm hover:bg-primary/20 transition-colors"
                    >
                      {initial}
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 top-12 w-56 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50">
                        <div className="px-4 py-3 border-b border-border">
                          <p className="font-body text-sm font-semibold text-foreground truncate">
                            {displayName}
                          </p>
                          <p className="font-body text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                        </div>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-3 font-body text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                        <Link
                          href="/dashboard/profile"
                          className="flex items-center gap-3 px-4 py-3 font-body text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          Meu Perfil
                        </Link>
                        <button
                          onClick={() => {
                            signOut();
                            setUserMenuOpen(false);
                          }}
                          className="flex items-center gap-3 px-4 py-3 w-full text-left font-body text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors border-t border-border"
                        >
                          <LogOut className="w-4 h-4" />
                          Sair
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold tracking-[0.1em] uppercase rounded-md hover:bg-primary/90 transition-colors duration-200"
                  >
                    <User className="w-4 h-4" />
                    Entrar
                  </Link>
                )}
              </>
            )}

            <button
              className="md:hidden p-2.5 text-muted-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-background border-b border-border px-6 py-4">
            {navKeys.map((item) => (
              <Link
                key={item.key}
                href={item.path}
                className="block py-3 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="border-t border-border mt-2 pt-3">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block py-3 font-body text-sm text-foreground font-semibold"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { signOut(); setMenuOpen(false); }}
                    className="block py-3 font-body text-sm text-destructive"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block py-3 font-body text-sm font-bold text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Entrar / Criar conta
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <SubmitContentDialog open={submitOpen} onClose={() => setSubmitOpen(false)} />
    </>
  );
};

export default SiteHeader;
