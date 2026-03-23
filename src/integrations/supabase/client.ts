// Compatibility shim — hooks import from this path
// Re-exports the browser client from lib/supabase
import { createClient } from "@/lib/supabase/client";

export const supabase = createClient();
