import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — EngPulse",
  robots: { index: false, follow: false },
};

// Simple password-protected admin page.
// Set INTERNAL_ADMIN_PASSWORD env var to protect it.
export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ pw?: string }>;
}) {
  const { pw } = await searchParams;
  const adminPassword = process.env.INTERNAL_ADMIN_PASSWORD;
  const cookieStore = await cookies();
  const authedCookie = cookieStore.get("ep_admin_authed")?.value;

  const passwordCorrect = adminPassword && pw === adminPassword;

  // If correct password provided in URL, set cookie and redirect to clean URL
  if (passwordCorrect) {
    cookieStore.set("ep_admin_authed", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/internal/admin",
      maxAge: 60 * 60 * 8, // 8 hours
    });
    redirect("/internal/admin");
  }

  const isAuthed = authedCookie === "1" || !adminPassword;

  if (!isAuthed) {
    redirect("/internal/admin/login");
  }

  let betaRequests: Record<string, unknown>[] = [];
  let pricingInquiries: Record<string, unknown>[] = [];
  let auditEvents: Record<string, unknown>[] = [];
  let dbError: string | null = null;

  try {
    const supabase = createServerClient();

    const [brRes, piRes, aeRes] = await Promise.all([
      supabase
        .from("beta_requests")
        .select("id,full_name,email,company,role,status,selected_plan,created_at,access_expires_at")
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("pricing_inquiries")
        .select("id,full_name,email,company,selected_plan,status,created_at")
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("audit_events")
        .select("id,event_type,entity_type,email,created_at")
        .order("created_at", { ascending: false })
        .limit(100),
    ]);

    betaRequests = (brRes.data as Record<string, unknown>[]) || [];
    pricingInquiries = (piRes.data as Record<string, unknown>[]) || [];
    auditEvents = (aeRes.data as Record<string, unknown>[]) || [];
  } catch (e) {
    dbError = e instanceof Error ? e.message : "Database connection failed";
  }

  const statusColors: Record<string, string> = {
    pending_email_verification: "bg-amber-100 text-amber-800",
    email_verified: "bg-blue-100 text-blue-800",
    active: "bg-emerald-100 text-emerald-800",
    expired: "bg-slate-100 text-slate-600",
    rejected: "bg-red-100 text-red-700",
    new: "bg-amber-100 text-amber-800",
    contacted: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">EngPulse Admin</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Internal overview — not public</p>
          </div>
          <Link href="/" className="text-sm text-blue-600 hover:underline">← Back to site</Link>
        </div>

        {dbError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
            Database error: {dbError}. Check SUPABASE env variables.
          </div>
        )}

        {/* Beta Requests */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
            Beta Requests ({betaRequests.length})
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  {["Name", "Email", "Company", "Plan", "Status", "Created", "Expires"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {betaRequests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-400">No beta requests yet.</td>
                  </tr>
                ) : (
                  betaRequests.map((r) => (
                    <tr key={r.id as string} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{r.full_name as string}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{r.email as string}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{r.company as string}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{r.selected_plan as string}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[r.status as string] || "bg-slate-100 text-slate-600"}`}>
                          {r.status as string}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{new Date(r.created_at as string).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">
                        {r.access_expires_at ? new Date(r.access_expires_at as string).toLocaleDateString() : "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing Inquiries */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
            Pricing Inquiries ({pricingInquiries.length})
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  {["Name", "Email", "Company", "Plan", "Status", "Created"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {pricingInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-400">No pricing inquiries yet.</td>
                  </tr>
                ) : (
                  pricingInquiries.map((r) => (
                    <tr key={r.id as string} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{r.full_name as string}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{r.email as string}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{r.company as string}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{r.selected_plan as string}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[r.status as string] || "bg-slate-100 text-slate-600"}`}>
                          {r.status as string}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{new Date(r.created_at as string).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Audit Events */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
            Audit Events (last 100)
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  {["Event", "Entity", "Email", "Time"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {auditEvents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-slate-400">No events yet.</td>
                  </tr>
                ) : (
                  auditEvents.map((e) => (
                    <tr key={e.id as string} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 font-mono text-xs text-blue-700 dark:text-blue-400">{e.event_type as string}</td>
                      <td className="px-4 py-3 text-xs text-slate-500">{e.entity_type as string}</td>
                      <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">{(e.email as string) || "—"}</td>
                      <td className="px-4 py-3 text-xs text-slate-500">{new Date(e.created_at as string).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
