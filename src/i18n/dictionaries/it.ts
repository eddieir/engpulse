import type { Dictionary } from "./en";

export const it: Dictionary = {
  nav: {
    product: "Prodotto",
    demo: "Demo",
    pricing: "Prezzi",
    security: "Sicurezza",
    joinBeta: "Partecipa alla beta",
    viewDemo: "Guarda la demo",
  },
  languages: {
    en: "English",
    it: "Italiano",
    es: "Español",
    zh: "中文",
  },
  hero: {
    badge: "Intelligence ingegneristica basata su GitHub",
    headlinePre: "Trasforma l'attività di GitHub in un report tecnico ",
    headlineAccent: "pronto per il board",
    headlinePost: ".",
    subtitle:
      "EngPulse traduce pull request, issue, blocchi e attività di rilascio in report settimanali in linguaggio semplice che CTO, founder e CEO possono capire in 30 secondi.",
    ctaPrimary: "Guarda la demo live",
    ctaSecondary: "Partecipa alla beta",
    trust:
      "MVP GitHub ora disponibile. Slack, Jira, Linear, Notion, GitLab, Bitbucket e Azure DevOps in arrivo.",
    trustBadges: {
      readOnly: "Accesso GitHub in sola lettura",
      noCard: "Nessuna carta di credito richiesta",
      setup: "Configurazione in meno di 5 minuti",
    },
    dashboardLabels: {
      healthScore: "Punteggio salute",
      status: "Attenzione",
      ceoSummary: "Riepilogo CEO",
      shipped: "Rilasciato questa settimana",
      shippedSub: "+18% rispetto alla settimana scorsa",
      prsWaiting: "PR in attesa",
      prsSub: "Richiedono attenzione",
      confidence: "Fiducia nella consegna",
      confidenceSub: "Leggermente in calo",
      summaryText:
        "L'ingegneria è per lo più sana questa settimana. Il team ha rilasciato 12 aggiornamenti significativi, ma i ritardi nelle revisioni in api-service potrebbero rallentare la settimana prossima.",
    },
  },
  socialProof: {
    intro: "Creato per",
    roles: ["CTO", "VP Engineering", "Fondatore Tecnico", "CEO"],
    tagline: "Smetti di scrivere aggiornamenti ingegneristici del venerdì a mano.",
  },
  pain: {
    headline: "I team di ingegneria sono impegnati.",
    headlineAccent: "La leadership non ha ancora un quadro chiaro.",
    subtitle:
      "La maggior parte degli strumenti di ingegneria è costruita per gli ingegneri. Le dashboard sono piene di gergo, metriche grezze e grafici che non rispondono alle domande della leadership.",
    detail:
      "Ogni venerdì, i leader dell'ingegneria trasformano l'attività grezza di GitHub in aggiornamenti di stato, slide e note riunioni. EngPulse fa questa traduzione automaticamente.",
    cards: [
      {
        title: "Troppo tecnico per la leadership",
        text: "GitHub è troppo tecnico per i manager non tecnici.",
      },
      {
        title: "Aggiornamenti settimanali manuali",
        text: "Gli aggiornamenti settimanali vengono ancora scritti manualmente ogni venerdì.",
      },
      {
        title: "Scoperta tardiva dei blocchi",
        text: "I blocchi nelle PR vengono scoperti troppo tardi per agire.",
      },
      {
        title: "Ore per gli aggiornamenti del board",
        text: "I report per il board e i riepiloghi per il CEO richiedono ore ogni settimana.",
      },
      {
        title: "Metriche senza significato",
        text: "Le metriche grezze non spiegano il rischio aziendale o la fiducia nelle consegne.",
      },
      {
        title: "Nessuna risposta in linguaggio chiaro",
        text: "I CEO fanno domande semplici, ma gli strumenti rispondono con gergo tecnico.",
      },
    ],
  },
  transformation: {
    headline: "Dai segnali grezzi alla chiarezza esecutiva.",
    subtitle:
      "EngPulse trasforma il rumore di GitHub in segnali per la leadership — automaticamente, ogni settimana.",
    rawTitle: "Segnali grezzi di GitHub",
    insightTitle: "Insight per la leadership",
    rawItems: [
      "Pull request",
      "Issue e bug",
      "Commit e release",
      "Ritardi nelle revisioni",
      "Lavoro bloccato",
      "Label dei bug",
    ],
    insightItems: [
      "Cosa è stato rilasciato",
      "Cosa ha rallentato il team",
      "Cosa richiede attenzione",
      "Cosa dovrebbe chiedere la leadership",
      "Riepilogo pronto per il board",
      "Fiducia nella consegna",
    ],
    arrowLabel: "EngPulse traduce",
  },
  boardAnswers: {
    headline: "Le risposte di cui la leadership ha bisogno.",
    subtitle:
      "Smetti di passare il venerdì pomeriggio a scrivere aggiornamenti sull'ingegneria. EngPulse risponde alle domande che la leadership fa davvero.",
    cards: [
      {
        q: "Stiamo avanzando abbastanza velocemente?",
        a: "Sì, ma i ritardi nelle revisioni stanno iniziando a ridurre lo slancio.",
        status: "green" as const,
      },
      {
        q: "Cosa ha rallentato il team?",
        a: "Le pull request in api-service hanno atteso troppo a lungo per la revisione.",
        status: "yellow" as const,
      },
      {
        q: "I bug stanno aumentando?",
        a: "La pressione dei bug è stabile, ma mobile-app ha tre issue ad alta priorità.",
        status: "yellow" as const,
      },
      {
        q: "Quale area richiede attenzione?",
        a: "api-service ha bisogno di una ownership più chiara delle revisioni questa settimana.",
        status: "yellow" as const,
      },
      {
        q: "Cosa è stato rilasciato?",
        a: "Il team ha rilasciato 12 aggiornamenti significativi in tre repository.",
        status: "green" as const,
      },
      {
        q: "Cosa dovrebbe chiedere la leadership?",
        a: "Chiedere chi gestisce la copertura delle revisioni e se i bug mobili influenzano il prossimo rilascio.",
        status: "green" as const,
      },
    ],
    cta: "Vedi la dashboard completa",
  },
  howItWorks: {
    headline: "Operativo in 3 passaggi",
    subtitle: "Nessuna configurazione complessa. Nessun supporto tecnico necessario.",
    steps: [
      {
        title: "Connetti GitHub",
        description:
          "Autorizza l'accesso in sola lettura alla tua organizzazione GitHub. EngPulse non modifica mai il tuo codice.",
      },
      {
        title: "Seleziona i repository",
        description:
          "Scegli quali repository monitorare. Inizia con uno o monitora l'intera organizzazione.",
      },
      {
        title: "Ricevi il report settimanale",
        description:
          "Ogni lunedì, ricevi un report di ingegneria in linguaggio semplice da condividere con il tuo CEO o board.",
      },
    ],
    note: "L'MVP attuale usa GitHub. Altre integrazioni sono in arrivo.",
    available: "Disponibile ora",
    inBeta: "In beta",
  },
  integrations: {
    headline: "Inizia con GitHub. Altro in arrivo.",
    subtitle:
      "EngPulse sta costruendo la piattaforma completa di intelligence ingegneristica.",
    live: "Disponibile",
    soon: "In arrivo",
    items: [
      {
        name: "GitHub",
        status: "live" as const,
        description: "Pull request, issue, commit",
      },
      {
        name: "Slack",
        status: "soon" as const,
        description: "Notifiche e aggiornamenti del team",
      },
      {
        name: "Jira",
        status: "soon" as const,
        description: "Tracciamento issue e sprint",
      },
      {
        name: "Linear",
        status: "soon" as const,
        description: "Gestione progetti e issue",
      },
      {
        name: "Notion",
        status: "soon" as const,
        description: "Documentazione e wiki",
      },
      {
        name: "GitLab",
        status: "soon" as const,
        description: "CI/CD e dati repository",
      },
      {
        name: "Bitbucket",
        status: "soon" as const,
        description: "Hosting codice e pipeline",
      },
      {
        name: "Azure DevOps",
        status: "soon" as const,
        description: "Board, repo e pipeline",
      },
    ],
  },
  securityPreview: {
    sectionLabel: "Sicurezza",
    headline: "Progettato con accesso in sola lettura.",
    subtitle:
      "EngPulse analizza l'attività del repository. Non modifica mai il tuo codice, non apre PR, non scrive issue e non accede ai segreti.",
    points: [
      "Legge i metadati e l'attività del repository",
      "Legge pull request e issue",
      "Legge commit e release",
      "Non modifica mai il codice né apre PR",
      "Non accede mai a segreti o credenziali",
      "Disconnetti in qualsiasi momento con un clic",
    ],
    cta: "Leggi i dettagli di sicurezza",
    tagline:
      "EngPulse misura il flusso di consegna, non le prestazioni individuali degli sviluppatori.",
  },
  pricing: {
    headline: "Prezzi semplici e trasparenti",
    subtitle: "Inizia gratuitamente durante la beta. Aggiorna quando il team cresce.",
    perMonth: "/mese",
    urgency: "Posti beta limitati — i primi 100 utenti ricevono prezzi early adopter.",
    enterprise: "Hai bisogno di più repository o una configurazione personalizzata?",
    contactUs: "Contattaci",
    plans: [
      {
        name: "Beta Gratuita",
        price: "€0",
        description: "Per la validazione iniziale e l'accesso alla demo.",
        features: [
          "Accesso alla dashboard demo",
          "1 repository quando disponibile",
          "Anteprima del report manuale",
          "Accesso al feedback beta",
        ],
        cta: "Partecipa alla beta",
        highlight: false,
        badge: "Attuale",
      },
      {
        name: "Starter",
        price: "€49",
        description: "Per i team di ingegneria più piccoli.",
        features: [
          "Fino a 10 repository",
          "Report settimanale per la leadership",
          "Dashboard salute repository",
          "Link report condivisibile",
          "Report via email",
          "Integrazione GitHub",
        ],
        cta: "Partecipa alla beta",
        highlight: true,
        badge: "Più popolare",
      },
      {
        name: "Team",
        price: "€149",
        description: "Per le organizzazioni ingegneristiche in crescita.",
        features: [
          "Fino a 50 repository",
          "Più destinatari del report",
          "Più team",
          "Salute avanzata dei repository",
          "Slack/Jira/Linear quando disponibili",
          "Tono del report personalizzato",
        ],
        cta: "Partecipa alla beta",
        highlight: false,
        badge: null,
      },
    ],
    faq: {
      headline: "Domande frequenti",
      items: [
        {
          q: "È connesso a GitHub oggi?",
          a: "EngPulse è attualmente in beta con una dashboard demo che utilizza dati simulati. L'integrazione GitHub è la prima connessione live ed è in fase di validazione.",
        },
        {
          q: "EngPulse modifica il codice?",
          a: "Mai. EngPulse utilizza l'accesso in sola lettura a GitHub. Non può scrivere, fare push, aprire PR o modificare nulla nei tuoi repository.",
        },
        {
          q: "Serve per tracciare i singoli sviluppatori?",
          a: "No. EngPulse misura il flusso di consegna a livello di team, non le prestazioni individuali.",
        },
        {
          q: "Posso usarlo con repository privati?",
          a: "Sì. EngPulse supporterà i repository privati con gli ambiti OAuth appropriati.",
        },
        {
          q: "Quando arriveranno le integrazioni Slack/Jira/Linear?",
          a: "Stiamo costruendo prima l'integrazione GitHub. Le altre integrazioni seguiranno in base al feedback degli utenti beta.",
        },
        {
          q: "Posso cancellare in qualsiasi momento?",
          a: "Sì. Nessun impegno a lungo termine. Cancella dalla pagina delle impostazioni in qualsiasi momento.",
        },
      ],
    },
  },
  security: {
    hero: {
      headline: "Progettato con accesso in sola lettura.",
      subtitle:
        "EngPulse è stato costruito dall'inizio con fiducia e privacy in mente. Analizziamo la tua attività ingegneristica per fornire insight alla leadership — e nient'altro.",
    },
    sections: {
      whatWeNever: {
        title: "Cosa EngPulse non fa mai",
        items: [
          "Modificare, fare push o eliminare codice",
          "Aprire pull request o issue",
          "Accedere a segreti, chiavi o credenziali",
          "Archiviare codice grezzo o contenuti di file",
          "Tracciare le prestazioni dei singoli sviluppatori",
          "Vendere o condividere i tuoi dati",
        ],
      },
      whatWeRead: {
        title: "Cosa legge EngPulse",
        items: [
          "Metadati del repository (nomi, descrizioni, attività)",
          "Titoli delle pull request, stato e tempistiche di revisione",
          "Titoli delle issue, etichette e stato aperto/chiuso",
          "Conteggi dei commit e attività di release",
          "Pattern dei contributori a livello di team",
        ],
      },
      permissions: {
        title: "Permessi GitHub spiegati",
        subtitle:
          "EngPulse richiede solo gli ambiti OAuth GitHub minimi necessari per leggere l'attività del repository.",
        items: [
          {
            scope: "contents: read",
            description:
              "Accesso in sola lettura ai metadati del repository, alla cronologia dei commit e alle informazioni di release.",
          },
          {
            scope: "pull_requests: read",
            description:
              "Accesso in sola lettura ai titoli delle PR, allo stato e alle tempistiche di revisione.",
          },
          {
            scope: "issues: read",
            description:
              "Accesso in sola lettura ai titoli delle issue, alle etichette e allo stato aperto/chiuso.",
          },
          {
            scope: "read:org",
            description:
              "Lettura dell'appartenenza all'organizzazione e dell'elenco dei repository.",
          },
        ],
      },
      privacy: {
        title: "Privacy dei dati",
        text: "EngPulse elabora i dati di attività di GitHub per generare insight per la leadership. Non archiviamo codice grezzo, diff di commit o contenuti di file.",
      },
      surveillance: {
        title: "Non è sorveglianza dei dipendenti",
        text: "EngPulse misura il flusso di consegna, non le prestazioni individuali degli sviluppatori. È progettato per aiutare i leader ingegneristici a comprendere la salute del team e rimuovere i blocchi.",
        quote: "I tuoi dati ingegneristici dovrebbero creare chiarezza, non paura.",
      },
      disconnect: {
        title: "Disconnetti in qualsiasi momento",
        text: "Puoi disconnettere GitHub e rimuovere tutti i dati associati dal tuo workspace EngPulse in qualsiasi momento dalla pagina delle impostazioni.",
      },
    },
  },
  beta: {
    headline: "Ottieni accesso anticipato a EngPulse.",
    subtitle:
      "Unisciti ai leader ingegneristici che vogliono report più chiari senza il lavoro manuale. L'accesso beta è limitato.",
    form: {
      name: "Nome completo",
      email: "Email di lavoro",
      company: "Nome dell'azienda",
      role: "Il tuo ruolo",
      teamSize: "Dimensione del team ingegneristico",
      repos: "Quanti repository GitHub hai?",
      currentMethod: "Come riporti attualmente l'attività ingegneristica?",
      pain: "Qual è il tuo principale problema di reporting?",
      submit: "Richiedi accesso beta",
      success:
        "Grazie — la tua richiesta beta è stata salvata. Ti contatteremo a breve.",
      roles: [
        "Founder / CEO",
        "CTO",
        "VP Engineering",
        "Engineering Manager",
        "Product Leader",
        "Altro",
      ],
      teamSizes: ["1–5", "6–15", "16–30", "31–50", "50+"],
    },
    trust: [
      "Accesso GitHub in sola lettura",
      "Nessuna carta di credito richiesta",
      "Feedback beta benvenuto",
    ],
  },
  onboarding: {
    steps: ["Il tuo ruolo", "Connetti GitHub", "Seleziona repo", "Impostazioni report", "Anteprima"],
    step1: {
      headline: "Quale ruolo ti descrive meglio?",
      subtitle: "Questo ci aiuta a personalizzare il focus del tuo report.",
      options: [
        "Founder / CEO",
        "CTO",
        "VP Engineering",
        "Engineering Manager",
        "Product Leader",
        "Altro",
      ],
    },
    step2: {
      headline: "Connetti la tua organizzazione GitHub.",
      subtitle: "EngPulse utilizza l'accesso in sola lettura. Non modifichiamo mai il tuo codice.",
      connectBtn: "Connetti GitHub",
      simulated: "Connessione GitHub simulata per la demo.",
      permissions: [
        "Legge i metadati del repository",
        "Legge pull request e issue",
        "Legge commit e release",
        "Non modifica mai il codice",
        "Non accede mai ai segreti",
        "Disconnetti in qualsiasi momento",
      ],
    },
    step3: {
      headline: "Seleziona i repository da monitorare.",
      subtitle: "Scegli quali repository includere nel tuo report settimanale.",
    },
    step4: {
      headline: "Configura il tuo report.",
      subtitle: "Imposta chi riceve il report e come deve essere scritto.",
      emailLabel: "Destinatari del report (email)",
      dayLabel: "Giorno del report",
      toneLabel: "Tono del report",
      tones: [
        "Riepilogo esecutivo",
        "Adatto ai founder",
        "Leadership tecnica",
        "Pronto per il board",
      ],
    },
    step5: {
      headline: "Il tuo report è pronto.",
      subtitle: "Ecco un'anteprima del tuo report settimanale di leadership ingegneristica.",
      openDashboard: "Apri la dashboard",
    },
    next: "Continua",
    back: "Indietro",
  },
  cta: {
    headline: "Smetti di tradurre GitHub manualmente.",
    subtitle:
      "Mostra chiaramente la storia ingegneristica del tuo team prima del prossimo meeting con la leadership.",
    primary: "Guarda la demo",
    secondary: "Partecipa alla beta",
  },
  footer: {
    tagline: "Chiarezza ingegneristica per leader non tecnici.",
    product: "Prodotto",
    integrations: "Integrazioni",
    legal: "Legale",
    betaBadge: "Beta pubblica",
    copyright: "© 2026 EngPulse. Tutti i diritti riservati.",
    built: "Creato per i leader ingegneristici che valorizzano la chiarezza.",
    links: {
      demo: "Demo",
      pricing: "Prezzi",
      security: "Sicurezza",
      beta: "Beta",
      privacy: "Privacy",
      terms: "Termini",
    },
  },
  dashboard: {
    overview: "Panoramica",
    weekOf: "Settimana del",
    ceoView: "Vista CEO",
    engineeringView: "Vista Ingegneria",
    ceoSummary: "Riepilogo CEO",
    engSummary: "Riepilogo Ingegneria",
    healthScore: "Punteggio Salute Ingegneristica",
    howCalculated: "Come viene calcolato",
    scoreExplanation:
      "Questo punteggio combina attività di rilascio, flusso di revisione, pressione dei bug, lavoro bloccato e attività del repository.",
    scoreCategories: [
      { label: "Sano", range: "85–100" },
      { label: "Attenzione", range: "70–84" },
      { label: "A rischio", range: "50–69" },
      { label: "Critico", range: "0–49" },
    ],
    viewAll: "Vedi tutti",
    activeBlockers: "Blocchi attivi",
    blockersSubtitle: "Problemi che richiedono l'attenzione della leadership",
    boardAnswers: "Risposte pronte per il board",
    fullReport: "Report completo",
    repositories: "Repository",
    trends: "Tendenze",
    settings: "Impostazioni",
    weeklyReport: "Report Settimanale",
    blockers: "Blocchi",
    updatedAgo: "Aggiornato 2h fa",
    refresh: "Aggiorna",
    demoBanner:
      "Demo live — Questa dashboard utilizza dati simulati realistici per Acme Cloud.",
    connectGitHub: "Connetti il tuo GitHub",
    connectBtn: "Partecipa alla beta",
    kpiExplanations: {
      shippingSpeed:
        "Con quale costanza il team sta completando e rilasciando il lavoro.",
      reviewBottlenecks:
        "Dove il lavoro attende troppo a lungo per la revisione o l'approvazione.",
      bugRisk:
        "Se il lavoro relativo ai bug sta crescendo più velocemente della consegna delle funzionalità.",
      deliveryConfidence:
        "La probabilità che il team mantenga il ritmo di consegna attuale la settimana prossima.",
    },
  },
  report: {
    title: "Report Settimanale di Leadership Ingegneristica",
    subtitle: "Acme Cloud",
    sections: {
      execSummary: "Riepilogo Esecutivo",
      healthScore: "Punteggio Salute Ingegneristica",
      whatShipped: "Cosa è Stato Rilasciato",
      whatSlowed: "Cosa Ha Rallentato",
      risks: "Rischi Attuali",
      questions: "Domande per la Leadership",
      repoHealth: "Salute dei Repository",
      actions: "Azioni Raccomandate",
    },
    actions: {
      copyLink: "Copia link di condivisione",
      exportPdf: "Esporta PDF",
      sendEmail: "Invia per email",
      copied: "Copiato!",
    },
    disclaimer:
      "Questo report è generato dai dati di attività di GitHub ed è destinato alla revisione della leadership.",
  },
};
