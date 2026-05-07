import type { Repository, Blocker, HealthStatus } from "@/types";
import { mockRepositories, mockBlockers } from "@/lib/mock-data";

export function calculateHealthScore(repos: Repository[], blockers: Blocker[]): number {
  let score = 100;

  // Subtract for high-severity blockers
  const highBlockers = blockers.filter((b) => b.severity === "high");
  score -= highBlockers.length * 5;

  // Subtract for medium blockers
  const medBlockers = blockers.filter((b) => b.severity === "medium");
  score -= medBlockers.length * 2;

  // Subtract for stuck PRs (waiting > 48h)
  const totalStuckPRs = repos.reduce((sum, r) => sum + r.stuckPRs, 0);
  score -= totalStuckPRs * 3;

  // Subtract for at-risk repos
  const atRiskRepos = repos.filter((r) => r.healthStatus === "at_risk");
  score -= atRiskRepos.length * 4;

  // Subtract for critical repos
  const criticalRepos = repos.filter((r) => r.healthStatus === "critical");
  score -= criticalRepos.length * 8;

  return Math.max(0, Math.min(100, score));
}

export function getHealthStatus(score: number): HealthStatus {
  if (score >= 85) return "healthy";
  if (score >= 70) return "watch";
  if (score >= 50) return "at_risk";
  return "critical";
}

export async function calculateShippingSpeed(): Promise<{
  value: number;
  trend: number;
}> {
  const repos = await Promise.resolve(mockRepositories);
  const total = repos.reduce((sum, r) => sum + r.shippedUpdates, 0);
  return { value: total, trend: 18 };
}

export async function calculateReviewBottlenecks(): Promise<{
  count: number;
  delta: number;
}> {
  const repos = await Promise.resolve(mockRepositories);
  const total = repos.reduce((sum, r) => sum + r.stuckPRs, 0);
  return { count: total, delta: 3 };
}

export async function calculateBugPressure(): Promise<{
  level: "low" | "medium" | "high";
  trend: "increasing" | "stable" | "decreasing";
}> {
  const repos = await Promise.resolve(mockRepositories);
  const totalBugs = repos.reduce((sum, r) => sum + r.openBugs, 0);
  const level = totalBugs > 15 ? "high" : totalBugs > 8 ? "medium" : "low";
  return { level, trend: "stable" };
}

export async function calculateDeliveryConfidence(): Promise<number> {
  const repos = await Promise.resolve(mockRepositories);
  const blockers = await Promise.resolve(mockBlockers);
  const score = calculateHealthScore(repos, blockers);
  // Confidence correlates with health but can diverge based on trend
  return Math.round(score * 0.95 - 0.5);
}
