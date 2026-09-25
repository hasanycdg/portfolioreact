"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
    heroStrong: "Design, das überzeugt.", heroLine: "Technik, die funktioniert.", heroSub: "Websites und digitale Produkte für Unternehmen, die professionell auftreten und digital wachsen wollen.",
    heroMeta: "Fullstack Development · UI/UX · AI Integration", heroProof: "Konzept, Design und Entwicklung aus einer Hand.",
    viewWork: "Projekte ansehen", availability: "Verfügbar für ausgewählte Projekte",
    workLabel: "Ausgewählte Projekte", workTitle: "Websites, die bereits online arbeiten.", workText: "Keine Konzeptbilder und keine fiktiven Marken. Diese Projekte sind live, werden von echten Kunden genutzt und zeigen, was ich von der Idee bis zum Launch umsetzen kann.",
    visit: "Live-Website öffnen", role: "Meine Arbeit", serhatRole: "Konzeption · UX/UI · Frontend-Entwicklung", hagiRole: "Webdesign · Entwicklung · Local SEO",
    serhatDesc: "Ein atmosphärischer Webauftritt für einen Hochzeitsfotografen und Videografen aus Tirol – mit Video-Hero, Portfolio, Leistungen, Social Proof und direkter Anfrageführung.",
    hagiDesc: "Eine schnelle, suchmaschinenoptimierte Restaurant-Website mit Speisekarte, Blog, Standortinformationen, Kontakt und datenschutzkonformer Einbindung externer Dienste.",
    productsLabel: "Produkte & Tools", productsTitle: "Software, die echte Arbeit abnimmt.",
    aiTitle: "AI SEO Assistant", aiText: "WordPress-Plugin für Alt-Texte, Metadaten und interne Verlinkung – direkt im redaktionellen Workflow.",
    clarityTitle: "Clarity für iOS", clarityText: "Eine veröffentlichte iOS-App, die Menschen mit kurzen, strukturierten Prompts aus Gedankenschleifen hilft.",
    ccvTitle: "Codebase Visualizer", ccvText: "Local-first Desktop-App zur Analyse von Hotspots, Abhängigkeiten und Komplexität in großen Repositories.",
    learnMore: "Projekt öffnen", servicesLabel: "Leistungen", servicesTitle: "Von der ersten Idee bis zum stabilen Produkt.",
    servicesText: "Ich verbinde Produktdenken, visuelles Design und Software Engineering. So bleibt die Idee vom ersten Wireframe bis zum produktiven Code konsistent.",
    serviceItems: [
      ["01", "Websites & Plattformen", "Individuelle Websites, Portale und Webanwendungen, die schnell laden, klar führen und einfach weiterentwickelt werden können."],
      ["02", "UI/UX & Designsysteme", "Klare Interfaces und wiederverwendbare Komponenten, damit ein Produkt über Seiten, Features und Jahre hinweg zusammenhält."],
      ["03", "Fullstack & AI", "Saubere Frontends, belastbare Backends und sinnvolle AI-Integrationen für produktive Anwendungen statt isolierter Demos."],
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
    heroStrong: "Design that convinces.", heroLine: "Technology that performs.", heroSub: "Websites and digital products for companies that want to look professional and grow online.",
    heroMeta: "Fullstack Development · UI/UX · AI Integration", heroProof: "Concept, design, and development from one partner.",
    viewWork: "View projects", availability: "Available for selected projects",
    workLabel: "Selected projects", workTitle: "Websites already doing real work.", workText: "No concept art and no fictional brands. These projects are live, used by real customers, and show what I can deliver from the first idea to launch.",
    visit: "Open live website", role: "My work", serhatRole: "Concept · UX/UI · Frontend development", hagiRole: "Web design · Development · Local SEO",
    serhatDesc: "An atmospheric web presence for a wedding photographer and filmmaker in Tyrol, featuring a video hero, portfolio, services, social proof, and a clear inquiry flow.",
    hagiDesc: "A fast, search-optimized restaurant website with menu, blog, location details, contact flow, and privacy-compliant external services.",
    productsLabel: "Products & tools", productsTitle: "Software that removes real work.",
    aiTitle: "AI SEO Assistant", aiText: "A WordPress plugin for alt text, metadata, and internal links, built directly into the editorial workflow.",
    clarityTitle: "Clarity for iOS", clarityText: "A published iOS app that helps people break out of overthinking loops with short, structured prompts.",
    ccvTitle: "Codebase Visualizer", ccvText: "A local-first desktop app for analyzing hotspots, dependencies, and complexity in large repositories.",
    learnMore: "Open project", servicesLabel: "Services", servicesTitle: "From the first idea to a stable product.",
    servicesText: "I combine product thinking, visual design, and software engineering, keeping the idea consistent from the first wireframe to production code.",
    serviceItems: [
      ["01", "Websites & platforms", "Custom websites, portals, and web applications that load quickly, guide clearly, and remain easy to extend."],
      ["02", "UI/UX & design systems", "Clear interfaces and reusable components that keep a product consistent across pages, features, and years."],
      ["03", "Fullstack & AI", "Clean frontends, reliable backends, and useful AI integrations for production applications rather than isolated demos."],
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
  title: string; category: string; description: string; role: string; href: string; image: string; alt: string;
};

function ClientProject({ title, category, description, role, href, image, alt }: ClientProjectProps) {
  return (
    <motion.article className="client-project" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.75, ease: easing }}>
      <a className="project-shot" href={href} target="_blank" rel="noreferrer" aria-label={`${title} — ${href}`}>
        <div className="browser-bar"><span /><span /><span /><b>{href.replace("https://", "")}</b></div>
        <Image src={image} alt={alt} fill sizes="(max-width: 768px) 100vw, 1280px" className="project-image" />
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

function ProductGraphic({ kind }: { kind: "ai" | "ios" | "code" }) {
  if (kind === "ai") return <div className="product-graphic graphic-ai" aria-hidden="true"><div className="ai-sidebar"><span /><span /><span /></div><div className="ai-main"><b>SEO Assistant</b><div className="ai-field" /><div className="ai-field short" /><div className="ai-suggestion"><span>Suggested metadata</span><i /></div></div></div>;
  if (kind === "ios") return <div className="product-graphic graphic-ios" aria-hidden="true"><div className="phone"><span className="phone-notch" /><p>What is on your mind?</p><div /><div /><button>Continue</button></div></div>;
  return <div className="product-graphic graphic-code" aria-hidden="true"><div className="code-map"><span className="node n1" /><span className="node n2" /><span className="node n3" /><span className="node n4" /><svg viewBox="0 0 400 220"><path d="M70 65 C145 10 205 80 320 45M70 65 C150 140 230 100 335 170M320 45 C280 100 280 130 335 170" /></svg></div><div className="code-score"><span>Complexity</span><strong>7.4</strong></div></div>;
}

export function PortfolioPage() {
  const reduceMotion = useReducedMotion();
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const content = useMemo(() => portfolioByLocale[locale], [locale]);
  const t = copy[locale];

  useEffect(() => { const saved = window.localStorage.getItem("portfolio-locale"); if (saved === "de" || saved === "en") setLocale(saved); }, []);
  useEffect(() => { window.localStorage.setItem("portfolio-locale", locale); document.documentElement.lang = locale; }, [locale]);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 20); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);

  const reveal = reduceMotion ? {} : { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.7, ease: easing } };

  return (
    <>
      <a className="skip-link" href="#main">{content.ui.skipToMain}</a>
      <header className="site-header" data-scrolled={scrolled}>
        <div className="container header-row">
          <a className="brand" href="#home">hasan<span>yücedag</span></a>
          <nav className="desktop-nav" aria-label="Primary"><a href="#work">{t.navWork}</a><a href="#services">{t.navServices}</a><a href="#about">{t.navAbout}</a></nav>
          <div className="header-actions">
            <div className="language">{(["de", "en"] as const).map((item) => <button type="button" key={item} data-active={locale === item} onClick={() => setLocale(item)}>{item.toUpperCase()}</button>)}</div>
            <a className="contact-pill" href="#contact"><span className="mini-portrait"><Image src="/images/hasan-yucedag.jpeg" alt="" fill sizes="36px" /></span>{t.contact}</a>
            <button className="menu-button" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? t.close : t.menu}</button>
          </div>
        </div>
      </header>

      <AnimatePresence>{menuOpen && <motion.nav className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {[{ href: "#work", label: t.navWork }, { href: "#services", label: t.navServices }, { href: "#about", label: t.navAbout }, { href: "#contact", label: t.contact }].map((item, index) => <motion.a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }}><span>0{index + 1}</span>{item.label}</motion.a>)}
      </motion.nav>}</AnimatePresence>

      <main id="main">
        <section id="home" className="hero container">
          <motion.div className="hero-copy" initial={reduceMotion ? undefined : { opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: easing }}>
            <h1><strong>{t.heroStrong}</strong><strong>{t.heroLine}</strong><span>{t.heroSub}</span></h1>
            <p className="hero-meta">{t.heroMeta}</p>
          </motion.div>
          <div className="hero-bottom">
            <p>{t.heroProof}</p>
            <div><a className="text-link" href="#work">{t.viewWork}<Arrow down /></a><span className="available"><i />{t.availability}</span></div>
          </div>
        </section>

        <section id="work" className="projects-section section-space container">
          <motion.div className="section-heading" {...reveal}><p className="eyebrow">{t.workLabel}</p><h2>{t.workTitle}</h2><p>{t.workText}</p></motion.div>
          <div className="client-projects">
            <ClientProject title="Serhat Photographie" category="Web Experience · 2026" description={t.serhatDesc} role={t.serhatRole} href="https://www.serhatphotographie.com" image="/images/projects/serhat-photographie.jpg" alt="Startseite von Serhat Photographie" />
            <ClientProject title="Hagis Pizza & Döner" category="Business Website · 2026" description={t.hagiDesc} role={t.hagiRole} href="https://hagisdöner.at" image="/images/projects/hagis-doener.jpg" alt="Startseite von Hagis Pizza und Döner" />
          </div>
        </section>

        <section className="products-section section-space"><div className="container">
          <motion.div className="section-heading compact" {...reveal}><p className="eyebrow">{t.productsLabel}</p><h2>{t.productsTitle}</h2></motion.div>
          <div className="product-grid">
            <motion.a href="#contact" className="product-card product-card-wide" {...reveal}><ProductGraphic kind="ai" /><div className="product-info"><span>AI · WordPress</span><h3>{t.aiTitle}</h3><p>{t.aiText}</p><b>{t.learnMore}<Arrow /></b></div></motion.a>
            <motion.a href="https://apps.apple.com/us/app/clarity-overthink-helper/id6757189127" target="_blank" rel="noreferrer" className="product-card" {...reveal}><ProductGraphic kind="ios" /><div className="product-info"><span>iOS · Swift</span><h3>{t.clarityTitle}</h3><p>{t.clarityText}</p><b>{t.learnMore}<Arrow /></b></div></motion.a>
            <motion.a href="https://github.com/hasanycdg/Codebase-Complexity-Visualizer-CCV" target="_blank" rel="noreferrer" className="product-card" {...reveal}><ProductGraphic kind="code" /><div className="product-info"><span>Desktop · Rust</span><h3>{t.ccvTitle}</h3><p>{t.ccvText}</p><b>{t.learnMore}<Arrow /></b></div></motion.a>
          </div>
        </div></section>

        <section id="services" className="services-section section-space container">
          <motion.div className="services-intro" {...reveal}><p className="eyebrow">{t.servicesLabel}</p><div><h2>{t.servicesTitle}</h2><p>{t.servicesText}</p></div></motion.div>
          <div className="service-list">{t.serviceItems.map(([number, title, description]) => <motion.article key={number} className="service-item" {...reveal}><span>{number}</span><h3>{title}</h3><p>{description}</p></motion.article>)}</div>
        </section>

        <section id="about" className="about-section section-space"><div className="container about-grid">
          <motion.div className="about-photo" {...reveal}><div className="about-photo-media"><Image src="/images/hasan-yucedag.jpeg" alt="Hasan Yücedag" fill sizes="(max-width: 800px) 100vw, 38vw" className="about-photo-image" /></div></motion.div>
          <motion.div className="about-copy" {...reveal}><p className="eyebrow">{t.aboutLabel}</p><h2>{t.aboutTitle}</h2><p className="about-lead">{t.aboutText}</p><p>{t.aboutTextTwo}</p><dl>{t.facts.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl><div className="socials"><a href={content.profile.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon size={16} />LinkedIn</a><a href={content.profile.github} target="_blank" rel="noreferrer"><GithubIcon size={16} />GitHub</a><a href={content.profile.cvPath} download>CV PDF<Arrow /></a></div></motion.div>
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
