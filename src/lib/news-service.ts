/**
 * News service — fetches articles from GNews API directly
 * with ISR caching (revalidates every 6 hours)
 * Falls back gracefully if API key missing or quota exceeded
 */

import { fetchGNews, categorizeArticle, type GNewsArticle } from "./gnews";

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  image_url: string;
  source_name: string;
  published_at: string;
  category: string;
  region: string;
}

function gnewsToNewsArticle(a: GNewsArticle, index: number): NewsArticle {
  return {
    id: `gnews-${index}-${Date.now()}`,
    title: a.title,
    description: a.description || "",
    url: a.url,
    image_url: a.image || "",
    source_name: a.source?.name || "Unknown",
    published_at: a.publishedAt,
    category: categorizeArticle(a),
    region: "US",
  };
}

/**
 * Get latest automotive news — called from Server Components
 * Uses Next.js fetch cache with revalidate for ISR
 */
export async function getLatestNews(limit = 10): Promise<NewsArticle[]> {
  try {
    const articles = await fetchGNews({
      query: "automotive OR cars OR dealership OR auto industry OR EV",
      lang: "en",
      country: "us",
      max: limit,
    });

    return articles.map(gnewsToNewsArticle);
  } catch {
    return [];
  }
}

/**
 * Get Brazilian automotive news
 */
export async function getBrazilianNews(limit = 5): Promise<NewsArticle[]> {
  try {
    const articles = await fetchGNews({
      query: "mercado automotivo OR concessionária OR carros OR veículos",
      lang: "pt",
      country: "br",
      max: limit,
    });

    return articles.map((a, i) => ({
      ...gnewsToNewsArticle(a, i + 100),
      region: "BR",
    }));
  } catch {
    return [];
  }
}

/**
 * Get all news combined (EN + PT)
 */
export async function getAllNews(limit = 12): Promise<NewsArticle[]> {
  const [enNews, brNews] = await Promise.allSettled([
    getLatestNews(Math.ceil(limit * 0.7)),
    getBrazilianNews(Math.floor(limit * 0.3)),
  ]);

  const all: NewsArticle[] = [];
  if (enNews.status === "fulfilled") all.push(...enNews.value);
  if (brNews.status === "fulfilled") all.push(...brNews.value);

  all.sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  return all.slice(0, limit);
}

/**
 * Breaking news — top 4 most recent for the ticker
 */
export async function getBreakingNews(): Promise<
  { label: string; text: string }[]
> {
  try {
    const articles = await fetchGNews({
      query: "automotive breaking OR car industry news OR auto recall OR EV launch",
      lang: "en",
      country: "us",
      max: 4,
    });

    return articles.map((a) => ({
      label: a.source?.name || "NEWS",
      text: a.title,
    }));
  } catch {
    return [
      { label: "NEWS", text: "Stay tuned for the latest automotive news" },
    ];
  }
}
