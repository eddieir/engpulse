import type {
  Repository,
  Blocker,
  WeeklyMetric,
  WeeklyReport,
  BoardAnswer,
  KpiCard,
  User,
  Workspace,
  PullRequest,
  Issue,
} from "@/types";

export const mockUser: User = {
  id: "u1",
  name: "Alex Morgan",
  email: "alex@acmecloud.com",
  role: "cto",
  avatarUrl: "",
};

export const mockWorkspace: Workspace = {
  id: "ws1",
  name: "Acme Cloud",
  plan: "starter",
  timezone: "UTC",
  reportDay: "Monday",
  reportTone: "executive",
  reportRecipients: ["alex@acmecloud.com", "ceo@acmecloud.com"],
  connectedIntegrations: [
    {
      id: "i1",
      name: "GitHub",
      provider: "github",
      status: "connected",
      connectedAt: "2026-01-15",
    },
    { id: "i2", name: "Slack", provider: "slack", status: "coming_soon" },
    { id: "i3", name: "Jira", provider: "jira", status: "coming_soon" },
    { id: "i4", name: "Linear", provider: "linear", status: "coming_soon" },
    { id: "i5", name: "Notion", provider: "notion", status: "coming_soon" },
    { id: "i6", name: "GitLab", provider: "gitlab", status: "coming_soon" },
    {
      id: "i7",
      name: "Bitbucket",
      provider: "bitbucket",
      status: "coming_soon",
    },
    {
      id: "i8",
      name: "Azure DevOps",
      provider: "azure_devops",
      status: "coming_soon",
    },
  ],
};

export const mockRepositories: Repository[] = [
  {
    id: "r1",
    name: "web-app",
    provider: "github",
    language: "TypeScript",
    healthStatus: "healthy",
    shippedUpdates: 5,
    openPRs: 3,
    stuckPRs: 0,
    openBugs: 2,
    lastActivity: "2 hours ago",
    plainEnglishStatus: "Moving well — no blockers detected.",
  },
  {
    id: "r2",
    name: "api-service",
    provider: "github",
    language: "Go",
    healthStatus: "watch",
    shippedUpdates: 3,
    openPRs: 6,
    stuckPRs: 4,
    openBugs: 3,
    lastActivity: "5 hours ago",
    plainEnglishStatus: "Needs review attention — 4 PRs waiting too long.",
  },
  {
    id: "r3",
    name: "mobile-app",
    provider: "github",
    language: "Swift",
    healthStatus: "at_risk",
    shippedUpdates: 2,
    openPRs: 4,
    stuckPRs: 2,
    openBugs: 6,
    lastActivity: "1 day ago",
    plainEnglishStatus: "Bug pressure increasing — quality risk for release.",
  },
  {
    id: "r4",
    name: "payment-service",
    provider: "github",
    language: "Python",
    healthStatus: "watch",
    shippedUpdates: 1,
    openPRs: 3,
    stuckPRs: 1,
    openBugs: 1,
    lastActivity: "3 hours ago",
    plainEnglishStatus: "One PR blocking checkout improvements.",
  },
  {
    id: "r5",
    name: "infrastructure",
    provider: "github",
    language: "Terraform",
    healthStatus: "healthy",
    shippedUpdates: 1,
    openPRs: 1,
    stuckPRs: 0,
    openBugs: 0,
    lastActivity: "1 day ago",
    plainEnglishStatus: "Healthy — stable and on track.",
  },
  {
    id: "r6",
    name: "internal-tools",
    provider: "github",
    language: "JavaScript",
    healthStatus: "healthy",
    shippedUpdates: 0,
    openPRs: 1,
    stuckPRs: 0,
    openBugs: 1,
    lastActivity: "3 days ago",
    plainEnglishStatus: "Low activity this week — expected for this repo.",
  },
];

