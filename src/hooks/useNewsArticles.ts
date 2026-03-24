import { useQuery } from "@tanstack/react-query";

export interface NewsArticle {
  id: string;
  title: string;
  description: string | null;
  url: string;
  image_url: string | null;
  source_name: string | null;
  published_at: string | null;
  category: string | null;
  region: string | null;
}

/**
 * Fetches news from /api/news which calls GNews API directly.
 * Falls back gracefully if API is unavailable.
 */
export function useNewsArticles(limit = 12) {
  return useQuery({
    queryKey: ["news_articles", limit],
    queryFn: async (): Promise<NewsArticle[]> => {
      const res = await fetch(`/api/news`);
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();

      return (data.articles || []).slice(0, limit).map((a: any, i: number) => ({
        id: `gnews-${i}-${Date.now()}`,
        title: a.title,
        description: a.description,
        url: a.url,
        image_url: a.image,
        source_name: a.source,
        published_at: a.publishedAt,
        category: a.category,
        region: null,
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 min cache
    retry: 2,
  });
}
