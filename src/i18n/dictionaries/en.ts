export const en = {
  nav: {
    product: "Product",
    demo: "Demo",
    pricing: "Pricing",
    security: "Security",
    joinBeta: "Join beta",
    viewDemo: "View demo",
  },
  languages: {
    en: "English",
    it: "Italiano",
    es: "Español",
    zh: "中文",
  },
  hero: {
    badge: "GitHub-powered leadership intelligence",
    headlinePre: "Turn GitHub activity into a ",
    headlineAccent: "board-ready",
    headlinePost: " engineering report.",
    subtitle:
      "EngPulse translates pull requests, issues, blockers, and shipping activity into plain-English weekly reports that CTOs, founders, and CEOs can understand in 30 seconds.",
    ctaPrimary: "View live demo",
    ctaSecondary: "Join beta",
    trust:
      "GitHub MVP now. Slack, Jira, Linear, Notion, GitLab, Bitbucket, and Azure DevOps coming soon.",
    trustBadges: {
      readOnly: "Read-only GitHub access",
      noCard: "No credit card required",
      setup: "Setup in under 5 minutes",
    },
    dashboardLabels: {
      healthScore: "Health Score",
      status: "Watch",
      ceoSummary: "CEO Summary",
      shipped: "Shipped This Week",
      shippedSub: "+18% vs last week",
      prsWaiting: "PRs Waiting",
      prsSub: "Need attention",
      confidence: "Delivery Confidence",
      confidenceSub: "Slightly down",
      summaryText:
        "Engineering is mostly healthy this week. The team shipped 12 meaningful updates, but review delays in api-service may slow next week. Leadership should focus on unblocking code review ownership.",
    },
  },
  socialProof: {
    intro: "Built for",
    roles: ["CTO", "VP Engineering", "Technical Founder", "CEO"],
    tagline: "Stop writing Friday engineering updates by hand.",
  },
  pain: {
    headline: "Engineering teams are busy.",
    headlineAccent: "Leadership still has no clear story.",
    subtitle:
      "Most engineering tools are built for engineers. Dashboards are full of jargon, raw metrics, and charts that don't answer leadership questions.",
    detail:
      "Every Friday, engineering leaders turn raw GitHub activity into status updates, slides, and meeting notes. EngPulse does that translation automatically.",
    cards: [
      {
        title: "Too technical for leadership",
        text: "GitHub is too technical for non-technical managers to read directly.",
      },
      {
        title: "Manual weekly updates",
        text: "Weekly engineering updates are still written manually every Friday.",
      },
      {
        title: "Late bottleneck discovery",
        text: "PR bottlenecks and blockers are discovered too late to act on.",
      },
      {
        title: "Hours on board updates",
        text: "Board updates and CEO summaries take hours to prepare each week.",
      },
      {
        title: "Metrics without meaning",
        text: "Raw metrics do not explain business risk or delivery confidence.",
      },
      {
        title: "No plain-English answers",
        text: "CEOs ask simple questions, but engineering tools answer with jargon.",
      },
    ],
  },
  transformation: {
    headline: "From raw signals to executive clarity.",
    subtitle:
      "EngPulse transforms GitHub noise into leadership signal — automatically, every week.",
    rawTitle: "Raw GitHub signals",
    insightTitle: "Leadership insights",
    rawItems: [
      "Pull requests",
      "Issues & bugs",
      "Commits & releases",
      "Review delays",
      "Stuck work",
      "Bug labels",
    ],
    insightItems: [
      "What shipped",
      "What slowed down",
      "What needs attention",
      "What leadership should ask",
      "Board-ready summary",
      "Delivery confidence",
    ],
    arrowLabel: "EngPulse translates",
  },
  boardAnswers: {
    headline: "Answers leadership actually needs.",
    subtitle:
      "Stop spending Friday afternoon writing engineering updates. EngPulse answers the questions leadership actually asks.",
    cards: [
      {
        q: "Are we moving fast enough?",
        a: "Yes, but review delays are starting to reduce momentum.",
        status: "green" as const,
      },
      {
        q: "What slowed the team down?",
        a: "Pull requests in api-service waited too long for review.",
        status: "yellow" as const,
      },
      {
        q: "Are bugs increasing?",
        a: "Bug pressure is stable, but mobile-app has three high-priority issues.",
        status: "yellow" as const,
      },
      {
        q: "Which area needs attention?",
        a: "api-service needs clearer review ownership this week.",
        status: "yellow" as const,
      },
      {
        q: "What shipped?",
        a: "The team shipped 12 meaningful updates across three repositories.",
        status: "green" as const,
      },
      {
        q: "What should leadership ask next?",
        a: "Ask who owns review coverage and whether mobile bugs affect the next release.",
        status: "green" as const,
      },
    ],
    cta: "See the full dashboard",
  },
  howItWorks: {
    headline: "Up and running in 3 steps",
    subtitle: "No complex setup. No engineering help needed.",
    steps: [
      {
        title: "Connect GitHub",
        description:
          "Authorize read-only access to your GitHub organization. EngPulse never modifies your code.",
      },
      {
        title: "Select repositories",
        description:
          "Choose which repositories to monitor. Start with one or track your entire organization.",
      },
      {
        title: "Get your weekly report",
        description:
          "Every Monday, receive a plain-English engineering report you can share with your CEO or board.",
      },
    ],
    note: "Current MVP uses GitHub. More integrations are coming.",
    available: "Available now",
    inBeta: "In beta",
  },
  integrations: {
    headline: "Start with GitHub. More coming soon.",
    subtitle:
      "EngPulse is building the complete engineering intelligence platform.",
    live: "Live",
    soon: "Soon",
    items: [
      {
        name: "GitHub",
        status: "live" as const,
        description: "Pull requests, issues, commits",
      },
      {
        name: "Slack",
        status: "soon" as const,
        description: "Team notifications & updates",
      },
      {
        name: "Jira",
        status: "soon" as const,
        description: "Issue tracking & sprints",
      },
      {
        name: "Linear",
        status: "soon" as const,
        description: "Project & issue management",
      },
      {
        name: "Notion",
        status: "soon" as const,
        description: "Documentation & wikis",
      },
      {
        name: "GitLab",
        status: "soon" as const,
        description: "CI/CD & repository data",
      },
      {
        name: "Bitbucket",
        status: "soon" as const,
        description: "Code hosting & pipelines",
      },
      {
        name: "Azure DevOps",
        status: "soon" as const,
        description: "Boards, repos & pipelines",
      },
    ],
  },
  securityPreview: {
    sectionLabel: "Security",
    headline: "Read-only by design.",
    subtitle:
      "EngPulse analyzes repository activity. It never modifies your code, opens PRs, writes issues, or accesses secrets.",
    points: [
      "Reads repository metadata and activity",
      "Reads pull requests and issues",
      "Reads commits and releases",
      "Never modifies code or opens PRs",
      "Never accesses secrets or credentials",
      "Disconnect anytime with one click",
    ],
    cta: "Read full security details",
    tagline: "EngPulse measures delivery flow, not individual developer performance.",
  },
  pricing: {
    headline: "Simple, transparent pricing",
    subtitle: "Start free during beta. Upgrade when your team grows.",
    perMonth: "/month",
    urgency: "Limited beta spots — first 100 users receive early-adopter pricing.",
    enterprise: "Need more repositories or a custom setup?",
    contactUs: "Contact us",
    plans: [
      {
        name: "Free Beta",
        price: "€0",
        description: "For early validation and demo access.",
        features: [
          "Demo dashboard access",
          "1 repository when live",
          "Manual report preview",
          "Beta feedback access",
        ],
        cta: "Join beta",
        highlight: false,
        badge: "Current",
      },
      {
        name: "Starter",
        price: "€49",
        description: "For small engineering teams.",
        features: [
          "Up to 10 repositories",
          "Weekly leadership report",
          "Repository health dashboard",
          "Shareable report link",
          "Email report delivery",
          "GitHub integration",
        ],
        cta: "Join beta",
        highlight: true,
        badge: "Most popular",
      },
      {
        name: "Team",
        price: "€149",
        description: "For growing engineering organizations.",
        features: [
          "Up to 50 repositories",
          "Multiple report recipients",
          "Multiple teams",
          "Advanced repository health",
          "Slack/Jira/Linear when available",
          "Custom report tone",
        ],
        cta: "Join beta",
        highlight: false,
        badge: null,
      },
    ],
    faq: {
      headline: "Frequently asked questions",
      items: [
        {
          q: "Is this connected to GitHub today?",
          a: "EngPulse is currently in beta with a demo dashboard using mock data. GitHub integration is the first live connection and is being validated.",
        },
        {
          q: "Does EngPulse modify code?",
          a: "Never. EngPulse uses read-only GitHub access. It cannot write, push, open PRs, or modify anything in your repositories.",
        },
        {
          q: "Is this for tracking individual developers?",
          a: "No. EngPulse measures team-level delivery flow, not individual performance. It is designed to help teams remove blockers, not rank engineers.",
        },
        {
          q: "Can I use it with private repositories?",
          a: "Yes. EngPulse will support private repositories with appropriate OAuth scopes.",
        },
        {
          q: "When are Slack/Jira/Linear integrations coming?",
          a: "We are building the GitHub integration first. Slack, Jira, Linear, and other integrations will follow based on beta user feedback.",
        },
        {
          q: "Can I cancel anytime?",
          a: "Yes. No long-term commitment required. Cancel from your settings page at any time.",
        },
      ],
    },
  },
  security: {
    hero: {
      headline: "Read-only by design.",
      subtitle:
        "EngPulse was built from the ground up with trust and privacy in mind. We analyze your engineering activity to surface leadership insights — and nothing more.",
    },
    sections: {
      whatWeNever: {
        title: "What EngPulse never does",
        items: [
          "Modify, push, or delete code",
          "Open pull requests or issues",
          "Access secrets, keys, or credentials",
          "Store raw code or file contents",
          "Track individual developer performance",
          "Sell or share your data",
        ],
      },
      whatWeRead: {
        title: "What EngPulse reads",
        items: [
          "Repository metadata (names, descriptions, activity)",
          "Pull request titles, status, and review timelines",
          "Issue titles, labels, and open/close status",
          "Commit counts and release activity",
          "Contributor patterns at the team level",
        ],
      },
      permissions: {
        title: "GitHub permissions explained",
        subtitle:
          "EngPulse requests only the minimum GitHub OAuth scopes needed to read repository activity.",
        items: [
          {
            scope: "contents: read",
            description:
              "Read-only access to repository metadata, commit history, and release information. We cannot write or modify any content.",
          },
          {
            scope: "pull_requests: read",
            description:
              "Read-only access to pull request titles, status, review timelines, and comments. We cannot open, close, or modify PRs.",
          },
          {
            scope: "issues: read",
            description:
              "Read-only access to issue titles, labels, and open/close status. We cannot create or modify issues.",
          },
          {
            scope: "read:org",
            description:
              "Read organization membership and repository list. Required to enumerate which repositories your organization owns.",
          },
        ],
      },
      privacy: {
        title: "Data privacy",
        text: "EngPulse processes GitHub activity data to generate leadership insights. We do not store raw code, commit diffs, or file contents. Report data is stored securely and only accessible to authorized workspace members.",
      },
      surveillance: {
        title: "Not employee surveillance",
        text: "EngPulse measures delivery flow, not individual developer performance. It is designed to help engineering leaders understand team health and remove blockers — not to rank, monitor, or evaluate individual engineers.",
        quote:
          "Your engineering data should create clarity, not fear.",
      },
      disconnect: {
        title: "Disconnect anytime",
        text: "You can disconnect GitHub and remove all associated data from your EngPulse workspace at any time from the settings page. No questions asked.",
      },
    },
  },
  beta: {
    headline: "Get early access to EngPulse.",
    subtitle:
      "Join engineering leaders who want clearer reporting without the manual work. Beta access is limited.",
    form: {
      name: "Full name",
      email: "Work email",
      company: "Company name",
      role: "Your role",
      teamSize: "Engineering team size",
      repos: "How many GitHub repositories?",
      currentMethod: "Current reporting method",
      pain: "What is your biggest reporting pain point?",
      submit: "Request beta access",
      success:
        "Thanks — your beta request has been saved. We will be in touch shortly.",
      roles: [
        "Founder / CEO",
        "CTO",
        "VP Engineering",
        "Engineering Manager",
        "Product Leader",
        "Other",
      ],
      teamSizes: ["1–5", "6–15", "16–30", "31–50", "50+"],
    },
    trust: [
      "Read-only GitHub access",
      "No credit card required",
      "Beta feedback welcome",
    ],
  },
  onboarding: {
    steps: ["Your role", "Connect GitHub", "Select repos", "Report settings", "Preview"],
    step1: {
      headline: "What role best describes you?",
      subtitle: "This helps us customize your report focus.",
      options: [
        "Founder / CEO",
        "CTO",
        "VP Engineering",
        "Engineering Manager",
        "Product Leader",
        "Other",
      ],
    },
    step2: {
      headline: "Connect your GitHub organization.",
      subtitle: "EngPulse uses read-only access. We never modify your code.",
      connectBtn: "Connect GitHub",
      simulated: "GitHub connection simulated for demo purposes.",
      permissions: [
        "Reads repository metadata",
        "Reads pull requests and issues",
        "Reads commits and releases",
        "Never modifies code",
        "Never accesses secrets",
        "Disconnect anytime",
      ],
    },
    step3: {
      headline: "Select repositories to monitor.",
      subtitle: "Choose which repositories to include in your weekly report.",
    },
    step4: {
      headline: "Configure your report.",
      subtitle: "Set up who receives the report and how it should be written.",
      emailLabel: "Report recipients (email)",
      dayLabel: "Report day",
      toneLabel: "Report tone",
      tones: [
        "Executive summary",
        "Founder-friendly",
        "Technical leadership",
        "Board-ready",
      ],
    },
    step5: {
      headline: "Your report is ready.",
      subtitle: "Here is a preview of your weekly engineering leadership report.",
      openDashboard: "Open dashboard",
    },
    next: "Continue",
    back: "Back",
  },
  cta: {
    headline: "Stop translating GitHub manually.",
    subtitle:
      "Show your engineering story clearly before the next leadership meeting.",
    primary: "View demo",
    secondary: "Join beta",
  },
  footer: {
    tagline: "Engineering clarity for non-technical leaders.",
    product: "Product",
    integrations: "Integrations",
    legal: "Legal",
    betaBadge: "Public Beta",
    copyright: "© 2026 EngPulse. All rights reserved.",
    built: "Built for engineering leaders who value clarity.",
    links: {
      demo: "Demo",
      pricing: "Pricing",
      security: "Security",
      beta: "Beta",
      privacy: "Privacy",
      terms: "Terms",
    },
  },
  dashboard: {
    overview: "Overview",
    weekOf: "Week of",
    ceoView: "CEO View",
    engineeringView: "Engineering View",
    ceoSummary: "CEO Summary",
    engSummary: "Engineering Summary",
    healthScore: "Engineering Health Score",
    howCalculated: "How this is calculated",
    scoreExplanation:
      "This score combines shipping activity, review flow, bug pressure, blocked work, and repository activity.",
    scoreCategories: [
      { label: "Healthy", range: "85–100" },
      { label: "Watch", range: "70–84" },
      { label: "At Risk", range: "50–69" },
      { label: "Critical", range: "0–49" },
    ],
    viewAll: "View all",
    activeBlockers: "Active blockers",
    blockersSubtitle: "Issues requiring leadership attention",
    boardAnswers: "Board-ready answers",
    fullReport: "Full report",
    repositories: "Repositories",
    trends: "Trends",
    settings: "Settings",
    weeklyReport: "Weekly Report",
    blockers: "Blockers",
    updatedAgo: "Updated 2h ago",
    refresh: "Refresh",
    demoBanner:
      "Live demo — This dashboard uses realistic mock data for Acme Cloud.",
    connectGitHub: "Connect your GitHub",
    connectBtn: "Join beta",
    kpiExplanations: {
      shippingSpeed:
        "How consistently the team is getting completed work merged and released.",
      reviewBottlenecks:
        "Where work is waiting too long for review or approval.",
      bugRisk:
        "Whether bug-related work is growing faster than feature delivery.",
      deliveryConfidence:
        "How likely the team is to maintain current delivery pace next week.",
    },
  },
  report: {
    title: "Weekly Engineering Leadership Report",
    subtitle: "Acme Cloud",
    sections: {
      execSummary: "Executive Summary",
      healthScore: "Engineering Health Score",
      whatShipped: "What Shipped",
      whatSlowed: "What Slowed Down",
      risks: "Current Risks",
      questions: "Leadership Questions",
      repoHealth: "Repository Health",
      actions: "Recommended Actions",
    },
    actions: {
      copyLink: "Copy share link",
      exportPdf: "Export PDF",
      sendEmail: "Send by email",
      copied: "Copied!",
    },
    disclaimer:
      "This report is generated from GitHub activity data and is intended for leadership review. Data reflects the week shown above.",
  },
};

export type Dictionary = typeof en;
