"use client";

import VisualBuilder from "@/components/builder/VisualBuilder";

export default function BuilderClient() {
  return (
    <VisualBuilder
      onSave={(doc) => {
        // For now, save to localStorage. Later: Supabase
        localStorage.setItem(`news-page-${doc.id}`, JSON.stringify(doc));
        alert("Salvo com sucesso! (localStorage)");
      }}
    />
  );
}
