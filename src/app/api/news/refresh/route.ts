import { NextRequest, NextResponse } from "next/server";
import { categorizeArticle } from "@/lib/gnews";
import { createClient } from "@supabase/supabase-js";

// Use service role for server-side writes (not anon key)
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export async function GET(request: NextRequest) {
  // Optional: protect with a secret for cron jobs
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Debug: check env var availability
    const hasKey = !!process.env.GNEWS_API_KEY;
    const hasPublicKey = !!process.env.NEXT_PUBLIC_GNEWS_API_KEY;
    console.log(`[News Refresh] GNEWS_API_KEY present: ${hasKey}, NEXT_PUBLIC: ${hasPublicKey}`);

    // 1. Fetch from GNews — single query to conserve free tier
    const { fetchGNews } = await import("@/lib/gnews");
    const articles = await fetchGNews({
      query: "automotive OR cars OR auto industry",
      lang: "en",
      country: "us",
      max: 10,
    });

    if (articles.length === 0) {
      return NextResponse.json({
        message: "No articles fetched from GNews",
        count: 0,
        debug: { hasKey: !!process.env.GNEWS_API_KEY, hasPublicKey: !!process.env.NEXT_PUBLIC_GNEWS_API_KEY },
      });
    }

    // 2. Prepare for Supabase upsert
    const supabase = getSupabaseAdmin();
    const rows = articles.map((a) => ({
      title: a.title,
      description: a.description || "",
      url: a.url,
      image_url: a.image || "",
      source_name: a.source?.name || "Unknown",
      published_at: a.publishedAt,
      category: categorizeArticle(a),
      region: detectRegion(a),
      created_at: new Date().toISOString(),
    }));

    // 3. Upsert (avoid duplicates by URL)
    const { data, error } = await supabase
      .from("news_articles")
      .upsert(rows, { onConflict: "url", ignoreDuplicates: true });

    if (error) {
      console.error("[News Refresh] Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 4. Clean old articles (keep last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    await supabase
      .from("news_articles")
      .delete()
      .lt("published_at", thirtyDaysAgo.toISOString());

    return NextResponse.json({
      message: "News refreshed successfully",
      fetched: articles.length,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[News Refresh] Error:", err);
    return NextResponse.json(
      { error: "Failed to refresh news" },
      { status: 500 }
    );
  }
}

function detectRegion(article: { title: string; description: string; source: { name: string } }): string {
  const text = `${article.title} ${article.description} ${article.source.name}`.toLowerCase();

  if (text.match(/brasil|são paulo|curitiba|rio|brasileiro/)) return "BR";
  if (text.match(/florida|miami|orlando|tampa|usa|america/)) return "US";
  if (text.match(/uk|london|british/)) return "UK";

  return "US";
}
