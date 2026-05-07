import type { Dictionary } from "./en";

export const es: Dictionary = {
  nav: {
    product: "Producto",
    demo: "Demo",
    pricing: "Precios",
    security: "Seguridad",
    joinBeta: "Únete a la beta",
    viewDemo: "Ver demo",
  },
  languages: {
    en: "English",
    it: "Italiano",
    es: "Español",
    zh: "中文",
  },
  hero: {
    badge: "Inteligencia de ingeniería basada en GitHub",
    headlinePre: "Convierte la actividad de GitHub en un informe de ingeniería ",
    headlineAccent: "listo para la junta",
    headlinePost: ".",
    subtitle:
      "EngPulse traduce pull requests, issues, bloqueos y actividad de lanzamiento en informes semanales en lenguaje sencillo que CTOs, fundadores y CEOs pueden entender en 30 segundos.",
    ctaPrimary: "Ver demo en vivo",
    ctaSecondary: "Únete a la beta",
    trust:
      "MVP de GitHub disponible ahora. Slack, Jira, Linear, Notion, GitLab, Bitbucket y Azure DevOps próximamente.",
    trustBadges: {
      readOnly: "Acceso de solo lectura a GitHub",
      noCard: "No se requiere tarjeta de crédito",
      setup: "Configuración en menos de 5 minutos",
    },
    dashboardLabels: {
      healthScore: "Puntuación de salud",
      status: "Observar",
      ceoSummary: "Resumen para el CEO",
      shipped: "Enviado esta semana",
      shippedSub: "+18% vs semana anterior",
      prsWaiting: "PRs en espera",
      prsSub: "Requieren atención",
      confidence: "Confianza en entrega",
      confidenceSub: "Ligeramente a la baja",
      summaryText:
        "La ingeniería está mayormente saludable esta semana. El equipo envió 12 actualizaciones importantes, pero los retrasos en revisiones en api-service pueden ralentizar la próxima semana.",
    },
  },
  socialProof: {
    intro: "Creado para",
    roles: ["CTO", "VP de Ingeniería", "Fundador Técnico", "CEO"],
    tagline: "Deja de escribir actualizaciones de ingeniería del viernes a mano.",
  },
  pain: {
    headline: "Los equipos de ingeniería están ocupados.",
    headlineAccent: "El liderazgo todavía no tiene una historia clara.",
    subtitle:
      "La mayoría de las herramientas de ingeniería están construidas para ingenieros. Los paneles están llenos de jerga, métricas brutas y gráficos que no responden las preguntas del liderazgo.",
    detail:
      "Cada viernes, los líderes de ingeniería transforman la actividad bruta de GitHub en actualizaciones de estado, diapositivas y notas de reuniones. EngPulse hace esa traducción automáticamente.",
    cards: [
      {
        title: "Demasiado técnico para el liderazgo",
        text: "GitHub es demasiado técnico para que los gerentes no técnicos lo lean directamente.",
      },
      {
        title: "Actualizaciones semanales manuales",
        text: "Las actualizaciones de ingeniería semanales todavía se escriben manualmente cada viernes.",
      },
      {
        title: "Descubrimiento tardío de bloqueos",
        text: "Los cuellos de botella en PRs y bloqueos se descubren demasiado tarde para actuar.",
      },
      {
        title: "Horas en actualizaciones de junta",
        text: "Los informes de la junta y resúmenes para el CEO requieren horas cada semana.",
      },
      {
        title: "Métricas sin significado",
        text: "Las métricas brutas no explican el riesgo empresarial ni la confianza en la entrega.",
      },
      {
        title: "Sin respuestas en lenguaje claro",
        text: "Los CEOs hacen preguntas simples, pero las herramientas responden con jerga técnica.",
      },
    ],
  },
  transformation: {
    headline: "De señales brutas a claridad ejecutiva.",
    subtitle:
      "EngPulse transforma el ruido de GitHub en señal para el liderazgo — automáticamente, cada semana.",
    rawTitle: "Señales brutas de GitHub",
    insightTitle: "Insights para el liderazgo",
    rawItems: [
      "Pull requests",
      "Issues y bugs",
      "Commits y releases",
      "Retrasos en revisiones",
      "Trabajo bloqueado",
      "Etiquetas de bugs",
    ],
    insightItems: [
      "Qué se envió",
      "Qué ralentizó al equipo",
      "Qué necesita atención",
      "Qué debería preguntar el liderazgo",
      "Resumen listo para la junta",
      "Confianza en la entrega",
    ],
    arrowLabel: "EngPulse traduce",
  },
  boardAnswers: {
    headline: "Las respuestas que el liderazgo realmente necesita.",
    subtitle:
      "Deja de pasar el viernes por la tarde escribiendo actualizaciones de ingeniería. EngPulse responde las preguntas que el liderazgo realmente hace.",
    cards: [
      {
        q: "¿Estamos avanzando lo suficientemente rápido?",
        a: "Sí, pero los retrasos en revisiones están comenzando a reducir el impulso.",
        status: "green" as const,
      },
      {
        q: "¿Qué ralentizó al equipo?",
        a: "Los pull requests en api-service esperaron demasiado tiempo para revisión.",
        status: "yellow" as const,
      },
      {
        q: "¿Están aumentando los bugs?",
        a: "La presión de bugs es estable, pero mobile-app tiene tres issues de alta prioridad.",
        status: "yellow" as const,
      },
      {
        q: "¿Qué área necesita atención?",
        a: "api-service necesita una ownership más clara de revisiones esta semana.",
        status: "yellow" as const,
      },
      {
        q: "¿Qué se envió?",
        a: "El equipo envió 12 actualizaciones importantes en tres repositorios.",
        status: "green" as const,
      },
      {
        q: "¿Qué debería preguntar el liderazgo?",
        a: "Preguntar quién gestiona la cobertura de revisiones y si los bugs móviles afectan el próximo lanzamiento.",
        status: "green" as const,
      },
    ],
    cta: "Ver el panel completo",
  },
  howItWorks: {
    headline: "Funcionando en 3 pasos",
    subtitle: "Sin configuración compleja. Sin necesidad de soporte técnico.",
    steps: [
      {
        title: "Conecta GitHub",
        description:
          "Autoriza acceso de solo lectura a tu organización de GitHub. EngPulse nunca modifica tu código.",
      },
      {
        title: "Selecciona repositorios",
        description:
          "Elige qué repositorios monitorear. Empieza con uno o rastrea toda tu organización.",
      },
      {
        title: "Recibe tu informe semanal",
        description:
          "Cada lunes, recibe un informe de ingeniería en lenguaje sencillo que puedes compartir con tu CEO o junta.",
      },
    ],
    note: "El MVP actual usa GitHub. Más integraciones están en camino.",
    available: "Disponible ahora",
    inBeta: "En beta",
  },
  integrations: {
    headline: "Empieza con GitHub. Más próximamente.",
    subtitle:
      "EngPulse está construyendo la plataforma completa de inteligencia de ingeniería.",
    live: "Disponible",
    soon: "Próximo",
    items: [
      {
        name: "GitHub",
        status: "live" as const,
        description: "Pull requests, issues, commits",
      },
      {
        name: "Slack",
        status: "soon" as const,
        description: "Notificaciones y actualizaciones del equipo",
      },
      {
        name: "Jira",
        status: "soon" as const,
        description: "Seguimiento de issues y sprints",
      },
      {
        name: "Linear",
        status: "soon" as const,
        description: "Gestión de proyectos e issues",
      },
      {
        name: "Notion",
        status: "soon" as const,
        description: "Documentación y wikis",
      },
      {
        name: "GitLab",
        status: "soon" as const,
        description: "CI/CD y datos de repositorio",
      },
      {
        name: "Bitbucket",
        status: "soon" as const,
        description: "Alojamiento de código y pipelines",
      },
      {
        name: "Azure DevOps",
        status: "soon" as const,
        description: "Boards, repos y pipelines",
      },
    ],
  },
  securityPreview: {
    sectionLabel: "Seguridad",
    headline: "Diseñado con acceso de solo lectura.",
    subtitle:
      "EngPulse analiza la actividad del repositorio. Nunca modifica tu código, abre PRs, escribe issues ni accede a secretos.",
    points: [
      "Lee metadatos y actividad del repositorio",
      "Lee pull requests e issues",
      "Lee commits y releases",
      "Nunca modifica código ni abre PRs",
      "Nunca accede a secretos o credenciales",
      "Desconecta en cualquier momento con un clic",
    ],
    cta: "Leer detalles de seguridad completos",
    tagline:
      "EngPulse mide el flujo de entrega, no el rendimiento individual de los desarrolladores.",
  },
  pricing: {
    headline: "Precios simples y transparentes",
    subtitle: "Empieza gratis durante la beta. Actualiza cuando tu equipo crezca.",
    perMonth: "/mes",
    urgency: "Plazas beta limitadas — los primeros 100 usuarios reciben precios early adopter.",
    enterprise: "¿Necesitas más repositorios o una configuración personalizada?",
    contactUs: "Contáctanos",
    plans: [
      {
        name: "Beta Gratuita",
        price: "€0",
        description: "Para validación inicial y acceso a la demo.",
        features: [
          "Acceso al panel de demostración",
          "1 repositorio cuando esté disponible",
          "Vista previa de informe manual",
          "Acceso a feedback beta",
        ],
        cta: "Únete a la beta",
        highlight: false,
        badge: "Actual",
      },
      {
        name: "Starter",
        price: "€49",
        description: "Para equipos de ingeniería pequeños.",
        features: [
          "Hasta 10 repositorios",
          "Informe semanal de liderazgo",
          "Panel de salud de repositorios",
          "Enlace de informe compartible",
          "Informe por email",
          "Integración con GitHub",
        ],
        cta: "Únete a la beta",
        highlight: true,
        badge: "Más popular",
      },
      {
        name: "Team",
        price: "€149",
        description: "Para organizaciones de ingeniería en crecimiento.",
        features: [
          "Hasta 50 repositorios",
          "Múltiples destinatarios del informe",
          "Múltiples equipos",
          "Salud avanzada de repositorios",
          "Slack/Jira/Linear cuando estén disponibles",
          "Tono de informe personalizado",
        ],
        cta: "Únete a la beta",
        highlight: false,
        badge: null,
      },
    ],
    faq: {
      headline: "Preguntas frecuentes",
      items: [
        {
          q: "¿Está conectado a GitHub hoy?",
          a: "EngPulse está actualmente en beta con un panel de demostración que usa datos simulados. La integración de GitHub es la primera conexión en vivo y está siendo validada.",
        },
        {
          q: "¿EngPulse modifica el código?",
          a: "Nunca. EngPulse usa acceso de solo lectura a GitHub. No puede escribir, hacer push, abrir PRs ni modificar nada en tus repositorios.",
        },
        {
          q: "¿Es para rastrear desarrolladores individuales?",
          a: "No. EngPulse mide el flujo de entrega a nivel de equipo, no el rendimiento individual.",
        },
        {
          q: "¿Puedo usarlo con repositorios privados?",
          a: "Sí. EngPulse soportará repositorios privados con los alcances de OAuth apropiados.",
        },
        {
          q: "¿Cuándo llegarán las integraciones de Slack/Jira/Linear?",
          a: "Estamos construyendo primero la integración de GitHub. Las demás integraciones seguirán según el feedback de los usuarios beta.",
        },
        {
          q: "¿Puedo cancelar en cualquier momento?",
          a: "Sí. Sin compromiso a largo plazo. Cancela desde tu página de configuración en cualquier momento.",
        },
      ],
    },
  },
  security: {
    hero: {
      headline: "Diseñado con acceso de solo lectura.",
      subtitle:
        "EngPulse fue construido desde el principio con la confianza y la privacidad en mente. Analizamos tu actividad de ingeniería para generar insights de liderazgo — y nada más.",
    },
    sections: {
      whatWeNever: {
        title: "Lo que EngPulse nunca hace",
        items: [
          "Modificar, hacer push o eliminar código",
          "Abrir pull requests o issues",
          "Acceder a secretos, claves o credenciales",
          "Almacenar código bruto o contenidos de archivos",
          "Rastrear el rendimiento individual de los desarrolladores",
          "Vender o compartir tus datos",
        ],
      },
      whatWeRead: {
        title: "Qué lee EngPulse",
        items: [
          "Metadatos del repositorio (nombres, descripciones, actividad)",
          "Títulos de pull requests, estado y plazos de revisión",
          "Títulos de issues, etiquetas y estado abierto/cerrado",
          "Conteos de commits y actividad de releases",
          "Patrones de contribuidores a nivel de equipo",
        ],
      },
      permissions: {
        title: "Permisos de GitHub explicados",
        subtitle:
          "EngPulse solicita solo los alcances mínimos de OAuth de GitHub necesarios para leer la actividad del repositorio.",
        items: [
          {
            scope: "contents: read",
            description:
              "Acceso de solo lectura a metadatos del repositorio, historial de commits e información de releases.",
          },
          {
            scope: "pull_requests: read",
            description:
              "Acceso de solo lectura a títulos de PRs, estado y plazos de revisión.",
          },
          {
            scope: "issues: read",
            description:
              "Acceso de solo lectura a títulos de issues, etiquetas y estado abierto/cerrado.",
          },
          {
            scope: "read:org",
            description:
              "Lectura de la membresía de la organización y la lista de repositorios.",
          },
        ],
      },
      privacy: {
        title: "Privacidad de datos",
        text: "EngPulse procesa datos de actividad de GitHub para generar insights de liderazgo. No almacenamos código bruto, diffs de commits ni contenidos de archivos.",
      },
      surveillance: {
        title: "No es vigilancia de empleados",
        text: "EngPulse mide el flujo de entrega, no el rendimiento individual de los desarrolladores. Está diseñado para ayudar a los líderes de ingeniería a entender la salud del equipo y eliminar bloqueos.",
        quote:
          "Tus datos de ingeniería deben crear claridad, no miedo.",
      },
      disconnect: {
        title: "Desconecta en cualquier momento",
        text: "Puedes desconectar GitHub y eliminar todos los datos asociados de tu espacio de trabajo de EngPulse en cualquier momento desde la página de configuración.",
      },
    },
  },
  beta: {
    headline: "Obtén acceso anticipado a EngPulse.",
    subtitle:
      "Únete a líderes de ingeniería que quieren informes más claros sin el trabajo manual. El acceso beta es limitado.",
    form: {
      name: "Nombre completo",
      email: "Correo de trabajo",
      company: "Nombre de la empresa",
      role: "Tu rol",
      teamSize: "Tamaño del equipo de ingeniería",
      repos: "¿Cuántos repositorios de GitHub tienes?",
      currentMethod: "¿Cómo informas actualmente la actividad de ingeniería?",
      pain: "¿Cuál es tu mayor problema de reporte?",
      submit: "Solicitar acceso beta",
      success:
        "Gracias — tu solicitud beta ha sido guardada. Nos pondremos en contacto pronto.",
      roles: [
        "Founder / CEO",
        "CTO",
        "VP Engineering",
        "Engineering Manager",
        "Product Leader",
        "Otro",
      ],
      teamSizes: ["1–5", "6–15", "16–30", "31–50", "50+"],
    },
    trust: [
      "Acceso de solo lectura a GitHub",
      "No se requiere tarjeta de crédito",
      "Feedback beta bienvenido",
    ],
  },
  onboarding: {
    steps: ["Tu rol", "Conectar GitHub", "Seleccionar repos", "Configuración", "Vista previa"],
    step1: {
      headline: "¿Qué rol te describe mejor?",
      subtitle: "Esto nos ayuda a personalizar el enfoque de tu informe.",
      options: [
        "Founder / CEO",
        "CTO",
        "VP Engineering",
        "Engineering Manager",
        "Product Leader",
        "Otro",
      ],
    },
    step2: {
      headline: "Conecta tu organización de GitHub.",
      subtitle: "EngPulse usa acceso de solo lectura. Nunca modificamos tu código.",
      connectBtn: "Conectar GitHub",
      simulated: "Conexión de GitHub simulada para demostración.",
      permissions: [
        "Lee metadatos del repositorio",
        "Lee pull requests e issues",
        "Lee commits y releases",
        "Nunca modifica el código",
        "Nunca accede a secretos",
        "Desconecta en cualquier momento",
      ],
    },
    step3: {
      headline: "Selecciona repositorios para monitorear.",
      subtitle: "Elige qué repositorios incluir en tu informe semanal.",
    },
    step4: {
      headline: "Configura tu informe.",
      subtitle: "Establece quién recibe el informe y cómo debe estar escrito.",
      emailLabel: "Destinatarios del informe (email)",
      dayLabel: "Día del informe",
      toneLabel: "Tono del informe",
      tones: [
        "Resumen ejecutivo",
        "Amigable para fundadores",
        "Liderazgo técnico",
        "Listo para la junta",
      ],
    },
    step5: {
      headline: "Tu informe está listo.",
      subtitle: "Aquí hay una vista previa de tu informe semanal de liderazgo de ingeniería.",
      openDashboard: "Abrir panel",
    },
    next: "Continuar",
    back: "Atrás",
  },
  cta: {
    headline: "Deja de traducir GitHub manualmente.",
    subtitle:
      "Muestra la historia de ingeniería de tu equipo claramente antes de la próxima reunión de liderazgo.",
    primary: "Ver demo",
    secondary: "Únete a la beta",
  },
  footer: {
    tagline: "Claridad de ingeniería para líderes no técnicos.",
    product: "Producto",
    integrations: "Integraciones",
    legal: "Legal",
    betaBadge: "Beta pública",
    copyright: "© 2026 EngPulse. Todos los derechos reservados.",
    built: "Construido para líderes de ingeniería que valoran la claridad.",
    links: {
      demo: "Demo",
      pricing: "Precios",
      security: "Seguridad",
      beta: "Beta",
      privacy: "Privacidad",
      terms: "Términos",
    },
  },
  dashboard: {
    overview: "Resumen",
    weekOf: "Semana del",
    ceoView: "Vista CEO",
    engineeringView: "Vista Ingeniería",
    ceoSummary: "Resumen CEO",
    engSummary: "Resumen Ingeniería",
    healthScore: "Puntuación de Salud de Ingeniería",
    howCalculated: "Cómo se calcula",
    scoreExplanation:
      "Esta puntuación combina actividad de envío, flujo de revisión, presión de bugs, trabajo bloqueado y actividad del repositorio.",
    scoreCategories: [
      { label: "Saludable", range: "85–100" },
      { label: "Observar", range: "70–84" },
      { label: "En riesgo", range: "50–69" },
      { label: "Crítico", range: "0–49" },
    ],
    viewAll: "Ver todos",
    activeBlockers: "Bloqueos activos",
    blockersSubtitle: "Problemas que requieren atención del liderazgo",
    boardAnswers: "Respuestas listas para la junta",
    fullReport: "Informe completo",
    repositories: "Repositorios",
    trends: "Tendencias",
    settings: "Configuración",
    weeklyReport: "Informe Semanal",
    blockers: "Bloqueos",
    updatedAgo: "Actualizado hace 2h",
    refresh: "Actualizar",
    demoBanner:
      "Demo en vivo — Este panel usa datos simulados realistas para Acme Cloud.",
    connectGitHub: "Conecta tu GitHub",
    connectBtn: "Únete a la beta",
    kpiExplanations: {
      shippingSpeed:
        "Con qué consistencia el equipo está completando y lanzando el trabajo.",
      reviewBottlenecks:
        "Dónde el trabajo espera demasiado tiempo para revisión o aprobación.",
      bugRisk:
        "Si el trabajo relacionado con bugs está creciendo más rápido que la entrega de funcionalidades.",
      deliveryConfidence:
        "Qué tan probable es que el equipo mantenga el ritmo de entrega actual la próxima semana.",
    },
  },
  report: {
    title: "Informe Semanal de Liderazgo de Ingeniería",
    subtitle: "Acme Cloud",
    sections: {
      execSummary: "Resumen Ejecutivo",
      healthScore: "Puntuación de Salud de Ingeniería",
      whatShipped: "Qué Se Envió",
      whatSlowed: "Qué Ralentizó",
      risks: "Riesgos Actuales",
      questions: "Preguntas de Liderazgo",
      repoHealth: "Salud de Repositorios",
      actions: "Acciones Recomendadas",
    },
    actions: {
      copyLink: "Copiar enlace de compartir",
      exportPdf: "Exportar PDF",
      sendEmail: "Enviar por email",
      copied: "¡Copiado!",
    },
    disclaimer:
      "Este informe se genera a partir de datos de actividad de GitHub y está destinado a la revisión del liderazgo.",
  },
};
