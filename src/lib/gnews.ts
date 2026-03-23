/**
 * GNews API integration
 * Fetches automotive news in multiple languages
 * API docs: https://gnews.io/docs/v4
 */

const GNEWS_API_KEY = process.env.GNEWS_API_KEY || process.env.NEXT_PUBLIC_GNEWS_API_KEY || "";
const GNEWS_BASE = "https://gnews.io/api/v4";

export interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

interface GNewsResponse {
  totalArticles: number;
  articles: GNewsArticle[];
}

interface FetchNewsOptions {
  query?: string;
  lang?: string;
  country?: string;
  max?: number;
  category?: string;
}

export async function fetchGNews({
  query = "automotive OR cars OR dealership OR auto industry",
  lang = "en",
  country = "us",
  max = 10,
}: FetchNewsOptions = {}): Promise<GNewsArticle[]> {
  if (!GNEWS_API_KEY) {
    console.warn("[GNews] No API key configured. Set GNEWS_API_KEY env var.");
    return [];
  }

  const params = new URLSearchParams({
    q: query,
    lang,
    country,
    max: String(max),
    apikey: GNEWS_API_KEY,
    sortby: "publishedAt",
  });

  try {
    const res = await fetch(`${GNEWS_BASE}/search?${params}`, {
      next: { revalidate: 3600 }, // Cache 1 hour in Next.js
    });

    if (!res.ok) {
      console.error(`[GNews] API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const data: GNewsResponse = await res.json();
    return data.articles || [];
  } catch (err) {
    console.error("[GNews] Fetch failed:", err);
    return [];
  }
}

/**
 * Fetch news for multiple markets/languages
 */
export async function fetchMultiMarketNews(): Promise<GNewsArticle[]> {
  const queries = [
    { query: "automotive industry OR car dealership OR auto market", lang: "en", country: "us", max: 6 },
    { query: "mercado automotivo OR concessionaria OR carros", lang: "pt", country: "br", max: 4 },
  ];

  const results = await Promise.allSettled(
    queries.map((opts) => fetchGNews(opts))
  );

  const allArticles: GNewsArticle[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      allArticles.push(...result.value);
    }
  }

  // Sort by date, newest first
  allArticles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return allArticles;
}

/**
 * Categorize a news article based on keywords in title/description
 */
export function categorizeArticle(article: GNewsArticle): string {
  const text = `${article.title} ${article.description}`.toLowerCase();

  if (text.match(/electric|ev|tesla|battery|hybrid|charging/)) return "EV & Electric";
  if (text.match(/dealer|dealership|sales|inventory|lot/)) return "Dealerships";
  if (text.match(/price|cost|afford|market value|msrp/)) return "Market & Pricing";
  if (text.match(/suv|truck|sedan|coupe|pickup|crossover/)) return "Vehicles";
  if (text.match(/recall|safety|crash|nhtsa/)) return "Safety & Recalls";
  if (text.match(/tech|autonomous|self-driving|ai|software/)) return "Auto Tech";
  if (text.match(/finance|loan|credit|lease|interest/)) return "Financing";
  if (text.match(/law|regulation|tariff|policy|emission/)) return "Industry & Policy";

  return "Industry News";
}
