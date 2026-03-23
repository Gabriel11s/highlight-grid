import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import BreakingBar from "@/components/BreakingBar";
import NewsGrid from "@/components/NewsGrid";
import FeaturedStories from "@/components/FeaturedStories";
import EventsSection from "@/components/EventsSection";
import SiteFooter from "@/components/SiteFooter";
import UserContentSection from "@/components/UserContentSection";
import EventReminderPopup from "@/components/EventReminderPopup";
import HeroCompact from "@/components/HeroCompact";
import { getAllNews, getBreakingNews } from "@/lib/news-service";

export const dynamic = "force-dynamic";
export const revalidate = 21600;

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
    getAllNews(9),
    getBreakingNews(),
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <HeroCompact articles={articles.slice(0, 3)} />
        <BreakingBar items={breakingItems} />
        <NewsGrid articles={articles.slice(0, 6)} />
        <FeaturedStories />
        <EventsSection />
        <UserContentSection />
      </main>
      <SiteFooter />
      <EventReminderPopup />
    </>
  );
}
