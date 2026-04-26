export type Locale = "en" | "de";

export type NavSection = {
  id: string;
  label: string;
  short: string;
};

export type MetricCounter = {
  label: string;
  from: number;
  to: number;
  suffix?: string;
  prefix?: string;
  note: string;
};

export type SystemStatus = "production" | "scaling" | "delivered";

export type SystemModule = {
  id: string;
  name: string;
  status: SystemStatus;
  summary: string;
  architecture: string[];
  stack: string[];
  impact: string[];
};

export type TimelineEntry = {
  period: string;
  role: string;
  org: string;
  logs: string[];
};

export type MatrixColumn = "Build" | "Optimize" | "Deploy" | "Maintain";

export type CapabilityRow = {
  area: string;
  cells: Record<MatrixColumn, string[]>;
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

export type BootCopy = {
  initMessage: string;
  steps: [string, string, string, string];
};

export type DiagramCopy = {
  title: string;
  online: string;
  nodes: {
    frontend: string;
    backend: string;
    ai: string;
    wordpress: string;
    cloud: string;
    performance: string;
  };
};

export type PaletteCopy = {
  ariaLabel: string;
  placeholder: string;
  noMatch: string;
  jumpPrefix: string;
  downloadCv: string;
  openLinkedin: string;
  openGithub: string;
  externalHint: string;
};

export type UiCopy = {
  skipToMain: string;
  topbarSubtitle: string;
  openPalette: string;
  languageSwitcher: string;
  layerLabel: string;

  overviewLayerTitle: string;
  currentLocation: string;
  relocation: string;
  viewSystems: string;
  downloadCv: string;
  contact: string;

  systemsLayerTitle: string;
  systemsTitle: string;
  systemsCopy: string;
  moduleLabel: string;
  statusLabels: Record<SystemStatus, string>;
  layerMap: string;
  layerMapValue: string;
  inspectInternals: string;
  hideInternals: string;
  stackLabel: string;
  impactLabel: string;

  timelineLayerTitle: string;
  timelineTitle: string;
  timelineCopy: string;

  matrixLayerTitle: string;
  matrixTitle: string;
  matrixCopy: string;
  matrixDomain: string;

  aboutLayerTitle: string;
  aboutTitle: string;
  aboutCopy: string;
  additionalSystems: string;
  publications: string;
  openLink: string;
  readLink: string;

  contactLayerTitle: string;
  readyToConnect: string;
  contactTitle: string;
  contactCopy: string;
  email: string;
  linkedin: string;
  linkedinMeta: string;
  github: string;
  githubMeta: string;
  cv: string;
  cvMeta: string;

  footerBuiltWith: string;
  floatingCommand: string;
  terminalChannel: string;
};

export type PortfolioContent = {
  profile: {
    name: string;
    role: string;
    location: string;
    relocation: string;
    headline: string;
    subcopy: string;
    email: string;
    linkedin: string;
    github: string;
    portfolio: string;
    cvPath: string;
  };
  commandPreview: string;
  sections: NavSection[];
  metrics: MetricCounter[];
  systems: SystemModule[];
  timeline: TimelineEntry[];
  matrixColumns: MatrixColumn[];
  matrixColumnLabels: Record<MatrixColumn, string>;
  capabilityMatrix: CapabilityRow[];
  archiveProjects: ArchiveProject[];
  publications: Publication[];
  ui: UiCopy;
  palette: PaletteCopy;
  boot: BootCopy;
  diagram: DiagramCopy;
};

const profileBase = {
  name: "Hasan Yucedag",
  role: "Software Engineer / Fullstack Developer",
  email: "yucedagh1@gmail.com",
  linkedin: "https://www.linkedin.com/in/hasan-yuecedag",
  github: "https://github.com/hasanycdg",
  portfolio: "https://hasanyucedagportfolio.vercel.app/",
  cvPath: "/Hasan_Yucedag_lebenslauf.pdf",
};

const commonSections: NavSection[] = [
  { id: "overview", label: "System Overview", short: "OVR" },
  { id: "systems", label: "Deployed Systems", short: "SYS" },
  { id: "timeline", label: "Execution Timeline", short: "LOG" },
  { id: "matrix", label: "Capability Matrix", short: "MAT" },
  { id: "about", label: "Operator Profile", short: "BIO" },
  { id: "contact", label: "Collaboration Endpoint", short: "END" },
];

const commonMatrixColumns: MatrixColumn[] = ["Build", "Optimize", "Deploy", "Maintain"];

const enContent: PortfolioContent = {
  profile: {
    ...profileBase,
    location: "Innsbruck, Austria",
    relocation: "Relocating to Zurich, Switzerland in August 2026",
    headline: "Software Engineer building AI-powered, performance-focused web systems.",
    subcopy:
      "I build production-ready software systems for real clients — combining fullstack engineering, AI-powered workflows, cloud infrastructure, and performance-focused architecture.",
  },
  commandPreview: "deploy --target zurich --role software-engineer",
  sections: commonSections,
  metrics: [
    {
      label: "PageSpeed",
      from: 80,
      to: 95,
      suffix: "+",
      note: "Performance optimization in production websites.",
    },
    {
      label: "Client Systems",
      from: 0,
      to: 5,
      suffix: "+",
      note: "Custom plugin and AI workflows adopted by multiple clients.",
    },
    {
      label: "Cloud Tracks",
      from: 0,
      to: 2,
      note: "AWS delivery + Azure AZ-104 certification path.",
    },
    {
      label: "Core Domains",
      from: 0,
      to: 7,
      note: "Fullstack, AI, WordPress, cloud, performance, APIs, client delivery.",
    },
  ],
  systems: [
    {
      id: "ai-seo-plugin",
      name: "AI SEO Optimization Plugin for WordPress",
      status: "production",
      summary:
        "Built from scratch an AI-powered WordPress plugin used by multiple clients. It generates alt text, fills Yoast SEO metadata, creates internal links automatically and improves on-page SEO workflows.",
      architecture: [
        "WordPress Admin",
        "AI Service",
        "Yoast SEO",
        "Media Library",
        "Internal Linking Engine",
      ],
      stack: ["PHP", "WordPress", "Plugin API", "Yoast Hooks", "Prompt Pipelines"],
      impact: [
        "Reduced repetitive editorial SEO work.",
        "Improved metadata consistency across content teams.",
        "Enabled faster publish workflows with better on-page quality.",
      ],
    },
    {
      id: "rag-chatbot",
      name: "RAG-based AI Chatbot for Client Websites",
      status: "production",
      summary:
        "Built chatbot systems using uploaded and site-specific knowledge sources to answer user questions and reduce manual support effort.",
      architecture: [
        "Documents / Website Content",
        "Embeddings",
        "Retrieval",
        "LLM Answer",
        "Website Widget",
      ],
      stack: ["Python", "RAG", "Vector Retrieval", "API Integrations", "Web Embedding"],
      impact: [
        "Reduced repetitive support load through automated answers.",
        "Improved response availability beyond business hours.",
        "Shipped practical AI features for client-facing websites.",
      ],
    },
    {
      id: "performance-aws",
      name: "Performance Optimization & AWS Delivery",
      status: "delivered",
      summary:
        "Improved production websites through caching, image optimization, asset loading strategies and CloudFront-based delivery.",
      architecture: ["WordPress", "Cache Layer", "CloudFront", "Optimized Assets", "User"],
      stack: ["AWS EC2", "S3", "CloudFront", "Caching", "Core Web Vitals"],
      impact: [
        "Lifted PageSpeed from around 80 to 95+.",
        "Reduced payload and improved perceived loading.",
        "Established consistent deployment and delivery patterns.",
      ],
    },
    {
      id: "modular-cms",
      name: "Custom WordPress Platforms with Modular Blocks",
      status: "scaling",
      summary:
        "Built maintainable CMS platforms with ACF, custom blocks, plugins and API integrations for client-editable structures.",
      architecture: ["ACF", "Custom Blocks", "Theme Layer", "API Integrations", "Client CMS"],
      stack: ["WordPress", "ACF", "Custom Blocks", "REST APIs", "Theme Engineering"],
      impact: [
        "Enabled non-technical teams to operate content safely.",
        "Improved maintainability through modular structure.",
        "Lowered future implementation overhead for new features.",
      ],
    },
  ],
  timeline: [
    {
      period: "2025 - Present",
      role: "Fullstack Developer (Lead responsibilities)",
      org: "florianmatthias",
      logs: [
        "Shipping production client systems end-to-end.",
        "Direct client communication and technical ownership.",
        "Coordinating implementation across CMS, AI and cloud layers.",
      ],
    },
    {
      period: "2024",
      role: "Software Development Intern",
      org: "Translogica",
      logs: [
        "Worked in C# / ABP production environment.",
        "Implemented and optimized roughly 20 product features.",
        "Contributed to debugging, testing and iterative improvements.",
      ],
    },
    {
      period: "2022 - 2025",
      role: "BSc Computer Science",
      org: "University of Innsbruck",
      logs: [
        "Built practical software projects in web and data domains.",
        "Strengthened software engineering and architecture fundamentals.",
        "Completed thesis with grade \"Sehr gut\".",
      ],
    },
  ],
  matrixColumns: commonMatrixColumns,
  matrixColumnLabels: {
    Build: "Build",
    Optimize: "Optimize",
    Deploy: "Deploy",
    Maintain: "Maintain",
  },
  capabilityMatrix: [
    {
      area: "Frontend Systems",
      cells: {
        Build: ["Next.js", "TypeScript", "Tailwind"],
        Optimize: ["Hydration strategy", "Bundle control", "UX motion"],
        Deploy: ["Static + dynamic routing", "SEO metadata"],
        Maintain: ["Refactoring", "Design-system consistency"],
      },
    },
    {
      area: "Backend APIs",
      cells: {
        Build: ["Node/PHP services", "Integration adapters"],
        Optimize: ["Response shaping", "Error boundaries"],
        Deploy: ["Versioned interfaces", "Runtime config"],
        Maintain: ["Debugging", "Contract stability"],
      },
    },
    {
      area: "WordPress Engineering",
      cells: {
        Build: ["Custom plugins", "ACF models", "Blocks"],
        Optimize: ["Editorial workflow", "Plugin performance"],
        Deploy: ["Client-ready CMS", "Theme integration"],
        Maintain: ["Upgrades", "Plugin lifecycle"],
      },
    },
    {
      area: "AI / RAG Systems",
      cells: {
        Build: ["Knowledge pipelines", "Prompt workflows"],
        Optimize: ["Retrieval quality", "Answer relevance"],
        Deploy: ["Website widgets", "Content ingestion"],
        Maintain: ["Model iteration", "Source refresh"],
      },
    },
    {
      area: "Cloud & DevOps",
      cells: {
        Build: ["AWS infrastructure", "CDN delivery"],
        Optimize: ["Caching", "Asset strategy"],
        Deploy: ["EC2", "S3", "CloudFront"],
        Maintain: ["Monitoring", "Operational fixes"],
      },
    },
    {
      area: "Performance Optimization",
      cells: {
        Build: ["Performance baselines", "Audit flows"],
        Optimize: ["CWV and Lighthouse", "Image + script loading"],
        Deploy: ["Measured improvements", "Regression checks"],
        Maintain: ["Continuous tuning", "Client reporting"],
      },
    },
  ],
  archiveProjects: [
    {
      title: "Transly",
      description:
        "SaaS translation platform for high-volume localization workflows, including XLIFF support.",
      stack: ["SaaS", "Localization", "XLIFF"],
      href: "https://github.com/hasanycdg/transly",
    },
    {
      title: "Agency Block CLI",
      description:
        "Node.js CLI for agency workflows that imports reusable WordPress components from a monorepo.",
      stack: ["Node.js", "CLI", "WordPress"],
      href: "https://github.com/florianmatthiashasan/agency-block",
    },
    {
      title: "Codebase Complexity Visualizer (CCV)",
      description: "Local-first desktop app for repository hotspot and dependency-cycle analysis.",
      stack: ["Rust", "Tauri", "TypeScript", "SQLite"],
      href: "https://github.com/hasanycdg/Codebase-Complexity-Visualizer-CCV",
    },
    {
      title: "Weather Application",
      description: "Web app for real-time weather data visualization with API-driven backend.",
      stack: ["Java", "Spring Boot", "PostgreSQL"],
      href: "https://github.com/hasanycdg/github_projekt",
    },
  ],
  publications: [
    {
      year: "2025",
      title: "Guess the Age of Photos",
      description:
        "Interactive thesis project and research publication pipeline for historical image age estimation.",
      href: "https://www.researchgate.net/publication/392167840_Guess_the_Age_of_Photos_An_Interactive_Web_Platform_for_Historical_Image_Age_Estimation",
    },
    {
      year: "2024",
      title: "IoT fur autonome Fahrzeuge",
      description:
        "Seminar paper on IoT communication and smart infrastructure for autonomous vehicle systems.",
      href: "/Semesterarbeit.pdf",
    },
  ],
  ui: {
    skipToMain: "Skip to main content",
    topbarSubtitle: "Engineering Operating System",
    openPalette: "Cmd+K",
    languageSwitcher: "Language",
    layerLabel: "Layer",

    overviewLayerTitle: "System Overview",
    currentLocation: "Current location",
    relocation: "Relocation",
    viewSystems: "View Systems",
    downloadCv: "Download CV",
    contact: "Contact",

    systemsLayerTitle: "Deployed Systems",
    systemsTitle: "Production modules with technical architecture visibility",
    systemsCopy:
      "Each module exposes problem, implementation path and production impact. Hover and inspect for detailed internals.",
    moduleLabel: "module",
    statusLabels: {
      production: "Production",
      scaling: "Scaling",
      delivered: "Delivered",
    },
    layerMap: "Layer map",
    layerMapValue: "Interface -> Logic -> Delivery -> Operations",
    inspectInternals: "Inspect architecture internals",
    hideInternals: "Hide architecture internals",
    stackLabel: "Stack",
    impactLabel: "Impact log",

    timelineLayerTitle: "Execution Timeline",
    timelineTitle: "Deployment-style log of experience and execution",
    timelineCopy:
      "Structured as operational logs to show progression from internship to lead-level fullstack ownership.",

    matrixLayerTitle: "Capability Matrix",
    matrixTitle: "Interactive capability matrix across engineering lifecycle",
    matrixCopy:
      "Rows represent capability domains, columns represent execution phase: Build, Optimize, Deploy and Maintain.",
    matrixDomain: "Domain",

    aboutLayerTitle: "Operator Profile",
    aboutTitle: "Grounded engineering execution with technical ownership",
    aboutCopy:
      "I work directly on real client systems in production environments, taking ownership across implementation, architecture choices, communication and long-term maintainability. I am relocating to Zurich in August 2026 and actively pursuing Swiss software engineering roles.",
    additionalSystems: "Additional Systems",
    publications: "Papers & Publications",
    openLink: "Open",
    readLink: "Read",

    contactLayerTitle: "Collaboration Endpoint",
    readyToConnect: "Ready to connect?",
    contactTitle: "Open to Software Engineer / Fullstack roles in Zurich",
    contactCopy:
      "If your team is building serious products and needs a fullstack engineer who can ship and own production systems, I am available for interviews and technical discussions.",
    email: "Email",
    linkedin: "LinkedIn",
    linkedinMeta: "Professional profile",
    github: "GitHub",
    githubMeta: "Projects and repositories",
    cv: "CV",
    cvMeta: "Download PDF",

    footerBuiltWith: "Built with Next.js / TypeScript / Tailwind / Framer Motion",
    floatingCommand: "Command Palette",
    terminalChannel: "command.run",
  },
  palette: {
    ariaLabel: "Command palette",
    placeholder: "Search commands or sections",
    noMatch: "No matching command.",
    jumpPrefix: "Jump to",
    downloadCv: "Download CV",
    openLinkedin: "Open LinkedIn",
    openGithub: "Open GitHub",
    externalHint: "External",
  },
  boot: {
    initMessage: "Initializing engineering command center...",
    steps: [
      "[01] Loading modules",
      "[02] Wiring architecture graph",
      "[03] Syncing deployment timeline",
      "[04] Ready for recruiter inspection",
    ],
  },
  diagram: {
    title: "Live architecture graph",
    online: "online",
    nodes: {
      frontend: "Frontend",
      backend: "Backend APIs",
      ai: "AI / RAG",
      wordpress: "WordPress",
      cloud: "Cloud",
      performance: "Performance",
    },
  },
};

const deContent: PortfolioContent = {
  profile: {
    ...profileBase,
    location: "Innsbruck, Österreich",
    relocation: "Umzug nach Zürich, Schweiz im August 2026",
    headline: "Software Engineer für AI-gestützte, performance-fokussierte Websysteme.",
    subcopy:
      "Ich entwickle produktionsreife Softwaresysteme für reale Kunden — und verbinde dabei Fullstack Engineering, AI-gestützte Workflows, Cloud-Infrastruktur und performance-fokussierte Architektur.",
  },
  commandPreview: "deploy --target zurich --role software-engineer",
  sections: [
    { id: "overview", label: "Systemüberblick", short: "OVR" },
    { id: "systems", label: "Ausgerollte Systeme", short: "SYS" },
    { id: "timeline", label: "Umsetzungs-Timeline", short: "LOG" },
    { id: "matrix", label: "Kompetenz-Matrix", short: "MAT" },
    { id: "about", label: "Operator Profil", short: "BIO" },
    { id: "contact", label: "Kontakt-Endpoint", short: "END" },
  ],
  metrics: [
    {
      label: "PageSpeed",
      from: 80,
      to: 95,
      suffix: "+",
      note: "Performance-Optimierung für produktive Websites.",
    },
    {
      label: "Kundensysteme",
      from: 0,
      to: 5,
      suffix: "+",
      note: "Custom Plugin- und AI-Workflows bei mehreren Kunden im Einsatz.",
    },
    {
      label: "Cloud-Pfade",
      from: 0,
      to: 2,
      note: "AWS Delivery plus Azure AZ-104 Zertifizierungsweg.",
    },
    {
      label: "Kernbereiche",
      from: 0,
      to: 7,
      note: "Fullstack, AI, WordPress, Cloud, Performance, APIs, Kundenauslieferung.",
    },
  ],
  systems: [
    {
      id: "ai-seo-plugin",
      name: "AI SEO Optimierungs-Plugin für WordPress",
      status: "production",
      summary:
        "Von Grund auf entwickeltes AI-WordPress-Plugin, das bei mehreren Kunden eingesetzt wird. Es generiert Alt-Texte, befüllt Yoast-SEO-Metadaten, erstellt interne Verlinkungen automatisch und verbessert On-Page-SEO-Workflows.",
      architecture: [
        "WordPress Admin",
        "AI Service",
        "Yoast SEO",
        "Media Library",
        "Internal Linking Engine",
      ],
      stack: ["PHP", "WordPress", "Plugin API", "Yoast Hooks", "Prompt Pipelines"],
      impact: [
        "Weniger repetitive SEO-Aufgaben im Redaktionsalltag.",
        "Konstantere Metadaten-Qualität über Teams hinweg.",
        "Schnellere Publishing-Workflows mit besserer On-Page-Qualität.",
      ],
    },
    {
      id: "rag-chatbot",
      name: "RAG-basierter AI Chatbot für Kundenwebsites",
      status: "production",
      summary:
        "Chatbot-Systeme mit hochgeladenen und website-spezifischen Wissensquellen, um Fragen zu beantworten und manuellen Support-Aufwand zu reduzieren.",
      architecture: [
        "Documents / Website Content",
        "Embeddings",
        "Retrieval",
        "LLM Answer",
        "Website Widget",
      ],
      stack: ["Python", "RAG", "Vector Retrieval", "API Integrations", "Web Embedding"],
      impact: [
        "Deutlich weniger repetitiver Support durch automatisierte Antworten.",
        "Bessere Verfügbarkeit von Antworten auch außerhalb von Kernzeiten.",
        "Praktische AI-Features für kundennahe Websites produktiv ausgerollt.",
      ],
    },
    {
      id: "performance-aws",
      name: "Performance-Optimierung & AWS Delivery",
      status: "delivered",
      summary:
        "Produktive Websites durch Caching, Bildoptimierung, Asset-Loading-Strategien und CloudFront-basierte Auslieferung verbessert.",
      architecture: ["WordPress", "Cache Layer", "CloudFront", "Optimized Assets", "User"],
      stack: ["AWS EC2", "S3", "CloudFront", "Caching", "Core Web Vitals"],
      impact: [
        "PageSpeed von ca. 80 auf 95+ gesteigert.",
        "Payload reduziert und wahrgenommene Ladezeit verbessert.",
        "Stabile Deployment- und Delivery-Standards etabliert.",
      ],
    },
    {
      id: "modular-cms",
      name: "Custom WordPress Plattformen mit modularen Blocks",
      status: "scaling",
      summary:
        "Wartbare CMS-Plattformen mit ACF, Custom Blocks, Plugins und API-Integrationen für editierbare Kundenstrukturen gebaut.",
      architecture: ["ACF", "Custom Blocks", "Theme Layer", "API Integrations", "Client CMS"],
      stack: ["WordPress", "ACF", "Custom Blocks", "REST APIs", "Theme Engineering"],
      impact: [
        "Nicht-technische Teams können Inhalte sicher pflegen.",
        "Wartbarkeit durch modulare Struktur deutlich verbessert.",
        "Niedrigerer Aufwand für spätere Feature-Erweiterungen.",
      ],
    },
  ],
  timeline: [
    {
      period: "2025 - Heute",
      role: "Fullstack Developer (Lead-Verantwortung)",
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
    {
      period: "2022 - 2025",
      role: "BSc Informatik",
      org: "Universität Innsbruck",
      logs: [
        "Praxisnahe Softwareprojekte in Web- und Datenbereichen umgesetzt.",
        "Fundamente in Software Engineering und Architektur vertieft.",
        "Bachelorarbeit mit Note \"Sehr gut\" abgeschlossen.",
      ],
    },
  ],
  matrixColumns: commonMatrixColumns,
  matrixColumnLabels: {
    Build: "Umsetzen",
    Optimize: "Optimieren",
    Deploy: "Ausrollen",
    Maintain: "Betreiben",
  },
  capabilityMatrix: [
    {
      area: "Frontend-Systeme",
      cells: {
        Build: ["Next.js", "TypeScript", "Tailwind"],
        Optimize: ["Hydration-Strategie", "Bundle-Kontrolle", "UX Motion"],
        Deploy: ["Static + Dynamic Routing", "SEO Metadaten"],
        Maintain: ["Refactoring", "Design-System Konsistenz"],
      },
    },
    {
      area: "Backend-APIs",
      cells: {
        Build: ["Node/PHP Services", "Integrations-Adapter"],
        Optimize: ["Response Shaping", "Error Boundaries"],
        Deploy: ["Versionierte Interfaces", "Runtime Config"],
        Maintain: ["Debugging", "Contract Stability"],
      },
    },
    {
      area: "WordPress Engineering",
      cells: {
        Build: ["Custom Plugins", "ACF Modelle", "Blocks"],
        Optimize: ["Editorial Workflow", "Plugin Performance"],
        Deploy: ["Client-Ready CMS", "Theme Integration"],
        Maintain: ["Upgrades", "Plugin Lifecycle"],
      },
    },
    {
      area: "AI / RAG Systeme",
      cells: {
        Build: ["Knowledge Pipelines", "Prompt Workflows"],
        Optimize: ["Retrieval-Qualität", "Answer Relevance"],
        Deploy: ["Website Widgets", "Content Ingestion"],
        Maintain: ["Model Iteration", "Source Refresh"],
      },
    },
    {
      area: "Cloud & DevOps",
      cells: {
        Build: ["AWS Infrastruktur", "CDN Delivery"],
        Optimize: ["Caching", "Asset Strategie"],
        Deploy: ["EC2", "S3", "CloudFront"],
        Maintain: ["Monitoring", "Operational Fixes"],
      },
    },
    {
      area: "Performance Optimierung",
      cells: {
        Build: ["Performance Baselines", "Audit Flows"],
        Optimize: ["CWV und Lighthouse", "Image + Script Loading"],
        Deploy: ["Messbare Verbesserungen", "Regression Checks"],
        Maintain: ["Kontinuierliches Tuning", "Client Reporting"],
      },
    },
  ],
  archiveProjects: [
    {
      title: "Transly",
      description:
        "SaaS-Übersetzungsplattform für hohe Lokalisierungsvolumen inklusive XLIFF-Support.",
      stack: ["SaaS", "Localization", "XLIFF"],
      href: "https://github.com/hasanycdg/transly",
    },
    {
      title: "Agency Block CLI",
      description:
        "Node.js CLI für Agentur-Workflows zum Import wiederverwendbarer WordPress-Komponenten aus einem Monorepo.",
      stack: ["Node.js", "CLI", "WordPress"],
      href: "https://github.com/florianmatthiashasan/agency-block",
    },
    {
      title: "Codebase Complexity Visualizer (CCV)",
      description: "Local-first Desktop App zur Analyse von Hotspots und Abhängigkeitszyklen.",
      stack: ["Rust", "Tauri", "TypeScript", "SQLite"],
      href: "https://github.com/hasanycdg/Codebase-Complexity-Visualizer-CCV",
    },
    {
      title: "Weather Application",
      description: "Web-App für Echtzeit-Wettervisualisierung mit API-getriebenem Backend.",
      stack: ["Java", "Spring Boot", "PostgreSQL"],
      href: "https://github.com/hasanycdg/github_projekt",
    },
  ],
  publications: [
    {
      year: "2025",
      title: "Guess the Age of Photos",
      description:
        "Interaktives Thesis-Projekt und Research-Pipeline zur Altersschatzung historischer Bilder.",
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
    topbarSubtitle: "Engineering Betriebssystem",
    openPalette: "Cmd+K",
    languageSwitcher: "Sprache",
    layerLabel: "Ebene",

    overviewLayerTitle: "Systemüberblick",
    currentLocation: "Aktueller Standort",
    relocation: "Umzug",
    viewSystems: "Systeme ansehen",
    downloadCv: "CV herunterladen",
    contact: "Kontakt",

    systemsLayerTitle: "Ausgerollte Systeme",
    systemsTitle: "Produktive Module mit sichtbarer technischer Architektur",
    systemsCopy:
      "Jedes Modul zeigt Problem, Implementierungspfad und produktiven Einfluss. Hover und Inspektion für tiefere Ebenen.",
    moduleLabel: "modul",
    statusLabels: {
      production: "Produktion",
      scaling: "Skalierung",
      delivered: "Geliefert",
    },
    layerMap: "Ebenenkarte",
    layerMapValue: "Interface -> Logik -> Auslieferung -> Betrieb",
    inspectInternals: "Architektur-Internals inspizieren",
    hideInternals: "Architektur-Internals ausblenden",
    stackLabel: "Stack",
    impactLabel: "Wirkungsprotokoll",

    timelineLayerTitle: "Umsetzungs-Timeline",
    timelineTitle: "Deployment-Log von Erfahrung und Umsetzung",
    timelineCopy:
      "Als operatives Protokoll strukturiert, um den Weg vom Internship zur Lead-Verantwortung sichtbar zu machen.",

    matrixLayerTitle: "Kompetenz-Matrix",
    matrixTitle: "Interaktive Kompetenz-Matrix über den Engineering-Lifecycle",
    matrixCopy:
      "Zeilen stehen für Kompetenzbereiche, Spalten für die Phasen Umsetzen, Optimieren, Ausrollen und Betreiben.",
    matrixDomain: "Bereich",

    aboutLayerTitle: "Operator Profil",
    aboutTitle: "Bodenstandige Umsetzung mit technischer Verantwortung",
    aboutCopy:
      "Ich arbeite direkt an realen Kundensystemen in produktiven Umgebungen und übernehme Verantwortung für Implementierung, Architekturentscheidungen, Kommunikation und langfristige Wartbarkeit. Ich ziehe im August 2026 nach Zürich und suche aktiv Software-Engineering-Rollen in der Schweiz.",
    additionalSystems: "Weitere Systeme",
    publications: "Publikationen",
    openLink: "Öffnen",
    readLink: "Lesen",

    contactLayerTitle: "Kontakt-Endpoint",
    readyToConnect: "Bereit für den Austausch?",
    contactTitle: "Offen für Software Engineer / Fullstack Rollen in Zürich",
    contactCopy:
      "Wenn euer Team ernsthafte Produkte baut und einen Fullstack Engineer sucht, der produktive Systeme liefern und verantworten kann, bin ich für Interviews und technische Gespräche verfügbar.",
    email: "E-Mail",
    linkedin: "LinkedIn",
    linkedinMeta: "Professionelles Profil",
    github: "GitHub",
    githubMeta: "Projekte und Repositories",
    cv: "CV",
    cvMeta: "PDF herunterladen",

    footerBuiltWith: "Gebaut mit Next.js / TypeScript / Tailwind / Framer Motion",
    floatingCommand: "Befehlspalette",
    terminalChannel: "command.run",
  },
  palette: {
    ariaLabel: "Befehlspalette",
    placeholder: "Befehle oder Bereiche suchen",
    noMatch: "Kein passender Befehl gefunden.",
    jumpPrefix: "Springe zu",
    downloadCv: "CV herunterladen",
    openLinkedin: "LinkedIn öffnen",
    openGithub: "GitHub öffnen",
    externalHint: "Extern",
  },
  boot: {
    initMessage: "Engineering Command Center wird initialisiert...",
    steps: [
      "[01] Module werden geladen",
      "[02] Architekturgraph wird verbunden",
      "[03] Umsetzungs-Timeline wird synchronisiert",
      "[04] Bereit für Recruiter-Review",
    ],
  },
  diagram: {
    title: "Live Architekturgraph",
    online: "online",
    nodes: {
      frontend: "Frontend",
      backend: "Backend APIs",
      ai: "AI / RAG",
      wordpress: "WordPress",
      cloud: "Cloud",
      performance: "Performance",
    },
  },
};

export const defaultLocale: Locale = "en";

export const portfolioByLocale: Record<Locale, PortfolioContent> = {
  en: enContent,
  de: deContent,
};
