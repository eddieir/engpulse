import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client using the service role key.
// Only import this in API routes / server components — never expose to client.
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
