import type { Metadata } from "next";
import { SecurityPageClient } from "./SecurityPageClient";

export const metadata: Metadata = {
  title: "Security — EngPulse",
  description:
    "EngPulse uses read-only GitHub access. We never modify your code, open PRs, or access secrets. Learn exactly what we read and why.",
};

export default function SecurityPage() {
  return <SecurityPageClient />;
}
