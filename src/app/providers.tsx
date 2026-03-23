"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { EmbedProvider } from "@/contexts/EmbedContext";
import { Toaster } from "sonner";
import { useState, Suspense } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={null}>
        <EmbedProvider>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              {children}
            </TooltipProvider>
          </LanguageProvider>
        </EmbedProvider>
      </Suspense>
    </QueryClientProvider>
  );
}
