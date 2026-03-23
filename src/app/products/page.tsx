import type { Metadata } from "next";
import ProductsPageContent from "./ProductsPageContent";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Conteúdo premium, briefings e inteligência para o mercado automotivo. Assine e fique à frente.",
  openGraph: {
    title: "Produtos — NEWS",
    description: "Conteúdo premium e inteligência automotiva.",
    type: "website",
    siteName: "NEWS",
  },
};

export default function ProductsPage() {
  return <ProductsPageContent />;
}
