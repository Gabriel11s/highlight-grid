"use client";

import { useState, useEffect } from "react";

interface InstagramPostData {
  id: string;
  shortcode: string;
  imageUrl: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  isVideo: boolean;
  timestamp: number;
  href: string;
}

interface InstagramProfileData {
  username: string;
  fullName: string;
  biography: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  profilePicUrl: string;
  isVerified: boolean;
  posts: InstagramPostData[];
}

interface UseInstagramResult {
  profile: InstagramProfileData | null;
  isLoading: boolean;
  isLive: boolean; // true if data came from API, false if fallback
}

export function useInstagramProfile(username: string): UseInstagramResult {
  const [profile, setProfile] = useState<InstagramProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchProfile() {
      try {
        const res = await fetch(`/api/instagram?username=${encodeURIComponent(username)}`);
        const data = await res.json();

        if (!cancelled && data.profile && !data.fallback) {
          setProfile(data.profile);
          setIsLive(true);
        }
      } catch {
        // silently fail — static data remains
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchProfile();
    return () => { cancelled = true; };
  }, [username]);

  return { profile, isLoading, isLive };
}
