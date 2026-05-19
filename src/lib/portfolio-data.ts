export type Locale = "en" | "de";

export type NavSection = {
  id: string;
  label: string;
};

export type SystemStatus = "production" | "scaling" | "delivered";

export type ServiceCard = {
  id: string;
  title: string;
  copy: string;
  stack: string[];
  caseStudyId?: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  context: string;
  status: SystemStatus;
  problem: string;
  solution: string;
  results: string[];
  stack: string[];
};

export type TimelineEntry = {
  period: string;
  role: string;
  org: string;
  logs: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type EducationEntry = {
  degree: string;
  school: string;
  period?: string;
  note?: string;
};

export type ArchiveProject = {
  title: string;
  description: string;
  stack: string[];
  href?: string;
};

export type Publication = {
  year: string;
  title: string;
  description: string;
  href: string;
};

export type ContactReason = {
  value: "job" | "project" | "other";
  label: string;
};

export type UiCopy = {
  skipToMain: string;
  languageSwitcher: string;
  openMenu: string;
  closeMenu: string;

  navHome: string;
  navServices: string;
  navWork: string;
  navAbout: string;
  navContact: string;

  heroAvailable: string;
  /**
   * Headline rendered as array of segments. Segment with emphasis:true is rendered with italic + accent.
   */
  heroHeadlineSegments: Array<{ text: string; emphasis?: boolean }>;
  heroSubcopy: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;

  servicesEyebrow: string;
  servicesTitle: string;
  servicesCopy: string;
  serviceMore: string;

  workEyebrow: string;
  workTitle: string;
  workCopy: string;
  caseProblem: string;
  caseSolution: string;
  caseResults: string;
  caseStack: string;
  statusLabels: Record<SystemStatus, string>;

  aboutEyebrow: string;
  aboutTitle: string;
  aboutBody: string[];

  experienceEyebrow: string;
  experienceTitle: string;

  educationLabel: string;

  skillsEyebrow: string;
  skillsTitle: string;

  archiveEyebrow: string;
  archiveTitle: string;
  additionalProjects: string;
  publications: string;
  openLink: string;
  readLink: string;

  contactEyebrow: string;
  contactTitle: string;
  contactCopy: string;
  contactFormLabel: string;
  contactChannelEmail: string;
  contactChannelLinkedin: string;
  contactChannelGithub: string;
  contactChannelGithubWork: string;
  contactChannelCv: string;
  contactChannelLocation: string;

  formName: string;
  formNamePlaceholder: string;
  formEmail: string;
  formEmailPlaceholder: string;
  formCompany: string;
  formCompanyPlaceholder: string;
  formReason: string;
  formMessage: string;
  formMessagePlaceholder: string;
  formSubmit: string;
  formSubmitting: string;
  formErrorName: string;
  formErrorEmail: string;
  formErrorReason: string;
  formErrorMessage: string;
  formErrorServer: string;
  formSuccessTitle: string;
  formSuccessText: string;
  formSuccessReset: string;
  formDisclaimer: string;
  reasons: ContactReason[];

  footerName: string;
  footerLocation: string;
  footerStack: string;
  footerBackToTop: string;
};

export type PortfolioContent = {
  profile: {
    name: string;
    role: string;
    location: string;
    email: string;
    linkedin: string;
    github: string;
    githubWork: string;
    cvPath: string;
  };
  sections: NavSection[];
  services: ServiceCard[];
  cases: CaseStudy[];
  timeline: TimelineEntry[];
  education: EducationEntry[];
  skills: SkillGroup[];
  archiveProjects: ArchiveProject[];
  publications: Publication[];
  ui: UiCopy;
};

const profileBase = {
  name: "Hasan Yücedag",
  role: "Software Engineer",
  email: "yucedagh1@gmail.com",
  linkedin: "https://www.linkedin.com/in/hasan-yuecedag",
  github: "https://github.com/hasanycdg",
  githubWork: "https://github.com/florianmatthiashasan",
  cvPath: "/Hasan_Yuecedag_Developer_Resume.pdf",
};

const enSections: NavSection[] = [
  { id: "home", label: "Index" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const deSections: NavSection[] = [
  { id: "home", label: "Index" },
  { id: "services", label: "Leistungen" },
  { id: "work", label: "Arbeiten" },
  { id: "about", label: "Über" },
  { id: "contact", label: "Kontakt" },
];

const enContent: PortfolioContent = {
  profile: {
    ...profileBase,
    location: "Innsbruck",
  },
  sections: enSections,
  services: [
    {
      id: "fullstack",
      title: "Fullstack engineering",
      copy:
        "End-to-end product development from data model to UI. Production-ready code, deployed and maintainable, with full technical ownership.",
      stack: ["Next.js", "TypeScript", "Node.js", "PHP", "PostgreSQL"],
      caseStudyId: "modular-cms",
    },
    {
      id: "ai",
      title: "AI integration",
      copy:
        "Practical AI built into real products — RAG chatbots, custom WordPress plugins, content workflows. Built to ship, not to demo.",
      stack: ["Python", "OpenAI", "RAG", "Vector DBs", "WordPress Plugin API"],
      caseStudyId: "ai-seo-plugin",
    },
    {
      id: "performance",
      title: "Performance & infrastructure",
      copy:
        "Lifting PageSpeed scores, cutting bundles, setting up resilient AWS delivery. Measurable, with before/after numbers.",
      stack: ["AWS EC2", "S3", "CloudFront", "Core Web Vitals", "Caching"],
      caseStudyId: "performance-aws",
    },
  ],
  cases: [
    {
      id: "ai-seo-plugin",
      title: "AI SEO plugin for WordPress",
      context: "florianmatthias · 2024 — present",
      status: "production",
      problem:
        "Editorial teams spend hours manually maintaining alt texts, Yoast metadata, and internal links. The process does not scale with content volume.",
      solution:
        "Built a WordPress plugin from scratch that integrates AI pipelines into the editorial workflow. Alt texts, metadata, and internal links are suggested automatically — the editor approves with one click.",
      results: [
        "Used in production by multiple client sites.",
        "Noticeable reduction in time spent per published article.",
        "Consistent SEO quality across editorial teams.",
      ],
      stack: ["PHP", "WordPress Plugin API", "OpenAI", "Yoast Hooks", "Prompt pipelines"],
    },
    {
      id: "rag-chatbot",
      title: "RAG chatbot for client websites",
      context: "florianmatthias · 2025",
      status: "production",
      problem:
        "Clients receive repetitive support questions during and outside business hours. Manual handling blocks the team and slows response times.",
      solution:
        "Implemented a chatbot system using site-specific knowledge sources and uploaded documents. Embeddings plus retrieval feed an LLM, embedded as a widget on the client's site.",
      results: [
        "Reduced repetitive support load through automated answers.",
        "24/7 response availability beyond business hours.",
        "Production AI features shipped for customer-facing websites.",
      ],
      stack: ["Python", "RAG", "Vector retrieval", "API integrations", "Web embedding"],
    },
    {
      id: "performance-aws",
      title: "Performance & AWS delivery",
      context: "Multiple client sites · 2024 — 2025",
      status: "delivered",
      problem:
        "Several client sites scored around 80 on PageSpeed, hurting SEO and conversion. Bundle weight, uncached assets, and slow image delivery were the main offenders.",
      solution:
        "Set up CloudFront-based delivery, restructured caching layers, optimized image pipelines and asset loading. Established repeatable deployment patterns across projects.",
      results: [
        "Lifted PageSpeed from ~80 to 95+ on real production sites.",
        "Reduced payload and improved perceived loading.",
        "Consistent deployment and delivery standards in place.",
      ],
      stack: ["AWS EC2", "S3", "CloudFront", "Caching", "Core Web Vitals"],
    },
    {
      id: "modular-cms",
      title: "Modular WordPress platforms",
      context: "florianmatthias · ongoing",
      status: "scaling",
      problem:
        "Clients need to edit content safely without breaking layout. Off-the-shelf themes don't give non-technical teams the structure they need.",
      solution:
        "Built maintainable CMS platforms with ACF, custom blocks, plugins, and API integrations. Editor-friendly, developer-friendly, consistent across projects.",
      results: [
        "Non-technical teams safely operate content.",
        "Maintainability improved through modular structure.",
        "Lower implementation overhead for new features.",
      ],
      stack: ["WordPress", "ACF", "Custom blocks", "REST APIs", "Theme engineering"],
    },
  ],
  timeline: [
    {
      period: "2025 — present",
      role: "Lead Fullstack Developer",
      org: "florianmatthias",
      logs: [
        "Shipping production client systems end-to-end.",
        "Direct client communication and technical ownership.",
        "Coordinating implementation across CMS, AI, and cloud layers.",
      ],
    },
    {
      period: "2024",
      role: "Software Development Intern",
      org: "Translogica",
      logs: [
        "Worked in a C# / ABP production environment.",
        "Implemented and optimized around 20 product features.",
        "Contributed to debugging, testing, and iterative improvements.",
      ],
    },
  ],
  education: [
    {
      degree: "BSc Computer Science",
      school: "University of Innsbruck",
      period: "2022 — 2025",
      note: "Thesis graded \"Sehr gut\"",
    },
    {
      degree: "BORG Innsbruck",
      school: "Technical track",
    },
  ],
  skills: [
    {
      title: "Frontend",
      items: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"],
    },
    {
      title: "Backend",
      items: ["Node.js", "PHP", "REST APIs", "Java · Spring Boot", "PostgreSQL"],
    },
    {
      title: "AI · WordPress",
      items: ["OpenAI", "RAG", "Vector retrieval", "Plugin API", "ACF"],
    },
    {
      title: "Cloud · Performance",
      items: ["AWS EC2", "S3", "CloudFront", "Caching", "Core Web Vitals"],
    },
  ],
  archiveProjects: [
    {
      title: "Transly",
      description: "SaaS translation platform for high-volume localization workflows, with XLIFF support.",
      stack: ["SaaS", "Localization", "XLIFF"],
      href: "https://github.com/hasanycdg/transly",
    },
    {
      title: "Agency Block CLI",
      description: "Node.js CLI for agency workflows that imports reusable WordPress components from a monorepo.",
      stack: ["Node.js", "CLI", "WordPress"],
      href: "https://github.com/florianmatthiashasan/agency-block",
    },
    {
      title: "Codebase Complexity Visualizer",
      description: "Local-first desktop app for repository hotspot and dependency-cycle analysis.",
      stack: ["Rust", "Tauri", "TypeScript", "SQLite"],
      href: "https://github.com/hasanycdg/Codebase-Complexity-Visualizer-CCV",
    },
    {
      title: "Clarity — Overthink Helper",
      description: "iOS app that helps users break out of overthinking loops with quick, structured prompts. Live on the App Store.",
      stack: ["iOS", "Swift", "App Store"],
      href: "https://apps.apple.com/us/app/clarity-overthink-helper/id6757189127",
    },
  ],
  publications: [
    {
      year: "2025",
      title: "Guess the Age of Photos",
      description:
        "Interactive thesis project and research publication for historical image age estimation.",
      href: "https://www.researchgate.net/publication/392167840_Guess_the_Age_of_Photos_An_Interactive_Web_Platform_for_Historical_Image_Age_Estimation",
    },
    {
      year: "2024",
      title: "IoT für autonome Fahrzeuge",
      description:
        "Seminar paper on IoT communication and smart infrastructure for autonomous vehicle systems.",
      href: "/Semesterarbeit.pdf",
    },
  ],
  ui: {
    skipToMain: "Skip to main content",
    languageSwitcher: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",

    navHome: "Index",
    navServices: "Services",
    navWork: "Work",
    navAbout: "About",
    navContact: "Contact",

    heroAvailable: "Available for new work",
    heroHeadlineSegments: [
      { text: "Modern interfaces. Scalable code. " },
      { text: "Successful products.", emphasis: true },
    ],
    heroSubcopy:
      "Fullstack engineering, AI integration, and performance work for teams that need serious software — not demos.",
    heroPrimaryCta: "Selected work",
    heroSecondaryCta: "Get in touch",

    servicesEyebrow: "01 — Services",
    servicesTitle: "What I build",
    servicesCopy:
      "Three areas where I deliver work that ships and stays. Each entry links to a real case study.",
    serviceMore: "View case",

    workEyebrow: "02 — Selected work",
    workTitle: "Production projects with measurable outcomes",
    workCopy:
      "Each case follows the same structure: the problem the client had, what I built, and what changed afterwards.",
    caseProblem: "Problem",
    caseSolution: "Solution",
    caseResults: "Results",
    caseStack: "Stack",
    statusLabels: {
      production: "In production",
      scaling: "Scaling",
      delivered: "Delivered",
    },

    aboutEyebrow: "03 — About",
    aboutTitle: "Engineer with skin in the game",
    aboutBody: [
      "I'm a Software Engineer working on real client systems in production environments.",
      "Since 2025 I've been Lead Fullstack Developer at florianmatthias, shipping production systems end-to-end across CMS, AI, and cloud layers.",
      "I take ownership across implementation, architecture decisions, direct client communication, and long-term maintainability. No hand-offs, no half-finished demos.",
    ],

    experienceEyebrow: "04 — Experience",
    experienceTitle: "Where I've been working",

    educationLabel: "Education",

    skillsEyebrow: "05 — Stack",
    skillsTitle: "Day-to-day toolkit",

    archiveEyebrow: "06 — More",
    archiveTitle: "Side projects and publications",
    additionalProjects: "Side projects",
    publications: "Publications",
    openLink: "Open",
    readLink: "Read",

    contactEyebrow: "07 — Contact",
    contactTitle: "Let's build something.",
    contactCopy:
      "Hiring, project inquiries, or a quick technical question — I respond within 24 hours.",
    contactFormLabel: "Send a message",
    contactChannelEmail: "Email",
    contactChannelLinkedin: "LinkedIn",
    contactChannelGithub: "GitHub",
    contactChannelGithubWork: "Work GitHub",
    contactChannelCv: "CV",
    contactChannelLocation: "Based in",

    formName: "Name",
    formNamePlaceholder: "Your name",
    formEmail: "Email",
    formEmailPlaceholder: "you@company.com",
    formCompany: "Company",
    formCompanyPlaceholder: "Optional",
    formReason: "About",
    formMessage: "Message",
    formMessagePlaceholder: "Tell me a bit about the role or project…",
    formSubmit: "Send message",
    formSubmitting: "Sending…",
    formErrorName: "Please enter your name (at least 2 characters).",
    formErrorEmail: "Please enter a valid email address.",
    formErrorReason: "Please pick one.",
    formErrorMessage: "Please write at least 20 characters so I can respond properly.",
    formErrorServer: "Server error. Please email me at yucedagh1@gmail.com.",
    formSuccessTitle: "Message received.",
    formSuccessText: "I'll get back to you within 24 hours.",
    formSuccessReset: "Send another",
    formDisclaimer: "Your details are used only to respond to your message.",
    reasons: [
      { value: "job", label: "Hiring" },
      { value: "project", label: "Project" },
      { value: "other", label: "Other" },
    ],

    footerName: "Hasan Yücedag",
    footerLocation: "Software Engineer · Innsbruck",
    footerStack: "Next.js · TypeScript · Tailwind",
    footerBackToTop: "Back to top",
  },
};

const deContent: PortfolioContent = {
  profile: {
    ...profileBase,
    location: "Innsbruck",
  },
  sections: deSections,
  services: [
    {
      id: "fullstack",
      title: "Fullstack Engineering",
      copy:
        "End-to-end Produktentwicklung — vom Datenmodell bis zur UI. Produktionsreif, deployt, wartbar — mit voller technischer Verantwortung.",
      stack: ["Next.js", "TypeScript", "Node.js", "PHP", "PostgreSQL"],
      caseStudyId: "modular-cms",
    },
    {
      id: "ai",
      title: "AI-Integration",
      copy:
        "Praktische AI in echten Produkten — RAG-Chatbots, eigene WordPress-Plugins, Content-Workflows. Gebaut um zu liefern, nicht zu demonstrieren.",
      stack: ["Python", "OpenAI", "RAG", "Vector DBs", "WordPress Plugin API"],
      caseStudyId: "ai-seo-plugin",
    },
    {
      id: "performance",
      title: "Performance & Infrastruktur",
      copy:
        "PageSpeed-Werte heben, Bundles verkleinern, stabile AWS-Auslieferung aufsetzen. Messbar mit Vorher-Nachher-Zahlen.",
      stack: ["AWS EC2", "S3", "CloudFront", "Core Web Vitals", "Caching"],
      caseStudyId: "performance-aws",
    },
  ],
  cases: [
    {
      id: "ai-seo-plugin",
      title: "AI-SEO-Plugin für WordPress",
      context: "florianmatthias · 2024 — heute",
      status: "production",
      problem:
        "Redaktionsteams verbringen Stunden mit der manuellen Pflege von Alt-Texten, Yoast-Metadaten und interner Verlinkung. Der Prozess skaliert nicht mit dem Content-Volumen.",
      solution:
        "Von Grund auf gebautes WordPress-Plugin, das AI-Pipelines in den Redaktions-Workflow integriert. Alt-Texte, Metadaten und interne Links werden automatisch vorgeschlagen — die Redaktion bestätigt mit einem Klick.",
      results: [
        "Im produktiven Einsatz bei mehreren Kundenseiten.",
        "Spürbar weniger Aufwand pro publiziertem Artikel.",
        "Konsistente SEO-Qualität über Redaktionsteams hinweg.",
      ],
      stack: ["PHP", "WordPress Plugin API", "OpenAI", "Yoast Hooks", "Prompt Pipelines"],
    },
    {
      id: "rag-chatbot",
      title: "RAG-Chatbot für Kundenwebsites",
      context: "florianmatthias · 2025",
      status: "production",
      problem:
        "Kunden erhalten viele repetitive Support-Anfragen — auch außerhalb der Geschäftszeiten. Manuelle Bearbeitung blockiert das Team und verlängert Antwortzeiten.",
      solution:
        "Chatbot-System mit website-spezifischen Wissensquellen und hochgeladenen Dokumenten. Embeddings plus Retrieval füttern ein LLM, eingebettet als Widget auf der Kundenseite.",
      results: [
        "Repetitive Support-Last durch automatisierte Antworten reduziert.",
        "24/7 Antworten — auch außerhalb der Kernzeiten.",
        "Produktive AI-Features für kundennahe Websites ausgerollt.",
      ],
      stack: ["Python", "RAG", "Vector Retrieval", "API-Integrationen", "Web Embedding"],
    },
    {
      id: "performance-aws",
      title: "Performance & AWS-Delivery",
      context: "Mehrere Kundenseiten · 2024 — 2025",
      status: "delivered",
      problem:
        "Mehrere Kundenseiten lagen bei PageSpeed ~80 — schlecht für SEO und Conversion. Hauptursachen: Bundle-Gewicht, ungecachte Assets, langsame Bildauslieferung.",
      solution:
        "CloudFront-basierte Auslieferung aufgesetzt, Caching-Schichten neu strukturiert, Bild-Pipelines und Asset-Loading optimiert. Wiederholbare Deployment-Patterns über Projekte hinweg etabliert.",
      results: [
        "PageSpeed von ~80 auf 95+ in echten produktiven Sites gehoben.",
        "Payload reduziert, wahrgenommene Ladezeit verbessert.",
        "Konsistente Deployment- und Delivery-Standards etabliert.",
      ],
      stack: ["AWS EC2", "S3", "CloudFront", "Caching", "Core Web Vitals"],
    },
    {
      id: "modular-cms",
      title: "Modulare WordPress-Plattformen",
      context: "florianmatthias · laufend",
      status: "scaling",
      problem:
        "Kunden müssen Inhalte sicher pflegen können, ohne das Layout zu brechen. Standard-Themes bieten Nicht-Technikern nicht die nötige Struktur.",
      solution:
        "Wartbare CMS-Plattformen mit ACF, Custom Blocks, Plugins und API-Integrationen. Redakteur-freundlich, Entwickler-freundlich, projektübergreifend konsistent.",
      results: [
        "Nicht-technische Teams pflegen Inhalte sicher und selbstständig.",
        "Wartbarkeit durch modulare Struktur deutlich verbessert.",
        "Niedrigerer Aufwand für spätere Feature-Erweiterungen.",
      ],
      stack: ["WordPress", "ACF", "Custom Blocks", "REST APIs", "Theme Engineering"],
    },
  ],
  timeline: [
    {
      period: "2025 — heute",
      role: "Lead Fullstack Developer",
      org: "florianmatthias",
      logs: [
        "Produktive Kundensysteme End-to-End umgesetzt.",
        "Direkte Kundenkommunikation und technische Ownership.",
        "Implementierung über CMS-, AI- und Cloud-Layer koordiniert.",
      ],
    },
    {
      period: "2024",
      role: "Softwareentwicklungs-Intern",
      org: "Translogica",
      logs: [
        "Im produktiven C# / ABP Umfeld gearbeitet.",
        "Rund 20 Features implementiert und optimiert.",
        "Debugging, Testing und iterative Verbesserungen mitgestaltet.",
      ],
    },
  ],
  education: [
    {
      degree: "BSc Informatik",
      school: "Universität Innsbruck",
      period: "2022 — 2025",
      note: "Bachelorarbeit Note „Sehr gut\"",
    },
    {
      degree: "BORG Innsbruck",
      school: "Technischer Zweig",
    },
  ],
  skills: [
    {
      title: "Frontend",
      items: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"],
    },
    {
      title: "Backend",
      items: ["Node.js", "PHP", "REST APIs", "Java · Spring Boot", "PostgreSQL"],
    },
    {
      title: "AI · WordPress",
      items: ["OpenAI", "RAG", "Vector Retrieval", "Plugin API", "ACF"],
    },
    {
      title: "Cloud · Performance",
      items: ["AWS EC2", "S3", "CloudFront", "Caching", "Core Web Vitals"],
    },
  ],
  archiveProjects: [
    {
      title: "Transly",
      description: "SaaS-Übersetzungsplattform für hohe Lokalisierungsvolumen inkl. XLIFF-Support.",
      stack: ["SaaS", "Localization", "XLIFF"],
      href: "https://github.com/hasanycdg/transly",
    },
    {
      title: "Agency Block CLI",
      description: "Node.js CLI für Agentur-Workflows zum Import wiederverwendbarer WordPress-Komponenten aus einem Monorepo.",
      stack: ["Node.js", "CLI", "WordPress"],
      href: "https://github.com/florianmatthiashasan/agency-block",
    },
    {
      title: "Codebase Complexity Visualizer",
      description: "Local-first Desktop-App zur Analyse von Hotspots und Abhängigkeitszyklen.",
      stack: ["Rust", "Tauri", "TypeScript", "SQLite"],
      href: "https://github.com/hasanycdg/Codebase-Complexity-Visualizer-CCV",
    },
    {
      title: "Clarity — Overthink Helper",
      description: "iOS-App, die hilft, aus Gedankenschleifen auszubrechen — mit kurzen, strukturierten Prompts. Live im App Store.",
      stack: ["iOS", "Swift", "App Store"],
      href: "https://apps.apple.com/us/app/clarity-overthink-helper/id6757189127",
    },
  ],
  publications: [
    {
      year: "2025",
      title: "Guess the Age of Photos",
      description:
        "Interaktives Thesis-Projekt und Research-Veröffentlichung zur Altersschätzung historischer Bilder.",
      href: "https://www.researchgate.net/publication/392167840_Guess_the_Age_of_Photos_An_Interactive_Web_Platform_for_Historical_Image_Age_Estimation",
    },
    {
      year: "2024",
      title: "IoT für autonome Fahrzeuge",
      description:
        "Seminararbeit über IoT-Kommunikation und intelligente Infrastruktur für autonome Fahrzeugsysteme.",
      href: "/Semesterarbeit.pdf",
    },
  ],
  ui: {
    skipToMain: "Zum Hauptinhalt springen",
    languageSwitcher: "Sprache",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",

    navHome: "Index",
    navServices: "Leistungen",
    navWork: "Arbeiten",
    navAbout: "Über",
    navContact: "Kontakt",

    heroAvailable: "Verfügbar für neue Projekte",
    heroHeadlineSegments: [
      { text: "Moderne Interfaces. Skalierbarer Code. " },
      { text: "Erfolgreiche Produkte.", emphasis: true },
    ],
    heroSubcopy:
      "Fullstack-Entwicklung, AI-Integration und Performance-Arbeit für Teams, die ernsthafte Software brauchen — keine Demos.",
    heroPrimaryCta: "Ausgewählte Arbeiten",
    heroSecondaryCta: "Kontakt aufnehmen",

    servicesEyebrow: "01 — Leistungen",
    servicesTitle: "Was ich baue",
    servicesCopy:
      "Drei Bereiche, in denen ich Arbeit liefere, die produktiv geht und bleibt. Jeder Eintrag führt zu einer echten Case Study.",
    serviceMore: "Case ansehen",

    workEyebrow: "02 — Ausgewählte Arbeiten",
    workTitle: "Produktive Projekte mit messbaren Ergebnissen",
    workCopy:
      "Jede Case folgt derselben Struktur: das Problem des Kunden, was ich gebaut habe, was sich danach geändert hat.",
    caseProblem: "Problem",
    caseSolution: "Lösung",
    caseResults: "Ergebnisse",
    caseStack: "Stack",
    statusLabels: {
      production: "In Produktion",
      scaling: "Skaliert",
      delivered: "Geliefert",
    },

    aboutEyebrow: "03 — Über",
    aboutTitle: "Engineer mit echter Verantwortung",
    aboutBody: [
      "Ich bin Software Engineer und arbeite an realen Kundensystemen in produktiven Umgebungen.",
      "Seit 2025 bin ich Lead Fullstack Developer bei florianmatthias und liefere produktive Systeme End-to-End über CMS-, AI- und Cloud-Layer.",
      "Ich übernehme Verantwortung über Implementierung, Architekturentscheidungen, direkte Kundenkommunikation und langfristige Wartbarkeit. Keine Übergaben, keine halbfertigen Demos.",
    ],

    experienceEyebrow: "04 — Erfahrung",
    experienceTitle: "Wo ich bisher gearbeitet habe",

    educationLabel: "Ausbildung",

    skillsEyebrow: "05 — Stack",
    skillsTitle: "Tägliches Toolkit",

    archiveEyebrow: "06 — Mehr",
    archiveTitle: "Side Projects und Publikationen",
    additionalProjects: "Side Projects",
    publications: "Publikationen",
    openLink: "Öffnen",
    readLink: "Lesen",

    contactEyebrow: "07 — Kontakt",
    contactTitle: "Lass uns etwas bauen.",
    contactCopy:
      "Stellenangebote, Projektanfragen oder eine technische Frage — ich antworte innerhalb von 24 Stunden.",
    contactFormLabel: "Nachricht senden",
    contactChannelEmail: "E-Mail",
    contactChannelLinkedin: "LinkedIn",
    contactChannelGithub: "GitHub",
    contactChannelGithubWork: "Work GitHub",
    contactChannelCv: "CV",
    contactChannelLocation: "Standort",

    formName: "Name",
    formNamePlaceholder: "Dein Name",
    formEmail: "E-Mail",
    formEmailPlaceholder: "du@firma.com",
    formCompany: "Unternehmen",
    formCompanyPlaceholder: "Optional",
    formReason: "Anlass",
    formMessage: "Nachricht",
    formMessagePlaceholder: "Erzähl mir kurz, worum es geht…",
    formSubmit: "Nachricht senden",
    formSubmitting: "Wird gesendet…",
    formErrorName: "Bitte gib deinen Namen ein (mindestens 2 Zeichen).",
    formErrorEmail: "Bitte gib eine gültige E-Mail-Adresse ein.",
    formErrorReason: "Bitte wähle eine Option.",
    formErrorMessage: "Bitte schreib mindestens 20 Zeichen, damit ich sinnvoll antworten kann.",
    formErrorServer: "Server-Fehler. Bitte schreib direkt an yucedagh1@gmail.com.",
    formSuccessTitle: "Nachricht angekommen.",
    formSuccessText: "Ich melde mich innerhalb von 24 Stunden bei dir.",
    formSuccessReset: "Weitere senden",
    formDisclaimer: "Deine Angaben werden ausschließlich zur Beantwortung deiner Nachricht genutzt.",
    reasons: [
      { value: "job", label: "Stelle" },
      { value: "project", label: "Projekt" },
      { value: "other", label: "Sonstiges" },
    ],

    footerName: "Hasan Yücedag",
    footerLocation: "Software Engineer · Innsbruck",
    footerStack: "Next.js · TypeScript · Tailwind",
    footerBackToTop: "Nach oben",
  },
};

export const defaultLocale: Locale = "de";

export const portfolioByLocale: Record<Locale, PortfolioContent> = {
  en: enContent,
  de: deContent,
};
