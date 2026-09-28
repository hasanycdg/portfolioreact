"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { defaultLocale, portfolioByLocale, type Locale } from "@/lib/portfolio-data";
import { ContactForm } from "./contact-form";
import { GithubIcon, LinkedinIcon } from "./brand-icons";

const easing = [0.22, 1, 0.36, 1] as const;

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg className={`icon-arrow${down ? " icon-arrow-down" : ""}`} aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4 16 16 4M7 4h9v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const copy = {
  de: {
    navWork: "Projekte", navServices: "Leistungen", navAbout: "Über mich", contact: "Projekt besprechen", menu: "Menü", close: "Schließen",
    heroStrong: "2 Live-Websites. 3 veröffentlichte Apps.", heroLine: "Von Innsbruck in Produktion.", heroSub: "Für Selbstständige, lokale Unternehmen und Produktteams, die wirklich veröffentlichen wollen.",
    heroCaseLabel: "Live-Projekt", heroCaseRole: "Konzeption · UX/UI · Frontend", heroCaseLink: "Case ansehen",
    viewWork: "Projekte ansehen", availability: "Verfügbar für ausgewählte Projekte", casesCta: "Ähnliches Projekt besprechen", aboutCta: "Projekt kurz einordnen",
    workLabel: "Ausgewählte Projekte", workTitle: "Zwei Websites im echten Betrieb.", workText: "Keine Konzeptbilder und keine fiktiven Marken. Diese Projekte sind live, werden von echten Kunden genutzt und zeigen, was ich von der Idee bis zum Launch umsetzen kann.",
    visit: "Live-Website öffnen", role: "Meine Arbeit", serhatRole: "Konzeption · UX/UI · Frontend-Entwicklung", hagiRole: "Webdesign · Entwicklung · Local SEO",
    serhatDesc: "Ein atmosphärischer Webauftritt für einen Hochzeitsfotografen und Videografen aus Tirol – mit Video-Hero, Portfolio, Leistungen, Social Proof und direkter Anfrageführung.",
    hagiDesc: "Eine schnelle, suchmaschinenoptimierte Restaurant-Website mit Speisekarte, Blog, Standortinformationen, Kontakt und datenschutzkonformer Einbindung externer Dienste.",
    productsLabel: "Produkte & Tools", productsTitle: "Software, die echte Arbeit abnimmt.", clientWorkLabel: "Kundenarbeit", ownProductsLabel: "Eigenprodukte",
    aiTitle: "AI SEO Assistant", aiText: "WordPress-Plugin für Alt-Texte, Metadaten und interne Verlinkung – direkt im redaktionellen Workflow.",
    clarityTitle: "Clarity für iOS", clarityText: "Eine veröffentlichte iOS-App, die Menschen mit kurzen, strukturierten Prompts aus Gedankenschleifen hilft.",
    silaYoluTitle: "SilaYolu", silaYoluText: "Der smarte Reisebegleiter für Autofahrten zwischen Europa und Türkiye – mit Grenzinfos, Routenkosten und Reise-Checklisten.",
    regiereTitle: "Regiere Deutschland", regiereText: "Eine satirische Politik-Simulation, in der Wahlen, Koalitionen und politische Entscheidungen den Weg ins Kanzleramt bestimmen.",
    ccvTitle: "Codebase Visualizer", ccvText: "Local-first Desktop-App zur Analyse von Hotspots, Abhängigkeiten und Komplexität in großen Repositories.",
    learnMore: "Projekt öffnen", servicesLabel: "Leistungen", servicesTitle: "Drei Leistungen. Drei konkrete Ergebnisse.",
    servicesText: "Ich verbinde Produktdenken, visuelles Design und Software Engineering. So bleibt die Idee vom ersten Wireframe bis zum produktiven Code konsistent.", serviceDeliverableLabel: "Ergebnis",
    serviceItems: [
      { number: "01", title: "Websites & Plattformen", description: "Eine veröffentlichte Website mit CMS, responsivem Frontend und dokumentiertem Deployment.", deliverable: "Live-Website" },
      { number: "02", title: "UI/UX & Designsysteme", description: "Ein klickbarer Prototyp plus Komponentenbibliothek für konsistente Produktoberflächen.", deliverable: "Figma-Prototyp + Komponentenbibliothek" },
      { number: "03", title: "Fullstack & AI", description: "Eine produktive Web-App mit API, Datenmodell und gezielter AI-Funktion.", deliverable: "Deploybare Anwendung" },
    ],
    operationsLabel: "Betrieb & Verantwortung", operationsTitle: "Nach dem Launch beginnt die eigentliche Arbeit.",
    operationsText: "Ich kümmere mich um die technische Basis, die im Alltag oft unsichtbar bleibt – aber darüber entscheidet, ob eine Website sicher, messbar, schnell und dauerhaft zuverlässig arbeitet.",
    operationItems: [
      { number: "01", kind: "privacy", kicker: "Kontrolle statt Checkbox", title: "Datenschutz & Cookie-Management", description: "Consent-Lösungen werden technisch sauber nach deinen rechtlichen Vorgaben umgesetzt. Externe Dienste laden erst dann, wenn die passende Einwilligung vorliegt.", points: ["CMP & Consent-Banner", "Google Consent Mode v2", "Prüfung externer Dienste"] },
      { number: "02", kind: "tracking", kicker: "Verstehen, was funktioniert", title: "Tracking & Analytics", description: "Ein nachvollziehbares Messkonzept zeigt, welche Inhalte, Kampagnen und Anfragen wirklich funktionieren – ohne wahllos Daten zu sammeln.", points: ["GA4, Matomo & Tag Manager", "Events und Conversions", "Consent-basierte Datenerfassung"] },
      { number: "03", kind: "hosting", kicker: "Stabile technische Basis", title: "Hosting & Server", description: "Vom DNS-Eintrag bis zum produktiven Deployment: Die Infrastruktur wird passend zur Website eingerichtet, abgesichert und dokumentiert.", points: ["SSL, DNS & Deployments", "Backups und Monitoring", "CDN- und Cache-Setup"] },
      { number: "04", kind: "performance", kicker: "Geschwindigkeit, die man spürt", title: "Performance & Core Web Vitals", description: "Ich finde echte Engpässe und optimiere Bilder, Code, Fonts und Caching gezielt – besonders für mobile Geräte und langsame Verbindungen.", points: ["Lighthouse-Analyse", "Bild- und Code-Optimierung", "Messbarer Vorher-nachher-Vergleich"] },
      { number: "05", kind: "care", kicker: "Ein verlässlicher Ansprechpartner", title: "Technische Betreuung", description: "Websites brauchen Updates, Kontrolle und schnelle Hilfe, wenn etwas hakt. Ich begleite den laufenden Betrieb und halte das System gesund.", points: ["Updates und Wartung", "Fehleranalyse und Support", "Kleine Weiterentwicklungen"] },
    ],
    aboutLabel: "Über mich", aboutTitle: "Ein Entwickler, der das ganze Produkt sieht.",
    aboutText: "Ich bin Hasan Yücedag, Software Engineer und Lead Fullstack Developer aus Innsbruck. Mein Schwerpunkt liegt auf digitalen Produkten, bei denen Gestaltung, Nutzerführung und technische Qualität gemeinsam funktionieren müssen.",
    aboutTextTwo: "Ich begleite Projekte vom ersten Gespräch über Design und Architektur bis zum Launch – mit direkter Kommunikation und Verantwortung für das Ergebnis.",
    facts: [["Rolle", "Lead Fullstack Developer"], ["Ausbildung", "BSc Informatik · Universität Innsbruck"], ["Standort", "Innsbruck · Remote"]],
    contactLabel: "Projektanfrage", contactTitle: "Was möchtest du als Nächstes bauen?", contactText: "Schick mir ein paar Zeilen zu deinem Projekt, deinem Ziel und dem gewünschten Zeitrahmen. Ich antworte üblicherweise innerhalb von 24 Stunden.",
    footer: "Websites · Software · AI",
  },
  en: {
    navWork: "Projects", navServices: "Services", navAbout: "About", contact: "Discuss a project", menu: "Menu", close: "Close",
    heroStrong: "2 live websites. 3 published apps.", heroLine: "Built in Innsbruck. Shipped to production.", heroSub: "For independents, local businesses, and product teams ready to ship.",
    heroCaseLabel: "Live project", heroCaseRole: "Concept · UX/UI · Frontend", heroCaseLink: "View case",
    viewWork: "View projects", availability: "Available for selected projects", casesCta: "Discuss a similar project", aboutCta: "Outline your project",
    workLabel: "Selected projects", workTitle: "Two websites in active use.", workText: "No concept art and no fictional brands. These projects are live, used by real customers, and show what I can deliver from the first idea to launch.",
    visit: "Open live website", role: "My work", serhatRole: "Concept · UX/UI · Frontend development", hagiRole: "Web design · Development · Local SEO",
    serhatDesc: "An atmospheric web presence for a wedding photographer and filmmaker in Tyrol, featuring a video hero, portfolio, services, social proof, and a clear inquiry flow.",
    hagiDesc: "A fast, search-optimized restaurant website with menu, blog, location details, contact flow, and privacy-compliant external services.",
    productsLabel: "Products & tools", productsTitle: "Software that removes real work.", clientWorkLabel: "Client work", ownProductsLabel: "Independent products",
    aiTitle: "AI SEO Assistant", aiText: "A WordPress plugin for alt text, metadata, and internal links, built directly into the editorial workflow.",
    clarityTitle: "Clarity for iOS", clarityText: "A published iOS app that helps people break out of overthinking loops with short, structured prompts.",
    silaYoluTitle: "SilaYolu", silaYoluText: "A smart travel companion for road trips between Europe and Türkiye, with border updates, route costs, and travel checklists.",
    regiereTitle: "Regiere Deutschland", regiereText: "A satirical political simulation where elections, coalitions, and policy decisions shape the path to the chancellery.",
    ccvTitle: "Codebase Visualizer", ccvText: "A local-first desktop app for analyzing hotspots, dependencies, and complexity in large repositories.",
    learnMore: "Open project", servicesLabel: "Services", servicesTitle: "Three services. Three concrete outcomes.",
    servicesText: "I combine product thinking, visual design, and software engineering, keeping the idea consistent from the first wireframe to production code.", serviceDeliverableLabel: "Outcome",
    serviceItems: [
      { number: "01", title: "Websites & platforms", description: "A published website with CMS, responsive frontend, and documented deployment.", deliverable: "Live website" },
      { number: "02", title: "UI/UX & design systems", description: "A clickable prototype plus component library for consistent product interfaces.", deliverable: "Figma prototype + component library" },
      { number: "03", title: "Fullstack & AI", description: "A production web app with API, data model, and focused AI feature.", deliverable: "Deployable application" },
    ],
    operationsLabel: "Operations & responsibility", operationsTitle: "The real work starts after launch.",
    operationsText: "I handle the technical foundation that often stays invisible in daily use but determines whether a website remains private, measurable, fast, and dependable.",
    operationItems: [
      { number: "01", kind: "privacy", kicker: "Control beyond the checkbox", title: "Privacy & cookie management", description: "Consent solutions are implemented cleanly according to your legal requirements. External services only load after the appropriate consent is given.", points: ["CMP and consent banner", "Google Consent Mode v2", "Third-party service audit"] },
      { number: "02", kind: "tracking", kicker: "Understand what works", title: "Tracking & analytics", description: "A transparent measurement plan shows which content, campaigns, and inquiries perform without collecting data indiscriminately.", points: ["GA4, Matomo, and Tag Manager", "Events and conversions", "Consent-based data collection"] },
      { number: "03", kind: "hosting", kicker: "A stable technical foundation", title: "Hosting & servers", description: "From DNS records to production deployment, I set up, secure, and document infrastructure that fits the website.", points: ["SSL, DNS, and deployments", "Backups and monitoring", "CDN and cache setup"] },
      { number: "04", kind: "performance", kicker: "Speed people can feel", title: "Performance & Core Web Vitals", description: "I identify real bottlenecks and optimize images, code, fonts, and caching, with particular attention to mobile devices and slower connections.", points: ["Lighthouse analysis", "Image and code optimization", "Measured before-and-after results"] },
      { number: "05", kind: "care", kicker: "A reliable technical partner", title: "Ongoing technical care", description: "Websites need updates, oversight, and quick help when something breaks. I support day-to-day operations and keep the system healthy.", points: ["Updates and maintenance", "Troubleshooting and support", "Continuous improvements"] },
    ],
    aboutLabel: "About", aboutTitle: "An engineer who sees the entire product.",
    aboutText: "I'm Hasan Yücedag, a Software Engineer and Lead Fullstack Developer based in Innsbruck. I focus on digital products where visual design, user experience, and technical quality need to work together.",
    aboutTextTwo: "I guide projects from the first conversation through design and architecture to launch, with direct communication and responsibility for the outcome.",
    facts: [["Role", "Lead Fullstack Developer"], ["Education", "BSc Computer Science · University of Innsbruck"], ["Location", "Innsbruck · Remote"]],
    contactLabel: "Project inquiry", contactTitle: "What would you like to build next?", contactText: "Send me a few lines about your project, goal, and desired timeline. I usually respond within 24 hours.",
    footer: "Websites · Software · AI",
  },
} as const;

