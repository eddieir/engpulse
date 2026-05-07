import type { Metadata } from "next";
import { BetaPageClient } from "./BetaPageClient";

export const metadata: Metadata = {
  title: "Join the Beta — EngPulse",
  description:
    "Get early access to EngPulse. Engineering intelligence for CTOs, founders, and CEOs — board-ready weekly reports from GitHub activity.",
};

export default function BetaPage() {
  return <BetaPageClient />;
}
