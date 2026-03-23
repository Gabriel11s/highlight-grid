import type { Metadata } from "next";
import StoriesPageContent from "./StoriesPageContent";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getAllNews } from "@/lib/news-service";

export const revalidate = 21600; // ISR: revalidate every 6 hours

export const metadata: Metadata = {
  title: "Notícias — NEWS",
  description:
    "As últimas notícias e análises do mercado automotivo. Tendências, bastidores e insights para lojistas e empreendedores.",
  openGraph: {
    title: "Notícias — NEWS",
    description: "Últimas notícias e análises do mercado automotivo.",
    type: "website",
    siteName: "NEWS",
  },
};

export default async function StoriesPage() {
  const articles = await getAllNews(12);

  return (
    <>
      <SiteHeader />
      <StoriesPageContent articles={articles} />
      <SiteFooter />
    </>
  );
}
