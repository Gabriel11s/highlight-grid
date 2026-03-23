import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface UserSubmission {
  id: string;
  type: "news" | "event" | "product";
  title: string;
  description: string | null;
  image_url: string | null;
  url: string | null;
  category: string | null;
  author_name: string;
  author_email: string | null;
  event_date: string | null;
  event_end_date: string | null;
  location: string | null;
  address: string | null;
  hours: string | null;
  price: string | null;
  cta_label: string | null;
  status: string;
  is_flagged: boolean;
  created_at: string;
  website: string | null;
}

export function useUserSubmissions(type?: "news" | "event" | "product") {
  return useQuery({
    queryKey: ["user_submissions", type],
    queryFn: async () => {
      let query = supabase
        .from("user_submissions")
        .select("*")
        .eq("status", "published")
        .eq("is_flagged", false)
        .order("created_at", { ascending: false });

      if (type) {
        query = query.eq("type", type);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as UserSubmission[];
    },
  });
}

export function useUpcomingUserEvents() {
  return useQuery({
    queryKey: ["upcoming_user_events"],
    queryFn: async () => {
      const now = new Date();
      const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

      const { data, error } = await supabase
        .from("user_submissions")
        .select("*")
        .eq("type", "event")
        .eq("status", "published")
        .eq("is_flagged", false)
        .gte("event_date", now.toISOString())
        .lte("event_date", threeDaysLater.toISOString())
        .order("event_date", { ascending: true });

      if (error) throw error;
      return data as UserSubmission[];
    },
    refetchInterval: 60000, // check every minute
  });
}
