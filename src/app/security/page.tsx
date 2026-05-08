import type { Metadata } from "next";
import { SecurityPageClient } from "./SecurityPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://engplus.netlify.app";

export const metadata: Metadata = {
  title: "EngPulse Security — Read-Only GitHub Access and Privacy",
  description:
    "EngPulse never modifies your code. We use read-only GitHub access to read pull requests, issues, and commits. No secrets, no code content, no individual tracking.",
  alternates: { canonical: `${SITE_URL}/security` },
  openGraph: {
    title: "EngPulse Security — Read-Only GitHub Access and Privacy",
    description:
      "EngPulse uses read-only GitHub access. We never modify code, open PRs, or access secrets. Full security transparency.",
    url: `${SITE_URL}/security`,
  },
};

export default function SecurityPage() {
  return <SecurityPageClient />;
}