export const mockBlockers: Blocker[] = [
  {
    id: "b1",
    title: "Payment API PR waiting for review",
    repository: "payment-service",
    severity: "high",
    ageDays: 3,
    impact: "This may delay checkout improvements.",
    recommendedAction: "Assign a reviewer today.",
    owner: "Sarah Chen",
  },
  {
    id: "b2",
    title: "Mobile crash issue reopened twice",
    repository: "mobile-app",
    severity: "medium",
    ageDays: 5,
    impact: "Quality risk for next release.",
    recommendedAction: "Confirm root cause before release.",
    owner: "James Park",
  },
  {
    id: "b3",
    title: "Infrastructure dependency update blocked",
    repository: "infrastructure",
    severity: "low",
    ageDays: 7,
    impact: "Low immediate impact but may create future maintenance risk.",
    recommendedAction: "Schedule during next maintenance window.",
    owner: "Dev Ops Team",
  },
];

export const mockWeeklyMetrics: WeeklyMetric[] = [
  {
    week: "Apr 7",
    shippedUpdates: 8,
    stuckPRs: 3,
    openBugs: 8,
    blockers: 1,
    healthScore: 88,
    reviewBottlenecks: 3,
  },
  {
    week: "Apr 14",
    shippedUpdates: 10,
    stuckPRs: 4,
    openBugs: 9,
    blockers: 2,
    healthScore: 85,
    reviewBottlenecks: 4,
  },
  {
    week: "Apr 21",
    shippedUpdates: 9,
    stuckPRs: 5,
    openBugs: 11,
    blockers: 2,
    healthScore: 80,
    reviewBottlenecks: 5,
  },
  {
    week: "Apr 28",
    shippedUpdates: 12,
    stuckPRs: 7,
    openBugs: 13,
    blockers: 3,
    healthScore: 76,
    reviewBottlenecks: 7,
  },
];

export const mockBoardAnswers: BoardAnswer[] = [
  {
    id: "ba1",
    question: "Are we moving fast enough?",
    answer:
      "Yes, but review delays are beginning to reduce momentum. The team shipped 12 updates this week — a strong number.",
    status: "green",
  },
  {
    id: "ba2",
    question: "What slowed the team down this week?",
    answer:
      "The biggest delay came from pull requests waiting more than two days for review, primarily in api-service.",
    status: "yellow",
  },
  {
    id: "ba3",
    question: "Are bugs increasing?",
    answer:
      "Bug pressure is stable overall, but mobile-app has three new high-priority issues that need attention before the next release.",
    status: "yellow",
  },
  {
    id: "ba4",
    question: "Which area needs leadership attention?",
    answer:
      "api-service needs clearer review ownership. Four pull requests have been waiting more than 48 hours for feedback.",
    status: "red",
  },
  {
    id: "ba5",
    question: "What shipped this week?",
    answer:
      "The team merged 12 meaningful updates across web-app, api-service, and mobile-app. A strong delivery week.",
    status: "green",
  },
  {
    id: "ba6",
    question: "What should we ask engineering next?",
    answer:
      "Ask who owns review coverage for api-service and whether the mobile bugs affect the next planned release date.",
    status: "yellow",
  },
];

export const mockKpiCards: KpiCard[] = [
  {
    id: "k1",
    label: "Shipping Speed",
    value: "12 shipped",
    trend: "+18% vs last week",
    trendDirection: "up",
    trendPositive: true,
    explanation:
      "How consistently the team is getting completed work merged and released.",
    whyItMatters:
      "Shipping speed tells you whether the team is translating work into delivered value. Slowing shipping often signals review bottlenecks or unclear priorities.",
    whatChanged:
      "The team merged 12 updates this week, up from 9 last week. web-app and api-service drove most of the increase.",
    leadershipQuestion:
      "What enabled the team to ship more this week? Can we sustain this pace next week?",
  },
  {
    id: "k2",
    label: "Review Bottlenecks",
    value: "7 PRs waiting",
    trend: "3 more than last week",
    trendDirection: "up",
    trendPositive: false,
    explanation:
      "Where work is waiting too long for feedback or approval from teammates.",
    whyItMatters:
      "When pull requests wait too long, completed work cannot reach production. This delays delivery and creates frustration for the engineering team.",
    whatChanged:
      "Review bottlenecks increased from 4 last week to 7 this week. api-service accounts for 4 of the 7 stuck pull requests.",
    leadershipQuestion:
      "Who owns review coverage in api-service? Is there a capacity issue or an ownership gap?",
  },
  {
    id: "k3",
    label: "Bug Risk",
    value: "Medium",
    trend: "Stable overall",
    trendDirection: "stable",
    trendPositive: true,
    explanation:
      "Whether bug-related work is growing faster than feature delivery.",
    whyItMatters:
      "Rising bug pressure often signals quality issues building up before a release. Catching it early prevents larger disruptions.",
    whatChanged:
      "Overall bug pressure is stable, but mobile-app saw 3 new high-priority bug reports this week, which is above average.",
    leadershipQuestion:
      "Are the mobile bugs affecting the next planned release? Should we delay or scope down?",
  },
  {
    id: "k4",
    label: "Delivery Confidence",
    value: "78%",
    trend: "Slightly down",
    trendDirection: "down",
    trendPositive: false,
    explanation:
      "How likely the team is to maintain current delivery pace next week based on current blockers and trends.",
    whyItMatters:
      "Delivery confidence gives you an early signal of whether current risks and blockers will affect next week's output.",
    whatChanged:
      "Confidence dropped from 84% last week due to increasing review delays and mobile bug pressure. No critical blockers yet.",
    leadershipQuestion:
      "What would need to change this week to restore confidence to above 85%?",
  },
];

