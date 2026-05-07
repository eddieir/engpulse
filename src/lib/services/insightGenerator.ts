import type { Repository, Blocker } from "@/types";

export function generatePlainEnglishInsights(
  repos: Repository[],
  blockers: Blocker[]
): string[] {
  const insights: string[] = [];

  const totalStuck = repos.reduce((s, r) => s + r.stuckPRs, 0);
  if (totalStuck > 5) {
    insights.push("Code review is becoming a delivery bottleneck.");
  }

  const atRisk = repos.filter((r) => r.healthStatus === "at_risk");
  if (atRisk.length > 0) {
    insights.push(
      `Most delivery risk is concentrated in ${atRisk.map((r) => r.name).join(", ")}.`
    );
  }

  const highBlockers = blockers.filter((b) => b.severity === "high");
  if (highBlockers.length === 0) {
    insights.push("No major leadership intervention is needed this week.");
  } else {
    insights.push(
      `${highBlockers.length} high-priority ${highBlockers.length === 1 ? "issue requires" : "issues require"} immediate attention.`
    );
  }

  const totalShipped = repos.reduce((s, r) => s + r.shippedUpdates, 0);
  if (totalShipped >= 10) {
    insights.push("The team shipped more this week than last week.");
  }

  const bugHeavy = repos.filter((r) => r.openBugs > 4);
  if (bugHeavy.length > 0) {
    insights.push(
      `Bug pressure is rising in ${bugHeavy.map((r) => r.name).join(", ")} and may reduce feature delivery next week.`
    );
  }

  return insights;
}

export function generateCeoSummary(
  repos: Repository[],
  blockers: Blocker[],
  healthScore: number
): string {
  const totalShipped = repos.reduce((s, r) => s + r.shippedUpdates, 0);
  const totalStuck = repos.reduce((s, r) => s + r.stuckPRs, 0);
  const atRisk = repos.filter((r) => r.healthStatus === "at_risk");
  const highBlockers = blockers.filter((b) => b.severity === "high");

  const statusWord =
    healthScore >= 85
      ? "healthy"
      : healthScore >= 70
        ? "mostly healthy"
        : "under pressure";

  let summary = `Engineering is ${statusWord} this week. The team shipped ${totalShipped} meaningful updates`;

  if (totalStuck > 3) {
    const worstRepo = repos.reduce((a, b) => (a.stuckPRs > b.stuckPRs ? a : b));
    summary += `, but review delays in ${worstRepo.name}`;
    if (atRisk.length > 0 && atRisk[0].name !== worstRepo.name) {
      summary += ` and ${atRisk[0].name}`;
    }
    summary += " may slow next week's delivery.";
  } else {
    summary += " with no significant bottlenecks.";
  }

  if (highBlockers.length > 0) {
    summary += ` Leadership should focus on ${highBlockers[0].recommendedAction.toLowerCase()}`;
  }

  return summary;
}
