import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  created_at: string;
}

export function useNewsArticles(limit = 12) {
  return useQuery({
    queryKey: ["news_articles", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .order("published_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as NewsArticle[];
    },
  });
}