type ClientProjectProps = {
  title: string; category: string; description: string; role: string; href: string; image: string; alt: string; priority?: boolean;
};

function ClientProject({ title, category, description, role, href, image, alt, priority = false }: ClientProjectProps) {
  return (
    <motion.article className="client-project" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.75, ease: easing }}>
      <a className="project-shot" href={href} target="_blank" rel="noreferrer" aria-label={`${title} — ${href}`}>
        <div className="browser-bar"><span /><span /><span /><b>{href.replace("https://", "")}</b></div>
        <Image src={image} alt={alt} fill priority={priority} sizes="(max-width: 768px) 100vw, 1280px" className="project-image" />
        <span className="project-open"><Arrow /></span>
      </a>
      <div className="project-details">
        <div><p className="eyebrow">{category}</p><h3>{title}</h3></div>
        <p>{description}</p>
        <div className="project-role"><span>{role}</span><a href={href} target="_blank" rel="noreferrer">{href.replace("https://", "")}<Arrow /></a></div>
      </div>
    </motion.article>
  );
}

function ProductGraphic({ kind }: { kind: "ai" | "code" }) {
  if (kind === "ai") return <div className="product-graphic graphic-ai" aria-hidden="true"><div className="ai-sidebar"><span /><span /><span /></div><div className="ai-main"><b>SEO Assistant</b><div className="ai-field" /><div className="ai-field short" /><div className="ai-suggestion"><span>Suggested metadata</span><i /></div></div></div>;
  return <div className="product-graphic graphic-code" aria-hidden="true"><div className="code-map"><span className="node n1" /><span className="node n2" /><span className="node n3" /><span className="node n4" /><svg viewBox="0 0 400 220"><path d="M70 65 C145 10 205 80 320 45M70 65 C150 140 230 100 335 170M320 45 C280 100 280 130 335 170" /></svg></div><div className="code-score"><span>Complexity</span><strong>7.4</strong></div></div>;
}

