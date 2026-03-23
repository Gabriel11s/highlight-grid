import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-6 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

        <div className="text-center max-w-lg relative z-10">
          {/* Large 404 */}
          <span className="block font-display text-[12rem] md:text-[16rem] font-black tracking-tighter leading-none select-none bg-gradient-to-b from-foreground/10 to-transparent bg-clip-text text-transparent">
            404
          </span>

          <h1 className="font-display text-2xl md:text-4xl font-black text-foreground tracking-tight -mt-8 mb-3 text-balance">
            Story not found
          </h1>

          <p className="font-body text-sm text-muted-foreground mb-10 max-w-xs mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved to a new location.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-body text-sm font-bold tracking-[0.1em] uppercase hover:opacity-90 hover:gap-4 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
