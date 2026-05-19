"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { defaultLocale, portfolioByLocale, type Locale } from "@/lib/portfolio-data";
import { ContactForm } from "./contact-form";
import { GithubIcon, LinkedinIcon } from "./brand-icons";

function classNames(...items: Array<string | false | null | undefined>) {
  return items.filter(Boolean).join(" ");
}

/* ── word-by-word reveal for the hero headline ─────────────────────────── */

const wordVariants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      duration: 0.95,
      delay: 0.18 + i * 0.045,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function HeroHeadline({
  segments,
  reduceMotion,
}: {
  segments: Array<{ text: string; emphasis?: boolean }>;
  reduceMotion: boolean;
}) {
  if (reduceMotion) {
    return (
      <h1 className="hero-headline">
        {segments.map((segment, index) =>
          segment.emphasis ? (
            <em key={index}>{segment.text}</em>
          ) : (
            <span key={index}>{segment.text}</span>
          ),
        )}
      </h1>
    );
  }

  let wordIndex = 0;
  return (
    <h1 className="hero-headline" aria-label={segments.map((s) => s.text).join("")}>
      {segments.map((segment, segIndex) => {
        const words = segment.text.split(/(\s+)/);
        return (
          <span key={segIndex} className={segment.emphasis ? "italic-segment" : undefined}>
            {words.map((word, wIdx) => {
              if (/^\s+$/.test(word)) return <span key={`s-${segIndex}-${wIdx}`}>{word}</span>;
              const currentIndex = wordIndex++;
              const inner = segment.emphasis ? <em>{word}</em> : word;
              return (
                <span key={`w-${segIndex}-${wIdx}`} className="word" aria-hidden>
                  <motion.span
                    className="word-inner"
                    custom={currentIndex}
                    initial="hidden"
                    animate="visible"
                    variants={wordVariants}
                  >
                    {inner}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

/* ── generic fade-up reveal on scroll ──────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ── main component ────────────────────────────────────────────────────── */

export function PortfolioPage() {
  const reduceMotion = useReducedMotion();
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const content = useMemo(() => portfolioByLocale[locale], [locale]);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [portraitOpen, setPortraitOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-locale");
    if (stored === "en" || stored === "de") setLocale(stored);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setPortraitOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setCursor({ x: event.clientX, y: event.clientY });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduceMotion]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const inViewProps = reduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.2 },
        variants: fadeUp,
      };

  return (
    <>
      <a className="skip-link" href="#main">
        {content.ui.skipToMain}
      </a>

      {!reduceMotion ? (
        <div
          aria-hidden
          className="cursor-glow"
          style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0) translate(-50%, -50%)` }}
        />
      ) : null}

      <header className="topbar" data-scrolled={scrolled}>
        <div className="shell topbar-inner">
          <a href="#home" className="brand" aria-label={content.profile.name}>
            Hasan Yücedag
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a href="#services" className="nav-link">
              {content.ui.navServices}
            </a>
            <a href="#work" className="nav-link">
              {content.ui.navWork}
            </a>
            <a href="#about" className="nav-link">
              {content.ui.navAbout}
            </a>
            <a href="#contact" className="nav-link">
              {content.ui.navContact}
            </a>
          </nav>

          <div className="nav-actions">
            <div className="lang-toggle" aria-label={content.ui.languageSwitcher}>
              {(["de", "en"] as const).map((option, idx) => (
                <span key={option}>
                  {idx > 0 ? <span className="lang-sep">/</span> : null}
                  <button
                    type="button"
                    onClick={() => setLocale(option)}
                    data-active={locale === option}
                    aria-pressed={locale === option}
                  >
                    {option}
                  </button>
                </span>
              ))}
            </div>

            <button
              type="button"
              className="menu-button"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? content.ui.closeMenu : content.ui.openMenu}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="menu-button-bar" />
              <span className="menu-button-bar" />
              <span className="menu-button-bar" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {content.sections
              .filter((s) => s.id !== "home")
              .map((section) => (
                <a key={section.id} href={`#${section.id}`} onClick={() => setMenuOpen(false)}>
                  {section.label}
                </a>
              ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main id="main">
        {/* HERO */}
        <section id="home" className="shell hero">
          <HeroHeadline
            segments={content.ui.heroHeadlineSegments}
            reduceMotion={Boolean(reduceMotion)}
          />

          <motion.div
            className="hero-meta"
            initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="hero-meta-text">{content.ui.heroSubcopy}</p>
            <div className="hero-cta-row">
              <a href="#work" className="btn btn-primary">
                {content.ui.heroPrimaryCta}
                <ArrowDownRight size={15} />
              </a>
              <a href="#contact" className="btn-text">
                {content.ui.heroSecondaryCta}
              </a>
            </div>
          </motion.div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section section-tint">
          <div className="shell">
            <motion.div className="section-head" {...inViewProps}>
              <span className="eyebrow">{content.ui.servicesEyebrow}</span>
              <h2 className="section-head-title">{content.ui.servicesTitle}</h2>
            </motion.div>

            <motion.div className="service-list" {...inViewProps}>
              {content.services.map((service, index) => (
                <a
                  key={service.id}
                  href={service.caseStudyId ? `#${service.caseStudyId}` : "#work"}
                  className="service-row"
                  aria-label={`${service.title} — ${content.ui.serviceMore}`}
                >
                  <span className="service-num">0{index + 1}</span>
                  <div className="service-content">
                    <h3 className="service-title">{service.title}</h3>
                    <div>
                      <p className="service-copy">{service.copy}</p>
                      <div className="service-stack-row">
                        {service.stack.map((tech) => (
                          <span key={tech} className="tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight size={22} className="service-arrow" aria-hidden />
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="section">
          <div className="shell">
            <motion.div className="section-head" {...inViewProps}>
              <span className="eyebrow">{content.ui.workEyebrow}</span>
              <h2 className="section-head-title">{content.ui.workTitle}</h2>
            </motion.div>

            <div className="case-list">
              {content.cases.map((caseStudy, index) => (
                <motion.article
                  key={caseStudy.id}
                  id={caseStudy.id}
                  className="case-entry"
                  {...inViewProps}
                >
                  <div className="case-meta-col">
                    <span className="case-num">
                      {String(index + 1).padStart(2, "0")} / {String(content.cases.length).padStart(2, "0")}
                    </span>
                    <h3 className="case-title">{caseStudy.title}</h3>
                    <p className="case-context">{caseStudy.context}</p>
                    <span className="case-status">
                      <span className="case-status-dot" data-status={caseStudy.status} aria-hidden />
                      {content.ui.statusLabels[caseStudy.status]}
                    </span>
                    <p className="case-stack-line">
                      <span className="eyebrow-num">{content.ui.caseStack}</span>
                      {caseStudy.stack.join(" · ")}
                    </p>
                  </div>

                  <div className="case-body">
                    <div>
                      <p className="case-block-label">{content.ui.caseProblem}</p>
                      <p className="case-block-text">{caseStudy.problem}</p>
                    </div>
                    <div>
                      <p className="case-block-label">{content.ui.caseSolution}</p>
                      <p className="case-block-text">{caseStudy.solution}</p>
                    </div>
                    <div>
                      <p className="case-block-label">{content.ui.caseResults}</p>
                      <ul className="case-results">
                        {caseStudy.results.map((result) => (
                          <li key={result}>{result}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section section-tint">
          <div className="shell">
            <motion.div className="section-head" {...inViewProps}>
              <span className="eyebrow">{content.ui.aboutEyebrow}</span>
              <h2 className="section-head-title">{content.ui.aboutTitle}</h2>
            </motion.div>

            <motion.div className="about-grid" {...inViewProps}>
              <button
                type="button"
                className="about-photo-wrap"
                onClick={() => setPortraitOpen(true)}
                aria-label={locale === "de" ? "Porträt vergrößern" : "Enlarge portrait"}
              >
                <div className="about-photo-img" style={{ position: "relative", width: "100%", height: "100%" }}>
                  <Image
                    src="/images/hasan-yucedag.jpeg"
                    alt={content.profile.name}
                    fill
                    sizes="(max-width: 768px) 80vw, 380px"
                    className="object-cover object-[center_18%]"
                  />
                </div>
              </button>

              <div className="about-text">
                {content.ui.aboutBody.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <div className="about-education">
                  <p className="about-education-label">{content.ui.educationLabel}</p>
                  <ul className="education-list">
                    {content.education.map((entry) => (
                      <li key={`${entry.degree}-${entry.school}`} className="education-item">
                        <span>
                          <span className="education-degree">{entry.degree}</span>
                          <span className="education-school">· {entry.school}</span>
                        </span>
                        {entry.period ? <span className="education-meta">{entry.period}</span> : <span />}
                        {entry.note ? <p className="education-note">{entry.note}</p> : null}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="about-links">
                  <a href={content.profile.linkedin} target="_blank" rel="noreferrer" className="btn-text">
                    <LinkedinIcon size={14} /> LinkedIn
                  </a>
                  <a href={content.profile.github} target="_blank" rel="noreferrer" className="btn-text">
                    <GithubIcon size={14} /> GitHub
                  </a>
                  <a href={`mailto:${content.profile.email}`} className="btn-text">
                    {content.profile.email}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section">
          <div className="shell">
            <motion.div className="section-head" {...inViewProps}>
              <span className="eyebrow">{content.ui.experienceEyebrow}</span>
              <h2 className="section-head-title">{content.ui.experienceTitle}</h2>
            </motion.div>

            <motion.div className="timeline" {...inViewProps}>
              {content.timeline.map((entry) => (
                <article key={`${entry.period}-${entry.role}`} className="timeline-entry">
                  <span className="timeline-period">{entry.period}</span>
                  <div>
                    <h3 className="timeline-role">{entry.role}</h3>
                    <p className="timeline-org">{entry.org}</p>
                    <ul className="timeline-logs">
                      {entry.logs.map((log) => (
                        <li key={log}>— {log}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section section-tint">
          <div className="shell">
            <motion.div className="section-head" {...inViewProps}>
              <span className="eyebrow">{content.ui.skillsEyebrow}</span>
              <h2 className="section-head-title">{content.ui.skillsTitle}</h2>
            </motion.div>

            <motion.div className="skills-grid" {...inViewProps}>
              {content.skills.map((group) => (
                <div key={group.title}>
                  <p className="skill-group-label">{group.title}</p>
                  <ul className="skill-items">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ARCHIVE */}
        <section id="archive" className="section">
          <div className="shell">
            <motion.div className="section-head" {...inViewProps}>
              <span className="eyebrow">{content.ui.archiveEyebrow}</span>
              <h2 className="section-head-title">{content.ui.archiveTitle}</h2>
            </motion.div>

            <motion.div className="archive-grid" {...inViewProps}>
              <div>
                <h3 className="archive-block-head">
                  <span>{content.ui.additionalProjects}</span>
                  <a href={content.profile.github} target="_blank" rel="noreferrer" className="link-underline">
                    GitHub ↗
                  </a>
                </h3>
                <ul className="archive-list">
                  {content.archiveProjects.map((project) => (
                    <li key={project.title} className="archive-item">
                      <div className="archive-item-row">
                        <p className="archive-item-title">{project.title}</p>
                        {project.href ? (
                          <a href={project.href} target="_blank" rel="noreferrer" className="archive-item-link">
                            {content.ui.openLink} ↗
                          </a>
                        ) : null}
                      </div>
                      <p className="archive-item-desc">{project.description}</p>
                      <p className="archive-item-stack">{project.stack.join(" · ")}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="archive-block-head">
                  <span>{content.ui.publications}</span>
                </h3>
                <ul className="archive-list">
                  {content.publications.map((paper) => (
                    <li key={`${paper.year}-${paper.title}`} className="archive-item">
                      <div className="archive-item-row">
                        <p className="archive-item-title">
                          {paper.year} — {paper.title}
                        </p>
                        <a
                          href={paper.href}
                          target={paper.href.startsWith("http") ? "_blank" : undefined}
                          rel={paper.href.startsWith("http") ? "noreferrer" : undefined}
                          className="archive-item-link"
                        >
                          {content.ui.readLink} ↗
                        </a>
                      </div>
                      <p className="archive-item-desc">{paper.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section section-tint">
          <div className="shell">
            <motion.div className="section-head" {...inViewProps}>
              <span className="eyebrow">{content.ui.contactEyebrow}</span>
            </motion.div>

            <motion.div className="contact-block" {...inViewProps}>
              <div>
                <h2 className="contact-headline">{content.ui.contactTitle}</h2>
                <p className="contact-copy">{content.ui.contactCopy}</p>

                <dl className="contact-channels">
                  <a href={`mailto:${content.profile.email}`} className="contact-channel">
                    <dt className="contact-channel-key">{content.ui.contactChannelEmail}</dt>
                    <dd className="contact-channel-val" style={{ margin: 0 }}>
                      {content.profile.email}
                    </dd>
                  </a>
                  <a
                    href={content.profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-channel"
                  >
                    <dt className="contact-channel-key">{content.ui.contactChannelLinkedin}</dt>
                    <dd className="contact-channel-val" style={{ margin: 0 }}>
                      hasan-yuecedag ↗
                    </dd>
                  </a>
                  <a
                    href={content.profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-channel"
                  >
                    <dt className="contact-channel-key">{content.ui.contactChannelGithub}</dt>
                    <dd className="contact-channel-val" style={{ margin: 0 }}>
                      @hasanycdg ↗
                    </dd>
                  </a>
                  <a
                    href={content.profile.githubWork}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-channel"
                  >
                    <dt className="contact-channel-key">{content.ui.contactChannelGithubWork}</dt>
                    <dd className="contact-channel-val" style={{ margin: 0 }}>
                      @florianmatthiashasan ↗
                    </dd>
                  </a>
                  <a href={content.profile.cvPath} download className="contact-channel">
                    <dt className="contact-channel-key">{content.ui.contactChannelCv}</dt>
                    <dd className="contact-channel-val" style={{ margin: 0 }}>
                      PDF ↓
                    </dd>
                  </a>
                  <div className="contact-channel" style={{ cursor: "default" }}>
                    <dt className="contact-channel-key">{content.ui.contactChannelLocation}</dt>
                    <dd className="contact-channel-val" style={{ margin: 0 }}>
                      {content.profile.location}
                    </dd>
                  </div>
                </dl>
              </div>

              <ContactForm ui={content.ui} locale={locale} />
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer-grid">
          <div className="footer-meta">
            <p>
              © {new Date().getFullYear()} {content.ui.footerName}
            </p>
            <p>{content.ui.footerLocation}</p>
            <p>{content.ui.footerStack}</p>
          </div>
          <div className="footer-links">
            <a href="#home" className="footer-link link-underline">
              {content.ui.footerBackToTop} ↑
            </a>
            <a href={`mailto:${content.profile.email}`} className="footer-link link-underline">
              {content.profile.email}
            </a>
            <a
              href={content.profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="footer-link link-underline"
            >
              LinkedIn
            </a>
            <a
              href={content.profile.github}
              target="_blank"
              rel="noreferrer"
              className="footer-link link-underline"
            >
              GitHub
            </a>
            <a
              href={content.profile.githubWork}
              target="_blank"
              rel="noreferrer"
              className="footer-link link-underline"
            >
              {content.ui.contactChannelGithubWork} ↗
            </a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {portraitOpen ? (
          <motion.div
            className="portrait-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPortraitOpen(false)}
          >
            <motion.div
              className="portrait-frame"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              style={{ position: "relative" }}
            >
              <Image
                src="/images/hasan-yucedag.jpeg"
                alt={content.profile.name}
                fill
                priority
                className="object-cover object-[center_18%]"
                sizes="(max-width: 640px) 92vw, 480px"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
