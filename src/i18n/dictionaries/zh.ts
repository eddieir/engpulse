import type { Dictionary } from "./en";

export const zh: Dictionary = {
  nav: {
    product: "产品",
    demo: "演示",
    pricing: "定价",
    security: "安全",
    joinBeta: "加入测试版",
    viewDemo: "查看演示",
  },
  languages: {
    en: "English",
    it: "Italiano",
    es: "Español",
    zh: "中文",
  },
  hero: {
    badge: "基于 GitHub 的工程领导力智能",
    headlinePre: "将 GitHub 活动转化为",
    headlineAccent: "董事会级别",
    headlinePost: "的工程报告。",
    subtitle:
      "EngPulse 将拉取请求、问题、阻塞和发布活动转化为简明周报，让 CTO、创始人和 CEO 能在 30 秒内理解。",
    ctaPrimary: "查看实时演示",
    ctaSecondary: "加入测试版",
    trust:
      "GitHub MVP 现已可用。Slack、Jira、Linear、Notion、GitLab、Bitbucket 和 Azure DevOps 即将推出。",
    trustBadges: {
      readOnly: "GitHub 只读访问",
      noCard: "无需信用卡",
      setup: "5 分钟内完成设置",
    },
    dashboardLabels: {
      healthScore: "健康评分",
      status: "关注",
      ceoSummary: "CEO 摘要",
      shipped: "本周发布",
      shippedSub: "+18% 较上周",
      prsWaiting: "等待中的 PR",
      prsSub: "需要关注",
      confidence: "交付信心",
      confidenceSub: "略有下降",
      summaryText:
        "本周工程团队整体健康。团队发布了 12 项重要更新，但 api-service 的审查延迟可能会拖慢下周进度。",
    },
  },
  socialProof: {
    intro: "专为以下用户设计",
    roles: ["CTO", "工程副总裁", "技术创始人", "CEO"],
    tagline: "停止手动撰写每周五的工程更新。",
  },
  pain: {
    headline: "工程团队很忙。",
    headlineAccent: "管理层仍然没有清晰的进展故事。",
    subtitle:
      "大多数工程工具是为工程师构建的。仪表板充满了术语、原始指标和无法回答管理层问题的图表。",
    detail:
      "每周五，工程领导者将 GitHub 的原始活动转化为状态更新、幻灯片和会议记录。EngPulse 自动完成这种转化。",
    cards: [
      {
        title: "对管理层过于技术化",
        text: "GitHub 对非技术管理者来说太技术化，难以直接阅读。",
      },
      {
        title: "手动周报更新",
        text: "工程周报仍然每周五手动编写。",
      },
      {
        title: "发现瓶颈太晚",
        text: "PR 瓶颈和阻塞发现得太晚，无法及时采取行动。",
      },
      {
        title: "董事会更新耗时数小时",
        text: "董事会报告和 CEO 摘要每周需要数小时准备。",
      },
      {
        title: "指标没有意义",
        text: "原始指标无法解释业务风险或交付信心。",
      },
      {
        title: "没有简单易懂的答案",
        text: "CEO 提出简单问题，但工具用术语回答。",
      },
    ],
  },
  transformation: {
    headline: "从原始信号到管理层清晰度。",
    subtitle: "EngPulse 将 GitHub 噪音转化为领导力信号 — 每周自动完成。",
    rawTitle: "GitHub 原始信号",
    insightTitle: "领导力洞察",
    rawItems: [
      "拉取请求",
      "问题和错误",
      "提交和发布",
      "审查延迟",
      "阻塞工作",
      "错误标签",
    ],
    insightItems: [
      "发布了什么",
      "什么拖慢了团队",
      "什么需要关注",
      "管理层应该问什么",
      "董事会级摘要",
      "交付信心",
    ],
    arrowLabel: "EngPulse 翻译",
  },
  boardAnswers: {
    headline: "管理层真正需要的答案。",
    subtitle:
      "停止在周五下午花时间撰写工程更新。EngPulse 回答管理层真正提出的问题。",
    cards: [
      {
        q: "我们的速度够快吗？",
        a: "是的，但审查延迟开始影响工作势头。",
        status: "green" as const,
      },
      {
        q: "是什么拖慢了团队？",
        a: "api-service 中的拉取请求等待审查时间过长。",
        status: "yellow" as const,
      },
      {
        q: "错误在增加吗？",
        a: "错误压力稳定，但 mobile-app 有三个高优先级问题。",
        status: "yellow" as const,
      },
      {
        q: "哪个领域需要关注？",
        a: "api-service 本周需要更清晰的审查所有权。",
        status: "yellow" as const,
      },
      {
        q: "发布了什么？",
        a: "团队在三个代码库中发布了 12 项重要更新。",
        status: "green" as const,
      },
      {
        q: "管理层下一步应该问什么？",
        a: "询问谁负责审查覆盖，以及移动端错误是否影响下次发布。",
        status: "green" as const,
      },
    ],
    cta: "查看完整仪表板",
  },
  howItWorks: {
    headline: "3 步即可运行",
    subtitle: "无需复杂设置。无需工程支持。",
    steps: [
      {
        title: "连接 GitHub",
        description:
          "授权对您的 GitHub 组织的只读访问权限。EngPulse 绝不修改您的代码。",
      },
      {
        title: "选择代码库",
        description:
          "选择要监控的代码库。从一个开始或跟踪整个组织。",
      },
      {
        title: "获取周报",
        description:
          "每周一，收到一份简明的工程报告，可与您的 CEO 或董事会分享。",
      },
    ],
    note: "当前 MVP 使用 GitHub。更多集成即将推出。",
    available: "现已可用",
    inBeta: "测试中",
  },
  integrations: {
    headline: "从 GitHub 开始，更多即将推出。",
    subtitle: "EngPulse 正在构建完整的工程智能平台。",
    live: "可用",
    soon: "即将推出",
    items: [
      {
        name: "GitHub",
        status: "live" as const,
        description: "拉取请求、问题、提交",
      },
      {
        name: "Slack",
        status: "soon" as const,
        description: "团队通知和更新",
      },
      {
        name: "Jira",
        status: "soon" as const,
        description: "问题跟踪和冲刺",
      },
      {
        name: "Linear",
        status: "soon" as const,
        description: "项目和问题管理",
      },
      {
        name: "Notion",
        status: "soon" as const,
        description: "文档和知识库",
      },
      {
        name: "GitLab",
        status: "soon" as const,
        description: "CI/CD 和代码库数据",
      },
      {
        name: "Bitbucket",
        status: "soon" as const,
        description: "代码托管和流水线",
      },
      {
        name: "Azure DevOps",
        status: "soon" as const,
        description: "看板、代码库和流水线",
      },
    ],
  },
  securityPreview: {
    sectionLabel: "安全",
    headline: "默认只读设计。",
    subtitle:
      "EngPulse 分析代码库活动。它绝不修改您的代码、打开 PR、写入问题或访问密钥。",
    points: [
      "读取代码库元数据和活动",
      "读取拉取请求和问题",
      "读取提交和发布",
      "绝不修改代码或打开 PR",
      "绝不访问密钥或凭据",
      "随时一键断开连接",
    ],
    cta: "阅读完整安全详情",
    tagline: "EngPulse 衡量交付流程，而非开发者个人表现。",
  },
  pricing: {
    headline: "简单透明的定价",
    subtitle: "测试期间免费使用。团队成长时升级。",
    perMonth: "/月",
    urgency: "测试名额有限 — 前 100 位用户享受早期用户定价。",
    enterprise: "需要更多代码库或自定义配置？",
    contactUs: "联系我们",
    plans: [
      {
        name: "免费测试版",
        price: "€0",
        description: "用于早期验证和演示访问。",
        features: [
          "演示仪表板访问",
          "上线后 1 个代码库",
          "手动报告预览",
          "测试版反馈访问",
        ],
        cta: "加入测试版",
        highlight: false,
        badge: "当前",
      },
      {
        name: "入门版",
        price: "€49",
        description: "适合小型工程团队。",
        features: [
          "最多 10 个代码库",
          "每周领导力报告",
          "代码库健康仪表板",
          "可分享报告链接",
          "邮件报告发送",
          "GitHub 集成",
        ],
        cta: "加入测试版",
        highlight: true,
        badge: "最受欢迎",
      },
      {
        name: "团队版",
        price: "€149",
        description: "适合成长中的工程组织。",
        features: [
          "最多 50 个代码库",
          "多个报告接收者",
          "多个团队",
          "高级代码库健康分析",
          "可用时支持 Slack/Jira/Linear",
          "自定义报告语气",
        ],
        cta: "加入测试版",
        highlight: false,
        badge: null,
      },
    ],
    faq: {
      headline: "常见问题",
      items: [
        {
          q: "现在已连接到 GitHub 了吗？",
          a: "EngPulse 目前处于测试阶段，使用模拟数据的演示仪表板。GitHub 集成是第一个上线的连接，正在验证中。",
        },
        {
          q: "EngPulse 会修改代码吗？",
          a: "绝不会。EngPulse 使用 GitHub 的只读访问权限。它无法写入、推送、打开 PR 或修改您代码库中的任何内容。",
        },
        {
          q: "这是用于跟踪个别开发者的吗？",
          a: "不是。EngPulse 在团队层面衡量交付流程，而非个人表现。",
        },
        {
          q: "我可以在私有代码库中使用它吗？",
          a: "可以。EngPulse 将通过适当的 OAuth 范围支持私有代码库。",
        },
        {
          q: "Slack/Jira/Linear 集成什么时候推出？",
          a: "我们首先构建 GitHub 集成。其他集成将根据测试用户反馈跟进。",
        },
        {
          q: "我可以随时取消吗？",
          a: "可以。无需长期承诺。随时从设置页面取消。",
        },
      ],
    },
  },
  security: {
    hero: {
      headline: "默认只读设计。",
      subtitle:
        "EngPulse 从一开始就以信任和隐私为核心构建。我们分析您的工程活动以提供领导力洞察 — 仅此而已。",
    },
    sections: {
      whatWeNever: {
        title: "EngPulse 绝不做的事",
        items: [
          "修改、推送或删除代码",
          "打开拉取请求或问题",
          "访问密钥、令牌或凭据",
          "存储原始代码或文件内容",
          "跟踪开发者个人表现",
          "出售或分享您的数据",
        ],
      },
      whatWeRead: {
        title: "EngPulse 读取什么",
        items: [
          "代码库元数据（名称、描述、活动）",
          "拉取请求标题、状态和审查时间线",
          "问题标题、标签和开放/关闭状态",
          "提交数量和发布活动",
          "团队级别的贡献者模式",
        ],
      },
      permissions: {
        title: "GitHub 权限说明",
        subtitle:
          "EngPulse 仅请求读取代码库活动所需的最小 GitHub OAuth 范围。",
        items: [
          {
            scope: "contents: read",
            description:
              "对代码库元数据、提交历史和发布信息的只读访问权限。",
          },
          {
            scope: "pull_requests: read",
            description:
              "对 PR 标题、状态和审查时间线的只读访问权限。",
          },
          {
            scope: "issues: read",
            description:
              "对问题标题、标签和开放/关闭状态的只读访问权限。",
          },
          {
            scope: "read:org",
            description:
              "读取组织成员资格和代码库列表。",
          },
        ],
      },
      privacy: {
        title: "数据隐私",
        text: "EngPulse 处理 GitHub 活动数据以生成领导力洞察。我们不存储原始代码、提交差异或文件内容。",
      },
      surveillance: {
        title: "不是员工监控",
        text: "EngPulse 衡量交付流程，而非开发者个人表现。它旨在帮助工程领导者了解团队健康状况并消除阻碍 — 而非排名或评估个别工程师。",
        quote: "您的工程数据应该创造清晰度，而不是恐惧。",
      },
      disconnect: {
        title: "随时断开连接",
        text: "您可以随时从设置页面断开 GitHub 连接并从 EngPulse 工作区删除所有关联数据。",
      },
    },
  },
  beta: {
    headline: "获取 EngPulse 的早期访问权限。",
    subtitle:
      "加入希望获得更清晰报告而无需手动工作的工程领导者。测试访问名额有限。",
    form: {
      name: "全名",
      email: "工作邮箱",
      company: "公司名称",
      role: "您的职位",
      teamSize: "工程团队规模",
      repos: "有多少个 GitHub 代码库？",
      currentMethod: "您目前如何报告工程活动？",
      pain: "您最大的报告痛点是什么？",
      submit: "申请测试访问",
      success: "感谢您 — 您的测试版申请已保存。我们将尽快与您联系。",
      roles: [
        "创始人 / CEO",
        "CTO",
        "VP Engineering",
        "工程经理",
        "产品负责人",
        "其他",
      ],
      teamSizes: ["1–5", "6–15", "16–30", "31–50", "50+"],
    },
    trust: [
      "GitHub 只读访问",
      "无需信用卡",
      "欢迎测试版反馈",
    ],
  },
  onboarding: {
    steps: ["您的角色", "连接 GitHub", "选择代码库", "报告设置", "预览"],
    step1: {
      headline: "哪个角色最能描述您？",
      subtitle: "这有助于我们自定义您的报告重点。",
      options: [
        "创始人 / CEO",
        "CTO",
        "VP Engineering",
        "工程经理",
        "产品负责人",
        "其他",
      ],
    },
    step2: {
      headline: "连接您的 GitHub 组织。",
      subtitle: "EngPulse 使用只读访问权限。我们绝不修改您的代码。",
      connectBtn: "连接 GitHub",
      simulated: "为演示目的模拟 GitHub 连接。",
      permissions: [
        "读取代码库元数据",
        "读取拉取请求和问题",
        "读取提交和发布",
        "绝不修改代码",
        "绝不访问密钥",
        "随时断开连接",
      ],
    },
    step3: {
      headline: "选择要监控的代码库。",
      subtitle: "选择要包含在周报中的代码库。",
    },
    step4: {
      headline: "配置您的报告。",
      subtitle: "设置谁接收报告以及报告的撰写方式。",
      emailLabel: "报告接收者（邮箱）",
      dayLabel: "报告日期",
      toneLabel: "报告语气",
      tones: [
        "执行摘要",
        "创始人友好型",
        "技术领导力",
        "董事会级别",
      ],
    },
    step5: {
      headline: "您的报告已准备好。",
      subtitle: "这是您每周工程领导力报告的预览。",
      openDashboard: "打开仪表板",
    },
    next: "继续",
    back: "返回",
  },
  cta: {
    headline: "停止手动翻译 GitHub。",
    subtitle: "在下次领导层会议之前，清晰地展示您的工程故事。",
    primary: "查看演示",
    secondary: "加入测试版",
  },
  footer: {
    tagline: "为非技术领导者提供工程清晰度。",
    product: "产品",
    integrations: "集成",
    legal: "法律",
    betaBadge: "公开测试",
    copyright: "© 2026 EngPulse. 保留所有权利。",
    built: "为重视清晰度的工程领导者构建。",
    links: {
      demo: "演示",
      pricing: "定价",
      security: "安全",
      beta: "测试版",
      privacy: "隐私政策",
      terms: "服务条款",
    },
  },
  dashboard: {
    overview: "概览",
    weekOf: "周",
    ceoView: "CEO 视图",
    engineeringView: "工程视图",
    ceoSummary: "CEO 摘要",
    engSummary: "工程摘要",
    healthScore: "工程健康评分",
    howCalculated: "如何计算",
    scoreExplanation:
      "此评分综合发布活动、审查流程、错误压力、阻塞工作和代码库活动。",
    scoreCategories: [
      { label: "健康", range: "85–100" },
      { label: "关注", range: "70–84" },
      { label: "风险", range: "50–69" },
      { label: "危急", range: "0–49" },
    ],
    viewAll: "查看全部",
    activeBlockers: "活跃阻塞",
    blockersSubtitle: "需要领导层关注的问题",
    boardAnswers: "董事会级答案",
    fullReport: "完整报告",
    repositories: "代码库",
    trends: "趋势",
    settings: "设置",
    weeklyReport: "周报",
    blockers: "阻塞",
    updatedAgo: "2小时前更新",
    refresh: "刷新",
    demoBanner: "实时演示 — 此仪表板使用 Acme Cloud 的逼真模拟数据。",
    connectGitHub: "连接您的 GitHub",
    connectBtn: "加入测试版",
    kpiExplanations: {
      shippingSpeed: "团队完成并发布工作的一致性。",
      reviewBottlenecks: "工作等待审查或批准时间过长的地方。",
      bugRisk: "与错误相关的工作是否比功能交付增长更快。",
      deliveryConfidence: "团队下周维持当前交付节奏的可能性。",
    },
  },
  report: {
    title: "每周工程领导力报告",
    subtitle: "Acme Cloud",
    sections: {
      execSummary: "执行摘要",
      healthScore: "工程健康评分",
      whatShipped: "发布内容",
      whatSlowed: "减速原因",
      risks: "当前风险",
      questions: "领导层问题",
      repoHealth: "代码库健康",
      actions: "建议行动",
    },
    actions: {
      copyLink: "复制分享链接",
      exportPdf: "导出 PDF",
      sendEmail: "通过邮件发送",
      copied: "已复制！",
    },
    disclaimer:
      "本报告由 GitHub 活动数据生成，供领导层审阅。",
  },
};
