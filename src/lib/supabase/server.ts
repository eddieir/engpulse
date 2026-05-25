import { createClient } from "@supabase/supabase-js";

// Fallback values match .env.example — already public in the repository.
const DEFAULT_URL = "https://bwwmdrzsedufwrbzasky.supabase.co";
const DEFAULT_SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3d21kcnpzZWR1ZndyYnphc2t5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODIzMzAxNSwiZXhwIjoyMDkzODA5MDE1fQ.c_UpnhvC_4QaYc7I47fP5gQ4G8FXRyfW5ZK9HAuvZzc";

// Server-side Supabase client using the service role key.
// Only import this in API routes / server components — never expose to client.
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SERVICE_KEY;

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
