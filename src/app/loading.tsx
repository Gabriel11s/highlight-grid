export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        {/* Logo with pulse */}
        <div className="relative mb-8">
          <span className="font-display text-5xl font-black tracking-tighter text-foreground/10">
            NEWS
          </span>
        </div>

        {/* Shimmer bar */}
        <div className="w-48 h-[2px] mx-auto rounded-full overflow-hidden bg-border">
          <div className="shimmer h-full w-full" />
        </div>

        <p className="font-body text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground/50 mt-4">
          Loading
        </p>
      </div>
    </div>
  );
}
