import { NextResponse } from "next/server";

// Instagram public profile data fetcher
// Uses multiple fallback strategies to get profile data

interface InstagramProfile {
  username: string;
  fullName: string;
  biography: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  profilePicUrl: string;
  isVerified: boolean;
  posts: InstagramPostData[];
  highlights: InstagramHighlight[];
}

interface InstagramPostData {
  id: string;
  shortcode: string;
  imageUrl: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  isVideo: boolean;
  videoUrl?: string;
  timestamp: number;
  href: string;
}

interface InstagramHighlight {
  id: string;
  title: string;
  coverImage: string;
  href: string;
}

// Strategy 1: Use Instagram's public JSON endpoint (works for public profiles)
async function fetchViaPublicApi(username: string): Promise<InstagramProfile | null> {
  try {
    const res = await fetch(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "X-IG-App-ID": "936619743392459",
        "X-Requested-With": "XMLHttpRequest",
      },
      next: { revalidate: 3600 }, // cache 1 hour
    });

    if (!res.ok) return null;

    const data = await res.json();
    const user = data?.data?.user;
    if (!user) return null;

    const posts: InstagramPostData[] = (user.edge_owner_to_timeline_media?.edges || [])
      .slice(0, 12)
      .map((edge: any) => {
        const node = edge.node;
        return {
          id: node.id,
          shortcode: node.shortcode,
          imageUrl: node.display_url || node.thumbnail_src,
          caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || "",
          likesCount: node.edge_liked_by?.count || node.edge_media_preview_like?.count || 0,
          commentsCount: node.edge_media_to_comment?.count || 0,
          isVideo: node.is_video || false,
          videoUrl: node.video_url,
          timestamp: node.taken_at_timestamp,
          href: `https://www.instagram.com/p/${node.shortcode}/`,
        };
      });

    return {
      username: user.username,
      fullName: user.full_name,
      biography: user.biography,
      followersCount: user.edge_followed_by?.count || 0,
      followingCount: user.edge_follow?.count || 0,
      postsCount: user.edge_owner_to_timeline_media?.count || 0,
      profilePicUrl: user.profile_pic_url_hd || user.profile_pic_url,
      isVerified: user.is_verified,
      posts,
      highlights: [],
    };
  } catch (e) {
    console.error("Instagram public API failed:", e);
    return null;
  }
}

// Strategy 2: Use the __a=1 endpoint
async function fetchViaLegacyApi(username: string): Promise<InstagramProfile | null> {
  try {
    const res = await fetch(`https://www.instagram.com/${username}/?__a=1&__d=dis`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    const user = data?.graphql?.user || data?.user;
    if (!user) return null;

    const posts: InstagramPostData[] = (user.edge_owner_to_timeline_media?.edges || [])
      .slice(0, 12)
      .map((edge: any) => {
        const node = edge.node;
        return {
          id: node.id,
          shortcode: node.shortcode,
          imageUrl: node.display_url || node.thumbnail_src,
          caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || "",
          likesCount: node.edge_liked_by?.count || node.edge_media_preview_like?.count || 0,
          commentsCount: node.edge_media_to_comment?.count || 0,
          isVideo: node.is_video || false,
          timestamp: node.taken_at_timestamp,
          href: `https://www.instagram.com/p/${node.shortcode}/`,
        };
      });

    return {
      username: user.username,
      fullName: user.full_name,
      biography: user.biography,
      followersCount: user.edge_followed_by?.count || 0,
      followingCount: user.edge_follow?.count || 0,
      postsCount: user.edge_owner_to_timeline_media?.count || 0,
      profilePicUrl: user.profile_pic_url_hd || user.profile_pic_url,
      isVerified: user.is_verified || false,
      posts,
      highlights: [],
    };
  } catch (e) {
    console.error("Instagram legacy API failed:", e);
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "username required" }, { status: 400 });
  }

  // Try strategies in order
  let profile = await fetchViaPublicApi(username);
  if (!profile) {
    profile = await fetchViaLegacyApi(username);
  }

  if (!profile) {
    // Return fallback static data if all strategies fail
    return NextResponse.json({
      error: "Could not fetch profile — using cached data",
      fallback: true,
      profile: null,
    }, { status: 200 });
  }

  return NextResponse.json({
    fallback: false,
    profile,
  }, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
