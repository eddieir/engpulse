import type { Metadata } from "next";
import { ConnectGithubClient } from "./ConnectGithubClient";

export const metadata: Metadata = {
  title: "Connect GitHub — EngPulse",
  robots: { index: false, follow: false },
};

export default async function ConnectGithubPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; connected?: string }>;
}) {
  const params = await searchParams;
  // "connected" is a success signal from the real OAuth callback
  const signal = params.connected === "true" ? "connected" : params.error;
  return <ConnectGithubClient error={signal} />;
}
