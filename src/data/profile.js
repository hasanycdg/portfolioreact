export const profile = {
  firstName: "Hasan",
  lastName: "Yücedag",
  fullName: "Hasan Yücedag",
  role: "Full Stack Developer",
  baseLocation: "Innsbruck, Austria",
  relocation: "Relocating to Zurich from August 2026",
  phone: "+43 660 2499111",
  email: "yucedagh1@gmail.com",
  linkedin: "https://www.linkedin.com/in/hasan-yuecedag",
  portfolio: "https://hasanyucedagportfolio.vercel.app/",
  summary:
    "Full Stack Developer focused on scalable web applications, AWS cloud infrastructure, and AI-based systems. Experienced in building and maintaining production client projects, especially RAG chatbot systems, API integrations, and custom WordPress solutions across the full lifecycle from technical concept to deployment and ongoing optimization.",
};

export const focusAreas = [
  "Scalable web applications",
  "AWS infrastructure and deployment",
  "RAG chatbot systems",
  "API integrations",
  "Custom WordPress solutions",
];

export const experience = [
  {
    role: "Full Stack Developer",
    company: "florianmatthias",
    period: "08/2025 - Present",
    highlights: [
      "Developing and integrating RAG-based AI chatbot systems for client websites",
      "Building custom WordPress solutions with ACF, custom blocks, plugins, and API integrations",
      "Deploying and managing applications on AWS with EC2, S3, and CloudFront",
    ],
  },
  {
    role: "Software Development Intern",
    company: "Translogica",
    period: "07/2024 - 09/2024",
    highlights: [
      "Implemented and optimized around 20 features to improve performance and usability",
      "Worked with C# and the ABP framework in a production software environment",
      "Supported debugging, testing, and further development of existing systems",
    ],
  },
];

export const education = [
  {
    degree: "B.Sc. Computer Science",
    school: "University of Innsbruck",
    period: "2022 - 2025",
    details: [
      'Thesis graded "Sehr gut"',
      "Focus on software engineering and data-driven applications",
      "Practical projects in web development and databases",
    ],
  },
  {
    degree: "Matura, Natural Sciences & Technology",
    school: "BORG Innsbruck",
    period: "2018 - 2022",
    details: [],
  },
];

export const skillGroups = [
  {
    title: "Frontend & UI",
    items: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Bootstrap", "Plotly"],
  },
  {
    title: "Backend & APIs",
    items: ["Node.js", "PHP", "Python", "Flask", "Java", "Spring Boot", "C#", "API Integrations"],
  },
  {
    title: "AI & Data",
    items: ["RAG Systems", "AI Chatbots", "PostgreSQL", "SQLite", "SQL", "Random Forest", "Neural Networks"],
  },
  {
    title: "WordPress & CMS",
    items: ["WordPress", "ACF", "Custom Blocks", "Plugin Development", "Meta Boxes", "Iframe Embeds"],
  },
  {
    title: "Cloud & Infrastructure",
    items: ["AWS", "EC2", "S3", "CloudFront", "MQTT", "Deployment", "Maintenance"],
  },
  {
    title: "Desktop, Tooling & Workflow",
    items: ["Rust", "Tauri", "CLI Tools", "Monorepo Workflows", "XLIFF", "Localization", "Git"],
  },
];

export const languages = [
  { name: "Kurdish", level: "Native" },
  { name: "Turkish", level: "C1" },
  { name: "German", level: "B2" },
  { name: "English", level: "B2" },
];

