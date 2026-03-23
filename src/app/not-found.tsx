import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <span className="block font-display text-[8rem] font-black tracking-tighter text-primary/20 leading-none select-none">
            404
          </span>
          <h1 className="font-display text-3xl font-black text-foreground tracking-tight -mt-4 mb-4">
            Página não encontrada
          </h1>
          <p className="font-body text-sm text-muted-foreground mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-body text-sm font-bold tracking-[0.1em] uppercase hover:opacity-90 transition-all"
          >
            Voltar ao início
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
