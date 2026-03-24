import { NextRequest, NextResponse } from "next/server";
import { fetchMultiMarketNews, categorizeArticle } from "@/lib/gnews";

/**
 * GET /api/news — Returns latest automotive news
 * Uses in-memory cache (60s) to avoid hitting GNews rate limits
 */

let cache: { data: any; ts: number } | null = null;
const CACHE_TTL = 60_000; // 1 minute

export async function GET(request: NextRequest) {
  try {
    // Return cache if fresh
    if (cache && Date.now() - cache.ts < CACHE_TTL) {
      return NextResponse.json(cache.data, {
        headers: { "X-Cache": "HIT", "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
      });
    }

    const articles = await fetchMultiMarketNews();

    const mapped = articles.map((a) => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.image,
      source: a.source?.name || "Unknown",
      sourceUrl: a.source?.url || "",
      publishedAt: a.publishedAt,
      category: categorizeArticle(a),
    }));

    const payload = {
      articles: mapped,
      totalResults: mapped.length,
      cached: false,
      timestamp: new Date().toISOString(),
    };

    // Update cache
    cache = { data: { ...payload, cached: true }, ts: Date.now() };

    return NextResponse.json(payload, {
      headers: { "X-Cache": "MISS", "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (err) {
    console.error("[News API] Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch news", articles: [], totalResults: 0 },
      { status: 500 }
    );
  }
}