const appScreenshots = {
  clarity: ["/images/apps/clarity-01.jpg", "/images/apps/clarity-02.jpg"],
  silayolu: ["/images/apps/silayolu-01.jpg", "/images/apps/silayolu-02.jpg"],
  regiere: ["/images/apps/regiere-deutschland-01.jpg", "/images/apps/regiere-deutschland-02.jpg"],
} as const;

function AppScreenshots({ app }: { app: keyof typeof appScreenshots }) {
  return <div className={`product-graphic app-screenshots app-screenshots-${app}`} aria-hidden="true">{appScreenshots[app].map((src, index) => <Image key={src} src={src} alt="" width={555} height={1200} sizes="(max-width: 700px) 42vw, 210px" className={`app-screenshot app-screenshot-${index + 1}`} />)}</div>;
}

type ServiceKind = "privacy" | "tracking" | "hosting" | "performance" | "care";

function ServiceMark({ kind }: { kind: ServiceKind }) {
  if (kind === "privacy") return <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="10" width="34" height="28" rx="8" /><path d="M14 19h20M14 29h9" /><circle cx="29" cy="29" r="4" /></svg>;
  if (kind === "tracking") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 36 18 25l8 5 14-18" /><circle cx="8" cy="36" r="3" /><circle cx="18" cy="25" r="3" /><circle cx="26" cy="30" r="3" /><circle cx="40" cy="12" r="3" /></svg>;
  if (kind === "hosting") return <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="8" width="34" height="13" rx="4" /><rect x="7" y="27" width="34" height="13" rx="4" /><path d="M14 14.5h12M14 33.5h12" /><circle cx="34" cy="14.5" r="1.5" /><circle cx="34" cy="33.5" r="1.5" /></svg>;
  if (kind === "performance") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 34a17 17 0 1 1 32 0M24 31l9-12" /><circle cx="24" cy="31" r="4" /></svg>;
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M38 18a15 15 0 1 0 1 9" /><path d="m34 10 4 8 7-5M16 24l5 5 11-12" /></svg>;
}

