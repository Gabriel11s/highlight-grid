import type { Metadata } from "next";
import StoriesPageContent from "./StoriesPageContent";

export const metadata: Metadata = {
  title: "Notícias",
  description:
    "As últimas notícias e análises do mercado automotivo. Tendências, bastidores e insights para lojistas e empreendedores.",
  openGraph: {
    title: "Notícias — NEWS",
    description: "Últimas notícias e análises do mercado automotivo.",
    type: "website",
    siteName: "NEWS",
  },
};

export default function StoriesPage() {
  return <StoriesPageContent />;
}
