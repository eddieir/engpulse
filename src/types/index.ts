export type UserRole =
  | "founder_ceo"
  | "cto"
  | "vp_engineering"
  | "engineering_manager"
  | "product_leader"
  | "other";

export type HealthStatus = "healthy" | "watch" | "at_risk" | "critical";
export type Severity = "high" | "medium" | "low";
export type Plan = "free" | "starter" | "team" | "enterprise";
export type ReportTone =
  | "executive"
  | "founder"
  | "technical"
  | "board_ready";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Workspace {
  id: string;
  name: string;
  plan: Plan;
  connectedIntegrations: Integration[];
  timezone: string;
  reportDay: string;
  reportTone: ReportTone;
  reportRecipients: string[];
}

export interface Integration {
  id: string;
  name: string;
  provider:
    | "github"
    | "slack"
    | "jira"
    | "linear"
    | "notion"
    | "gitlab"
    | "bitbucket"
    | "azure_devops";
  status: "connected" | "coming_soon" | "disconnected";
  connectedAt?: string;
}

export interface Repository {
  id: string;
  name: string;
  provider: "github" | "gitlab" | "bitbucket";
  language: string;
  healthStatus: HealthStatus;
  shippedUpdates: number;
  openPRs: number;
  stuckPRs: number;
  openBugs: number;
  lastActivity: string;
  plainEnglishStatus: string;
  selected?: boolean;
}

export interface PullRequest {
  id: string;
  title: string;
  repository: string;
  author: string;
  status: "open" | "in_review" | "merged" | "closed";
  createdAt: string;
  reviewedAt?: string;
  mergedAt?: string;
  waitingHours: number;
}

export interface Issue {
  id: string;
  title: string;
  repository: string;
  type: "bug" | "feature" | "task" | "improvement";
  severity: Severity;
  status: "open" | "in_progress" | "closed";
  createdAt: string;
}

export interface Blocker {
  id: string;
  title: string;
  repository: string;
  severity: Severity;
  ageDays: number;
  impact: string;
  recommendedAction: string;
  owner?: string;
}

export interface WeeklyMetric {
  week: string;
  shippedUpdates: number;
  stuckPRs: number;
  openBugs: number;
  blockers: number;
  healthScore: number;
  reviewBottlenecks: number;
}

export interface HealthScoreBreakdown {
  shippingMomentum: number;
  reviewFlow: number;
  bugPressure: number;
  blockedWork: number;
  repositoryStability: number;
}

export interface WeeklyReport {
  id: string;
  dateRange: string;
  generatedAt: string;
  summary: string;
  healthScore: number;
  healthStatus: HealthStatus;
  deliveryConfidence: number;
  shipped: string[];
  slowedDown: string[];
  risks: string[];
  recommendedActions: string[];
  repositoryHealth: Repository[];
  boardAnswers: BoardAnswer[];
}

export interface BoardAnswer {
  id: string;
  question: string;
  answer: string;
  status: "green" | "yellow" | "red";
}

export interface KpiCard {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down" | "stable";
  trendPositive: boolean;
  explanation: string;
  whyItMatters: string;
  whatChanged: string;
  leadershipQuestion: string;
}