export const projectShowcase = [
  {
    title: "Transly",
    description:
      "A SaaS translation platform for translating large volumes of content, including XLIFF files and structured localization data. The product is still in production development and is designed for efficient translation workflows at scale.",
    technologies: ["SaaS", "Translation", "XLIFF", "Localization", "Production"],
    link: "https://github.com/hasanycdg/transly",
    ctaLabel: "View on GitHub",
    accent: "rgba(99, 102, 241, 0.35)",
  },
  {
    title: "RAG Chatbot for WordPress",
    description:
      "A RAG chatbot delivered as a WordPress plugin and also embeddable via iframe for other websites. It is currently used on the Moar Gut Hotel website and is being tested by four additional clients, with very positive feedback so far.",
    technologies: ["RAG", "WordPress Plugin", "AI Chatbot", "Iframe", "Production"],
    link: "https://github.com/florianmatthiashasan/rag-chatbot",
    ctaLabel: "View Project",
    accent: "rgba(139, 92, 246, 0.35)",
  },
  {
    title: "Agency Block CLI",
    description:
      "A Node.js CLI for web agencies that pulls reusable WordPress components, meta boxes, and assets from a private monorepo into the currently open theme. It is used in our agency workflow and significantly reduces setup and implementation time across similar client repositories.",
    technologies: ["Node.js", "CLI", "WordPress", "Monorepo", "Agency Workflow"],
    link: "https://github.com/florianmatthiashasan/agency-block",
    ctaLabel: "View Project",
    accent: "rgba(59, 130, 246, 0.35)",
  },
  {
    title: "Codebase Complexity Visualizer (CCV)",
    description:
      "An open-source, local-first macOS desktop app for understanding repository structure, hotspot risk, and dependency cycles. It helps developers inspect large codebases, identify risky files, and analyze architectural bottlenecks without sending code to the cloud.",
    technologies: ["macOS", "Rust", "Tauri", "TypeScript", "SQLite", "Open Source"],
    link: "https://github.com/hasanycdg/Codebase-Complexity-Visualizer-CCV",
    ctaLabel: "View on GitHub",
    accent: "rgba(168, 85, 247, 0.32)",
  },
  {
    title: "IoT Edge Cloud: Real-Time Processing for Smart Devices",
    description:
      "A school project focused on integrating IoT devices with edge computing and cloud platforms to enable real-time data processing and decision-making.",
    technologies: ["Python", "AWS", "MQTT"],
    accent: "rgba(129, 140, 248, 0.32)",
  },
  {
    title: "Historical Event Timeline",
    description:
      "A school project that visualizes historical events and news data in an interactive web application built with Flask, Plotly, and React.",
    technologies: ["Python", "Flask", "Plotly", "React"],
    accent: "rgba(96, 165, 250, 0.3)",
  },
  {
    title: "Weather Application",
    description: "A web app that visualizes real time weather data.",
    technologies: ["Java", "SpringBoot", "PostgreSQL", "API", "HTML", "CSS"],
    link: "https://github.com/hasanycdg/github_projekt",
    ctaLabel: "View Project",
    accent: "rgba(125, 211, 252, 0.3)",
  },
  {
    title: "Fraud Detection",
    description:
      "Detecting frauds in the transaction dataset with ML models and visualizing the results.",
    technologies: ["Python", "Jupyter", "RandomForest", "Neural Network"],
    link: "https://github.com/luprader/PS_ML_group_project",
    ctaLabel: "View Project",
    accent: "rgba(167, 139, 250, 0.3)",
  },
];

export const publications = [
  {
    year: "2025",
    title: "Guess the Age of Photos",
    description:
      "I designed and coded this interactive web platform for historical image age estimation as part of my bachelor thesis, which was graded 1.0. The work later became a research paper co-authored with my professor and submitted to CIKM, and it led to an invitation to Seoul, South Korea.",
    technologies: ["Python", "Flask", "Bootstrap", "PostgreSQL", "Research"],
    link: "https://www.researchgate.net/publication/392167840_Guess_the_Age_of_Photos_An_Interactive_Web_Platform_for_Historical_Image_Age_Estimation",
    ctaLabel: "Read Paper",
  },
  {
    year: "2024",
    title: "IoT fur autonome Fahrzeuge",
    description:
      "Seminar paper on the application of the Internet of Things in vehicle communication and the role of intelligent infrastructures for autonomous vehicles. Written at the University of Innsbruck in the SE Vertiefungsseminar under the supervision of Prof. Dr. Thomas Fahringer.",
    technologies: [
      "IoT",
      "Connected Vehicles",
      "Smart Infrastructure",
      "Research",
      "Seminar Paper",
    ],
    link: "/Semesterarbeit.pdf",
    ctaLabel: "Read Paper",
  },
];
