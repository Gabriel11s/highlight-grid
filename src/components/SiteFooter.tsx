"use client";

import Link from "next/link";
import { Instagram, Youtube, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SiteFooter = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-display text-3xl font-black text-foreground tracking-tighter">
              NEWS
            </span>
            <p className="font-body text-sm text-muted-foreground mt-3 max-w-sm leading-relaxed">
              Automotive intelligence, events and community. Connecting dealers,
              enthusiasts and industry leaders.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
                { icon: Mail, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5">
              Platform
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Stories", href: "/stories" },
                { label: "Events", href: "/events" },
                { label: "Products", href: "/products" },
                { label: "Builder", href: "/builder" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5">
              Account
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Login", href: "/login" },
                { label: "Register", href: "/register" },
                { label: "Dashboard", href: "/dashboard" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider" />
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-body text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} NEWS. All rights reserved.
          </span>
          <span className="font-body text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground/40">
            Automotive Intelligence Platform
          </span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
