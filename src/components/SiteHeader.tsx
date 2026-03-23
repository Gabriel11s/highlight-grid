"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, PenSquare } from "lucide-react";
import SearchOverlay from "./SearchOverlay";
import SubmitContentDialog from "./SubmitContentDialog";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEmbed } from "@/contexts/EmbedContext";

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
  const pathname = usePathname();
  const { t } = useLanguage();
  const { isEmbed } = useEmbed();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isEmbed) return null;

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
            <button
              onClick={() => setSubmitOpen(true)}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold tracking-[0.1em] uppercase rounded-md hover:bg-primary/90 transition-colors duration-200"
            >
              <PenSquare className="w-4 h-4" />
              {t("submit.button")}
            </button>
            <button
              className="md:hidden p-2.5 text-muted-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
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
          </div>
        )}
      </header>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <SubmitContentDialog open={submitOpen} onClose={() => setSubmitOpen(false)} />
    </>
  );
};

export default SiteHeader;