export const mockWeeklyReport: WeeklyReport = {
  id: "wr1",
  dateRange: "Apr 28 – May 4, 2026",
  generatedAt: "May 5, 2026",
  summary:
    "Engineering is mostly healthy this week. The team shipped 12 meaningful updates, but review delays in api-service and mobile-app may slow next week's delivery. Leadership should focus on unblocking code review ownership in api-service.",
  healthScore: 76,
  healthStatus: "watch",
  deliveryConfidence: 78,
  shipped: [
    "5 updates shipped in web-app including user authentication improvements",
    "3 updates merged in api-service including new endpoint optimization",
    "2 updates shipped in mobile-app including UI improvements",
    "1 infrastructure update completed",
    "1 payment service improvement merged",
  ],
  slowedDown: [
    "4 pull requests in api-service have been waiting more than 2 days for review",
    "Mobile app review cycles taking 40% longer than average",
    "Payment service PR blocked by missing reviewer assignment",
  ],
  risks: [
    "api-service has 4 pull requests stuck in review — delivery risk if not unblocked",
    "mobile-app has 3 new high-priority bugs — quality risk for next release",
    "Review workload concentrated on 2 engineers — single point of failure risk",
  ],
  recommendedActions: [
    "Assign a reviewer to the payment-service PR today",
    "Clarify review ownership for api-service this week",
    "Confirm mobile bug root cause before next release commitment",
    "Consider adding one more reviewer to reduce bottleneck concentration",
  ],
  repositoryHealth: mockRepositories,
  boardAnswers: mockBoardAnswers,
};

export const mockPullRequests: PullRequest[] = [
  {
    id: "pr1",
    title: "Add checkout flow improvements",
    repository: "payment-service",
    author: "Sarah Chen",
    status: "open",
    createdAt: "2026-05-02",
    waitingHours: 72,
  },
  {
    id: "pr2",
    title: "Optimize API response caching",
    repository: "api-service",
    author: "Marcus Lee",
    status: "in_review",
    createdAt: "2026-05-01",
    reviewedAt: "2026-05-03",
    waitingHours: 48,
  },
  {
    id: "pr3",
    title: "Fix authentication edge case",
    repository: "web-app",
    author: "Priya Patel",
    status: "merged",
    createdAt: "2026-04-30",
    reviewedAt: "2026-05-01",
    mergedAt: "2026-05-02",
    waitingHours: 0,
  },
];

export const mockIssues: Issue[] = [
  {
    id: "i1",
    title: "App crash on iOS 17 on login screen",
    repository: "mobile-app",
    type: "bug",
    severity: "high",
    status: "open",
    createdAt: "2026-05-03",
  },
  {
    id: "i2",
    title: "Payment webhook occasionally times out",
    repository: "payment-service",
    type: "bug",
    severity: "high",
    status: "in_progress",
    createdAt: "2026-05-01",
  },
  {
    id: "i3",
    title: "Search results missing pagination",
    repository: "web-app",
    type: "feature",
    severity: "medium",
    status: "open",
    createdAt: "2026-04-28",
  },
];
