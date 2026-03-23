import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import BreakingBar from "@/components/BreakingBar";
import NewsGrid from "@/components/NewsGrid";
import EventsSection from "@/components/EventsSection";
import SiteFooter from "@/components/SiteFooter";
import UserContentSection from "@/components/UserContentSection";
import EventReminderPopup from "@/components/EventReminderPopup";
import { getAllNews, getBreakingNews } from "@/lib/news-service";

export const revalidate = 21600; // ISR: revalidate every 6 hours

export const metadata: Metadata = {
  title: "NEWS — Automotive Intelligence & Events",
  description:
    "Notícias, análises e eventos exclusivos do mercado automotivo. Acompanhe tendências, conecte-se com líderes e descubra oportunidades.",
  openGraph: {
    title: "NEWS — Automotive Intelligence & Events",
    description:
      "Notícias, análises e eventos exclusivos do mercado automotivo.",
    type: "website",
    siteName: "NEWS",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEWS — Automotive Intelligence & Events",
    description:
      "Notícias, análises e eventos exclusivos do mercado automotivo.",
  },
  robots: { index: true, follow: true },
};

export default async function HomePage() {
  const [articles, breakingItems] = await Promise.all([
    getAllNews(6),
    getBreakingNews(),
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <BreakingBar items={breakingItems} />
        <NewsGrid articles={articles.slice(0, 3)} />
        <EventsSection />
        <UserContentSection />
      </main>
      <SiteFooter />
      <EventReminderPopup />
    </>
  );
}