export function PortfolioPage() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const content = useMemo(() => portfolioByLocale[locale], [locale]);
  const t = copy[locale];

  useEffect(() => { const saved = window.localStorage.getItem("portfolio-locale"); if (saved === "de" || saved === "en") setLocale(saved); }, []);
  useEffect(() => { window.localStorage.setItem("portfolio-locale", locale); document.documentElement.lang = locale; }, [locale]);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 20); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);

  const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.7, ease: easing } };

  return (
    <>
      <a className="skip-link" href="#main">{content.ui.skipToMain}</a>
      <header className="site-header" data-scrolled={scrolled}>
        <div className="container header-row">
          <a className="brand" href="#home">hasan<span>yücedag</span></a>
          <nav className="desktop-nav" aria-label="Primary"><a href="#work">{t.navWork}</a><a href="#services">{t.navServices}</a><a href="#about">{t.navAbout}</a></nav>
          <div className="header-actions">
            <div className="language" role="group" aria-label={content.ui.languageSwitcher}>{(["de", "en"] as const).map((item) => <button type="button" key={item} data-active={locale === item} aria-pressed={locale === item} onClick={() => setLocale(item)}>{item.toUpperCase()}</button>)}</div>
            <a className="contact-pill" href="#contact"><span className="mini-portrait"><Image src="/images/hasan-yucedag.jpeg" alt="" fill sizes="36px" /></span>{t.contact}</a>
            <button className="menu-button" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? t.close : t.menu}</button>
          </div>
        </div>
      </header>

      <AnimatePresence>{menuOpen && <motion.nav className="mobile-menu" aria-label="Primary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {[{ href: "#work", label: t.navWork }, { href: "#services", label: t.navServices }, { href: "#about", label: t.navAbout }, { href: "#contact", label: t.contact }].map((item, index) => <motion.a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }}><span>0{index + 1}</span>{item.label}</motion.a>)}
      </motion.nav>}</AnimatePresence>

      <main id="main">
        <section id="home" className="hero container">
          <div className="hero-main">
            <motion.div className="hero-copy" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: easing }}>
              <h1><strong>{t.heroStrong}</strong><strong>{t.heroLine}</strong></h1>
              <p className="hero-sub">{t.heroSub}</p>
              <div className="hero-actions"><a className="text-link" href="#work">{t.viewWork}<Arrow down /></a><span className="available"><i />{t.availability}</span></div>
            </motion.div>
            <motion.a className="hero-case" href="https://www.serhatphotographie.com" target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .12, ease: easing }}>
              <div className="hero-case-top"><span>{t.heroCaseLabel}</span><span>serhatphotographie.com <Arrow /></span></div>
              <div className="hero-case-media"><Image src="/images/projects/serhat-photographie.jpg" alt="Serhat Photographie Website" fill priority sizes="(max-width: 700px) 100vw, 45vw" /></div>
              <div className="hero-case-caption"><strong>Serhat Photographie</strong><span>{t.heroCaseRole}</span><b>{t.heroCaseLink}<Arrow /></b></div>
            </motion.a>
          </div>
        </section>

        <section id="work" className="projects-section section-space container">
          <motion.div className="section-heading" {...reveal}><p className="eyebrow">{t.workLabel}</p><h2>{t.workTitle}</h2><p>{t.workText}</p></motion.div>
          <div className="client-projects">
            <ClientProject title="Serhat Photographie" category="Web Experience · 2026" description={t.serhatDesc} role={t.serhatRole} href="https://www.serhatphotographie.com" image="/images/projects/serhat-photographie.jpg" alt="Startseite von Serhat Photographie" priority />
            <ClientProject title="Hagis Pizza & Döner" category="Business Website · 2026" description={t.hagiDesc} role={t.hagiRole} href="https://hagisdöner.at" image="/images/projects/hagis-doener.jpg" alt="Startseite von Hagis Pizza und Döner" />
          </div>
          <motion.div className="section-cta-row" {...reveal}><a className="btn btn-primary" href="#contact">{t.casesCta}<Arrow /></a></motion.div>
        </section>

        <section id="about" className="about-section section-space"><div className="container about-grid">
          <motion.div className="about-photo" {...reveal}><div className="about-photo-media"><Image src="/images/hasan-yucedag.jpeg" alt="Hasan Yücedag" fill sizes="(max-width: 800px) 100vw, 38vw" className="about-photo-image" /></div></motion.div>
          <motion.div className="about-copy" {...reveal}><p className="eyebrow">{t.aboutLabel}</p><h2>{t.aboutTitle}</h2><p className="about-lead">{t.aboutText}</p><p>{t.aboutTextTwo}</p><dl>{t.facts.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl><div className="socials"><a href={content.profile.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon size={16} />LinkedIn</a><a href={content.profile.github} target="_blank" rel="noreferrer"><GithubIcon size={16} />GitHub</a><a href={content.profile.cvPath} download>CV PDF<Arrow /></a></div><a className="about-cta" href="#contact">{t.aboutCta}<Arrow /></a></motion.div>
        </div></section>

        <section id="products" className="products-section section-space"><div className="container">
          <motion.div className="section-heading compact" {...reveal}><p className="eyebrow">{t.productsLabel}</p><h2>{t.productsTitle}</h2></motion.div>
          <div className="product-groups">
            <section className="product-group" aria-labelledby="client-work-title">
              <div className="product-group-heading"><h3 id="client-work-title">{t.clientWorkLabel}</h3><span>01</span></div>
              <div className="product-grid product-grid-client">
                <motion.a href="#contact" className="product-card product-card-wide" {...reveal}><ProductGraphic kind="ai" /><div className="product-info"><span>AI · WordPress</span><h3>{t.aiTitle}</h3><p>{t.aiText}</p><b>{t.learnMore}<Arrow /></b></div></motion.a>
              </div>
            </section>
            <section className="product-group" aria-labelledby="own-products-title">
              <div className="product-group-heading"><h3 id="own-products-title">{t.ownProductsLabel}</h3><span>04</span></div>
              <div className="product-grid product-grid-independent">
                <motion.a href="https://apps.apple.com/us/app/clarity-overthink-helper/id6757189127" target="_blank" rel="noreferrer" className="product-card" {...reveal}><AppScreenshots app="clarity" /><div className="product-info"><span>iOS · Swift</span><h3>{t.clarityTitle}</h3><p>{t.clarityText}</p><b>{t.learnMore}<Arrow /></b></div></motion.a>
                <motion.a href="https://apps.apple.com/de/app/silayolu/id6769356177" target="_blank" rel="noreferrer" className="product-card" {...reveal}><AppScreenshots app="silayolu" /><div className="product-info"><span>iOS · Swift</span><h3>{t.silaYoluTitle}</h3><p>{t.silaYoluText}</p><b>{t.learnMore}<Arrow /></b></div></motion.a>
                <motion.a href="https://apps.apple.com/de/app/regiere-deutschland/id6802046575" target="_blank" rel="noreferrer" className="product-card" {...reveal}><AppScreenshots app="regiere" /><div className="product-info"><span>iOS · Swift</span><h3>{t.regiereTitle}</h3><p>{t.regiereText}</p><b>{t.learnMore}<Arrow /></b></div></motion.a>
                <motion.a href="https://github.com/hasanycdg/Codebase-Complexity-Visualizer-CCV" target="_blank" rel="noreferrer" className="product-card" {...reveal}><ProductGraphic kind="code" /><div className="product-info"><span>Desktop · Rust</span><h3>{t.ccvTitle}</h3><p>{t.ccvText}</p><b>{t.learnMore}<Arrow /></b></div></motion.a>
              </div>
            </section>
          </div>
        </div></section>

        <section id="services" className="services-section section-space container">
          <motion.div className="services-intro" {...reveal}><p className="eyebrow">{t.servicesLabel}</p><div><h2>{t.servicesTitle}</h2><p>{t.servicesText}</p></div></motion.div>
          <div className="service-deliverables">{t.serviceItems.map((item) => <motion.article key={item.number} className="service-deliverable-card" {...reveal}>
            <span className="service-number">{item.number}</span>
            <div className="service-copy"><h3>{item.title}</h3><p>{item.description}</p></div>
            <div className="service-output"><span>{t.serviceDeliverableLabel}</span><strong>{item.deliverable}</strong></div>
          </motion.article>)}</div>
        </section>

        <section id="operations" className="operations-section section-space" aria-labelledby="operations-title"><div className="container">
            <motion.div className="operations-intro" {...reveal}><p className="eyebrow">{t.operationsLabel}</p><div><h3 id="operations-title">{t.operationsTitle}</h3><p>{t.operationsText}</p></div></motion.div>
            <div className="operation-grid">{t.operationItems.map((item) => <motion.article key={item.number} className={`operation-card operation-${item.kind}`} {...reveal}>
              <div className="operation-card-top"><span>{item.number} · {item.kicker}</span><i><ServiceMark kind={item.kind} /></i></div>
              <div className="operation-copy"><h4>{item.title}</h4><p>{item.description}</p></div>
              <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </motion.article>)}</div>
        </div></section>

        <section id="contact" className="contact-section section-space"><div className="container contact-grid">
          <motion.div className="contact-copy" {...reveal}><p className="eyebrow">{t.contactLabel}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p><a href={`mailto:${content.profile.email}`} className="email-link">{content.profile.email}<Arrow /></a></motion.div>
          <motion.div className="form-panel" {...reveal}><ContactForm ui={content.ui} locale={locale} /></motion.div>
        </div></section>
      </main>

      <footer className="footer"><div className="container footer-row"><a className="brand footer-brand" href="#home">hasan<span>yücedag</span></a><p>© {new Date().getFullYear()} · {t.footer}</p><div><a href={content.profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={content.profile.github} target="_blank" rel="noreferrer">GitHub</a></div></div></footer>
    </>
  );
}
