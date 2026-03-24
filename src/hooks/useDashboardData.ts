"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

export interface Profile {
  id: string;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  website: string | null;
  instagram: string | null;
  tiktok: string | null;
  youtube: string | null;
  linkedin: string | null;
  location: string | null;
  slug: string | null;
  role: string;
  builder_layout: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserEvent {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  date: string | null;
  end_date: string | null;
  location: string | null;
  image_url: string | null;
  ticket_url: string | null;
  ticket_info: string | null;
  status: string;
  builder_layout: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserPost {
  id: string;
  user_id: string;
  title: string;
  content: string | null;
  image_url: string | null;
  category: string;
  tags: string[] | null;
  status: string;
  views: number;
  builder_layout: string | null;
  created_at: string;
  updated_at: string;
}

export function useProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchProfile = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    setProfile(data);
    setLoading(false);
  }, [userId, supabase]);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!userId) return { error: "No user" };
    const { error } = await supabase
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", userId);
    if (!error) await fetchProfile();
    return { error };
  };

  return { profile, loading, updateProfile, refetch: fetchProfile };
}

export function useUserEvents(userId: string | undefined) {
  const [events, setEvents] = useState<UserEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchEvents = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    setEvents(data || []);
    setLoading(false);
  }, [userId, supabase]);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const createEvent = async (event: Partial<UserEvent>) => {
    if (!userId) return { error: "No user" };
    const { error } = await supabase
      .from("events")
      .insert({ ...event, user_id: userId });
    if (!error) await fetchEvents();
    return { error };
  };

  const updateEvent = async (id: string, updates: Partial<UserEvent>) => {
    const { error } = await supabase
      .from("events")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (!error) await fetchEvents();
    return { error };
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) await fetchEvents();
    return { error };
  };

  return { events, loading, createEvent, updateEvent, deleteEvent, refetch: fetchEvents };
}

export function useUserPosts(userId: string | undefined) {
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchPosts = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  }, [userId, supabase]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const createPost = async (post: Partial<UserPost>) => {
    if (!userId) return { error: "No user" };
    const { error } = await supabase
      .from("posts")
      .insert({ ...post, user_id: userId });
    if (!error) await fetchPosts();
    return { error };
  };

  const updatePost = async (id: string, updates: Partial<UserPost>) => {
    const { error } = await supabase
      .from("posts")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (!error) await fetchPosts();
    return { error };
  };

  const deletePost = async (id: string) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (!error) await fetchPosts();
    return { error };
  };

  return { posts, loading, createPost, updatePost, deletePost, refetch: fetchPosts };
}
