import type { Metadata } from "next";
import { DebugClient } from "./DebugClient";

export const metadata: Metadata = {
  title: "Debug — EngPulse Internal",
  robots: { index: false, follow: false },
};

export default function DebugPage() {
  return <DebugClient />;
}
