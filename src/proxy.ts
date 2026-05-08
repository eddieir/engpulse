import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard", "/onboarding/connect-github"];

async function sha256Hex(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const rawToken = request.cookies.get("ep_access_token")?.value;

  if (!rawToken) {
    return NextResponse.redirect(new URL("/verify-required", request.url));
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // If Supabase is not configured, allow through in demo mode
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.next();
  }

  try {
    const tokenHash = await sha256Hex(rawToken);

    const res = await fetch(
      `${supabaseUrl}/rest/v1/access_sessions?access_token_hash=eq.${encodeURIComponent(tokenHash)}&select=id,beta_request_id,expires_at,status&limit=1`,
      {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      return NextResponse.redirect(new URL("/verify-required", request.url));
    }

    const sessions = await res.json();
    const session = sessions[0];

    if (!session || session.status !== "active") {
      return NextResponse.redirect(new URL("/verify-required", request.url));
    }

    if (new Date(session.expires_at) < new Date()) {
      const response = NextResponse.redirect(new URL("/access-expired", request.url));
      response.cookies.delete("ep_access_token");
      return response;
    }

    return NextResponse.next();
  } catch {
    // Fail open if DB is unreachable
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/connect-github"],
};
