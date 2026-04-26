"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Command,
  Download,
  ExternalLink,
  Globe,
  Mail,
  Terminal,
  User,
} from "lucide-react";
import {
  defaultLocale,
  portfolioByLocale,
  type Locale,
  type MatrixColumn,
} from "@/lib/portfolio-data";
import { AnimatedCounter } from "./animated-counter";
import { BootSequence } from "./boot-sequence";
import { CommandPalette } from "./command-palette";
import { SystemDiagram } from "./system-diagram";

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const heroReveal = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function classNames(...items: Array<string | false | null | undefined>) {
  return items.filter(Boolean).join(" ");
}

function ArchitectureFlow({
  steps,
  moduleId,
  ariaLabel,
}: {
  steps: string[];
  moduleId: string;
  ariaLabel: string;
}) {
  const reduceMotion = useReducedMotion();
  const nodes = steps.length;
  const progressPoints = steps.map((_, index) =>
    nodes <= 1 ? 0 : Number(((index * 100) / (nodes - 1)).toFixed(2)),
  );

  return (
    <div className="arch-diagram" role="presentation" aria-label={ariaLabel}>
      <svg className="arch-svg" viewBox="0 0 100 14" preserveAspectRatio="none" aria-hidden>
        {progressPoints.slice(0, -1).map((point, index) => (
          <line
            key={`${moduleId}-line-${index}`}
            x1={point}
            y1={7}
            x2={progressPoints[index + 1]}
            y2={7}
            stroke="rgba(118, 165, 149, 0.52)"
            strokeWidth="0.46"
            strokeDasharray="2.1 1.8"
          />
        ))}
        {!reduceMotion ? (
          <motion.circle
            r="1.05"
            fill="rgba(135, 230, 194, 0.95)"
            animate={{
              cx: progressPoints,
              cy: Array.from({ length: progressPoints.length }, () => 7),
              opacity: [0.16, 1, 0.3, 1, 0.16],
            }}
            transition={{
              duration: 2.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ) : null}
      </svg>
      <div className="arch-track">
        {steps.map((item, index) => (
          <div key={`${moduleId}-${item}`} className="arch-step">
            <span className="arch-bullet" aria-hidden />
            <span>{item}</span>
            {index < steps.length - 1 ? <ArrowRight size={13} className="text-[#7f9690]" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PortfolioPage() {
  const reduceMotion = useReducedMotion();
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const content = useMemo(() => portfolioByLocale[locale], [locale]);

  const [bootVisible, setBootVisible] = useState(!reduceMotion);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [portraitOpen, setPortraitOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(portfolioByLocale[defaultLocale].sections[0].id);
  const [expandedSystem, setExpandedSystem] = useState(
    portfolioByLocale[defaultLocale].systems[0]?.id ?? "",
  );
  const [typedCommand, setTypedCommand] = useState(reduceMotion ? content.commandPreview : "");
  const [hoverRow, setHoverRow] = useState<number | null>(null);
  const [hoverCol, setHoverCol] = useState<number | null>(null);

  const { scrollYProgress } = useScroll();
  const topProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.22,
  });

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-locale");
    if (stored === "en" || stored === "de") {
      setLocale(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (reduceMotion) {
      setTypedCommand(content.commandPreview);
      return;
    }

    setTypedCommand("");
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTypedCommand(content.commandPreview.slice(0, index));
      if (index >= content.commandPreview.length) {
        window.clearInterval(interval);
      }
    }, 28);

    return () => window.clearInterval(interval);
  }, [reduceMotion, content.commandPreview]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((previous) => !previous);
      }
      if (event.key === "Escape") {
        setPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const setPointer = (event: PointerEvent) => {
      root.style.setProperty("--spotlight-x", `${event.clientX}px`);
      root.style.setProperty("--spotlight-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", setPointer, { passive: true });
    return () => window.removeEventListener("pointermove", setPointer);
  }, []);

  useEffect(() => {
    const getSectionNodes = () =>
      content.sections
        .map((section) => document.getElementById(section.id))
        .filter((node): node is HTMLElement => node instanceof HTMLElement);

    let sectionNodes = getSectionNodes();
    let frame = 0;

    const updateActiveSection = () => {
      if (sectionNodes.length === 0) return;

      const triggerY = window.innerHeight * 0.34;
      let currentId = sectionNodes[0].id;

      for (const node of sectionNodes) {
        const top = node.getBoundingClientRect().top;
        if (top <= triggerY) {
          currentId = node.id;
        } else {
          break;
        }
      }

      setActiveSection((previous) => (previous === currentId ? previous : currentId));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveSection();
      });
    };

    const onResize = () => {
      sectionNodes = getSectionNodes();
      updateActiveSection();
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [content.sections]);

  const closePalette = useCallback(() => setPaletteOpen(false), []);

  const sectionIndex = useMemo(
    () => Object.fromEntries(content.sections.map((section, index) => [section.id, index + 1])),
    [content.sections],
  );
  const activeMeta = content.sections.find((section) => section.id === activeSection) ?? content.sections[0];

  return (
    <>
      <AnimatePresence>
        {bootVisible ? (
          <BootSequence
            onComplete={() => setBootVisible(false)}
            reducedMotion={Boolean(reduceMotion)}
            copy={content.boot}
          />
        ) : null}
      </AnimatePresence>

      <div className="spotlight-overlay" aria-hidden />

      <a className="skip-link" href="#main-content">
        {content.ui.skipToMain}
      </a>

      <motion.span
        aria-hidden
        className="fixed left-0 top-0 z-[125] h-[2px] w-full origin-left bg-[linear-gradient(90deg,#46a785,#9adfc8)]"
        style={{ scaleX: topProgress }}
      />

      <nav aria-label="Section progress" className="section-rail hidden xl:flex">
        {content.sections.map((section) => {
          const active = activeSection === section.id;

          return (
            <a key={section.id} href={`#${section.id}`} className="group flex items-center gap-2.5">
              <span
                className={classNames(
                  "h-2.5 w-2.5 rounded-full border transition-colors",
                  active
                    ? "border-[#9fddc8] bg-[#6fc4a8]"
                    : "border-[#38514d] bg-[#0d1413] group-hover:bg-[#1a2a27]",
                )}
              />
              <span
                className={classNames(
                  "font-mono text-[0.64rem] uppercase tracking-[0.18em] transition-colors",
                  active ? "text-[#b5d5cb]" : "text-[#6f8c84] group-hover:text-[#9cbcb3]",
                )}
              >
                {section.short}
              </span>
            </a>
          );
        })}
      </nav>

      <div className="active-layer-hud" aria-live="polite">
        <span>{activeMeta.short}</span>
        <p>{activeMeta.label}</p>
      </div>

      <div className="cc-shell pb-20">
        <header className="sticky top-4 z-[95] pt-4">
          <div className="cc-topbar">
            <div className="flex items-center gap-3">
              <span className="rounded border border-[#2b3f3c] bg-[#0e1514] px-2.5 py-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[#90aea5]">
                Hasan OS
              </span>
              <button
                type="button"
                onClick={() => setPortraitOpen(true)}
                className="group inline-flex items-center gap-2 rounded-lg border border-[#2b403c] bg-[#0d1514] p-1.5 transition-colors hover:bg-[#14201f]"
                aria-label={locale === "de" ? "Porträt von Hasan anzeigen" : "Show portrait of Hasan"}
              >
                <span className="relative h-8 w-8 overflow-hidden rounded-md border border-[#3c5952]">
                  <Image
                    src="/images/hasan-yucedag.jpeg"
                    alt="Portrait of Hasan Yücedag"
                    fill
                    className="object-cover object-[center_18%]"
                    sizes="32px"
                  />
                </span>
                <span className="hidden text-xs text-[#9bb7af] sm:block">
                  {locale === "de" ? "Image of Hasan" : "Image of Hasan"}
                </span>
              </button>
              <p className="hidden text-sm text-[#d9e7e2] md:block">{content.ui.topbarSubtitle}</p>
            </div>

            <div className="hidden items-center gap-5 md:flex">
              {content.sections.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm text-[#8ca7a0] transition-colors hover:text-[#d6e5e0]"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div
                aria-label={content.ui.languageSwitcher}
                className="inline-flex items-center rounded-lg border border-[#2c413d] bg-[#0f1716] p-1"
              >
                {(["en", "de"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLocale(option)}
                    className={classNames(
                      "rounded-md px-2.5 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] transition-colors",
                      locale === option
                        ? "bg-[#1f3430] text-[#d7ece5]"
                        : "text-[#86a39b] hover:bg-[#162221]",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-[#2c413d] bg-[#0f1716] px-3 py-2 text-sm text-[#d3e1dd] transition-colors hover:bg-[#15211f]"
              >
                <Command size={14} />
                <span>{content.ui.openPalette}</span>
              </button>
            </div>
          </div>
        </header>

        <main id="main-content" className="space-y-6 pt-6 sm:space-y-8 sm:pt-8">
          <motion.section
            id="overview"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.14 }}
            className="cc-layer-dark"
          >
            <motion.span
              aria-hidden
              className="section-scan"
              initial={reduceMotion ? undefined : { scaleX: 0, opacity: 0.35 }}
              whileInView={reduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="layer-head">
              <p className="layer-index">
                {content.ui.layerLabel} 0{sectionIndex.overview}
              </p>
              <p className="layer-title">{content.ui.overviewLayerTitle}</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
              <div>
                <motion.p custom={0} variants={heroReveal} className="eyebrow-dark">
                  {content.profile.name} / {content.profile.role}
                </motion.p>
                <motion.h1 custom={1} variants={heroReveal} className="hero-title mt-4">
                  {content.profile.headline}
                </motion.h1>
                <motion.p custom={2} variants={heroReveal} className="hero-copy mt-6">
                  {content.profile.subcopy}
                </motion.p>

                <motion.div custom={3} variants={heroReveal} className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                  <div className="info-chip">
                    <p className="chip-label">{content.ui.currentLocation}</p>
                    <p className="chip-value">{content.profile.location}</p>
                  </div>
                  <div className="info-chip">
                    <p className="chip-label">{content.ui.relocation}</p>
                    <p className="chip-value">{content.profile.relocation}</p>
                  </div>
                </motion.div>

                <motion.div custom={4} variants={heroReveal} className="mt-7 flex flex-wrap gap-3">
                  <a className="cc-button-primary" href="#systems">
                    {content.ui.viewSystems}
                    <ArrowRight size={15} />
                  </a>
                  <a className="cc-button-secondary" href={content.profile.cvPath} download>
                    <Download size={15} />
                    {content.ui.downloadCv}
                  </a>
                  <a className="cc-button-secondary" href="#contact">
                    <Mail size={15} />
                    {content.ui.contact}
                  </a>
                </motion.div>

                <motion.div custom={5} variants={heroReveal} className="terminal-line mt-8">
                  <div className="terminal-head">
                    <Terminal size={14} />
                    <span>{content.ui.terminalChannel}</span>
                  </div>
                  <p className="terminal-command">
                    <span className="text-[#85d0b4]">$</span> {typedCommand}
                    <motion.span
                      aria-hidden
                      className="ml-1 inline-block h-4 w-[7px] bg-[#82c6ad] align-middle"
                      animate={reduceMotion ? undefined : { opacity: [1, 0.2, 1] }}
                      transition={reduceMotion ? undefined : { duration: 0.92, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
              >
                <SystemDiagram copy={content.diagram} />
              </motion.div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {content.metrics.map((metric, index) => (
                <motion.article
                  key={metric.label}
                  className="metric-module"
                  initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.44, delay: 0.08 + index * 0.05 }}
                >
                  <p className="metric-label">{metric.label}</p>
                  <p className="metric-value">
                    <AnimatedCounter from={metric.from} to={metric.to} suffix={metric.suffix} prefix={metric.prefix} />
                  </p>
                  <p className="metric-note">{metric.note}</p>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="systems"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="cc-layer-light"
          >
            <motion.span
              aria-hidden
              className="section-scan"
              initial={reduceMotion ? undefined : { scaleX: 0, opacity: 0.35 }}
              whileInView={reduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="layer-head">
              <p className="layer-index">
                {content.ui.layerLabel} 0{sectionIndex.systems}
              </p>
              <p className="layer-title">{content.ui.systemsLayerTitle}</p>
            </div>

            <div className="section-header-grid">
              <h2 className="section-title-light">{content.ui.systemsTitle}</h2>
              <p className="section-copy-light">{content.ui.systemsCopy}</p>
            </div>

            <div className="mt-8 space-y-4">
              {content.systems.map((system, index) => {
                const isOpen = expandedSystem === system.id;

                return (
                  <motion.article
                    key={system.id}
                    className="module-shell group"
                    initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    whileHover={reduceMotion ? undefined : { y: -3 }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-2">
                        <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#6a7c76]">
                          {content.ui.moduleLabel} {index + 1}
                        </p>
                        <h3 className="module-title">{system.name}</h3>
                      </div>

                      <span
                        className={classNames(
                          "status-pill",
                          system.status === "production" && "status-prod",
                          system.status === "scaling" && "status-scaling",
                          system.status === "delivered" && "status-delivered",
                        )}
                      >
                        {content.ui.statusLabels[system.status]}
                      </span>
                    </div>

                    <p className="module-summary">{system.summary}</p>

                    <div className="module-hover-depth" aria-hidden>
                      <span>{content.ui.layerMap}</span>
                      <p>{content.ui.layerMapValue}</p>
                    </div>

                    <ArchitectureFlow
                      steps={system.architecture}
                      moduleId={system.id}
                      ariaLabel={`${system.name} architecture diagram`}
                    />

                    <button
                      type="button"
                      onClick={() => setExpandedSystem(isOpen ? "" : system.id)}
                      className="module-toggle"
                      aria-expanded={isOpen}
                      aria-controls={`${system.id}-details`}
                    >
                      <span>{isOpen ? content.ui.hideInternals : content.ui.inspectInternals}</span>
                      <ChevronDown size={16} className={classNames("transition-transform", isOpen && "rotate-180")} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={`${system.id}-details`}
                          key="details"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="module-detail-grid">
                            <div>
                              <p className="detail-title">{content.ui.stackLabel}</p>
                              <ul className="detail-list">
                                {system.stack.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="detail-title">{content.ui.impactLabel}</p>
                              <ul className="detail-list">
                                {system.impact.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            id="timeline"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="cc-layer-dark"
          >
            <motion.span
              aria-hidden
              className="section-scan"
              initial={reduceMotion ? undefined : { scaleX: 0, opacity: 0.35 }}
              whileInView={reduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="layer-head">
              <p className="layer-index">
                {content.ui.layerLabel} 0{sectionIndex.timeline}
              </p>
              <p className="layer-title">{content.ui.timelineLayerTitle}</p>
            </div>

            <div className="section-header-grid">
              <h2 className="section-title-dark">{content.ui.timelineTitle}</h2>
              <p className="section-copy-dark">{content.ui.timelineCopy}</p>
            </div>

            <div className="terminal-log-grid mt-8">
              {content.timeline.map((entry, index) => (
                <motion.article
                  key={`${entry.period}-${entry.role}`}
                  className="log-module"
                  initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.48, delay: index * 0.06 }}
                >
                  {!reduceMotion ? (
                    <motion.span
                      aria-hidden
                      className="log-scan"
                      animate={{ x: ["-30%", "140%"], opacity: [0, 0.75, 0] }}
                      transition={{
                        duration: 2.4,
                        delay: index * 0.2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                  ) : null}
                  <header className="log-headline">
                    <p className="log-period">[{entry.period}]</p>
                    <p className="log-role">{entry.role}</p>
                    <p className="log-org">@ {entry.org}</p>
                  </header>

                  <ul className="log-lines">
                    {entry.logs.map((line) => (
                      <li key={line}>
                        <span className="text-[#8fd0b8]">&gt;</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="matrix"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="cc-layer-light"
          >
            <motion.span
              aria-hidden
              className="section-scan"
              initial={reduceMotion ? undefined : { scaleX: 0, opacity: 0.35 }}
              whileInView={reduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="layer-head">
              <p className="layer-index">
                {content.ui.layerLabel} 0{sectionIndex.matrix}
              </p>
              <p className="layer-title">{content.ui.matrixLayerTitle}</p>
            </div>

            <div className="section-header-grid">
              <h2 className="section-title-light">{content.ui.matrixTitle}</h2>
              <p className="section-copy-light">{content.ui.matrixCopy}</p>
            </div>

            <div className="matrix-table-wrapper mt-8 hidden lg:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="matrix-head sticky left-0 z-10 bg-[#0f1716]">{content.ui.matrixDomain}</th>
                    {content.matrixColumns.map((column, colIndex) => (
                      <th
                        key={column}
                        className={classNames("matrix-head", hoverCol === colIndex && "matrix-head-active")}
                        onMouseEnter={() => setHoverCol(colIndex)}
                        onMouseLeave={() => setHoverCol(null)}
                      >
                        {content.matrixColumnLabels[column]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.capabilityMatrix.map((row, rowIndex) => (
                    <tr key={row.area}>
                      <th
                        scope="row"
                        className={classNames(
                          "matrix-row-title sticky left-0 z-10 bg-[#0b1211]",
                          hoverRow === rowIndex && "matrix-row-title-active",
                        )}
                        onMouseEnter={() => setHoverRow(rowIndex)}
                        onMouseLeave={() => setHoverRow(null)}
                      >
                        {row.area}
                      </th>
                      {content.matrixColumns.map((column, colIndex) => (
                        <td
                          key={`${row.area}-${column}`}
                          className={classNames(
                            "matrix-cell",
                            hoverRow === rowIndex && "matrix-cell-highlight",
                            hoverCol === colIndex && "matrix-cell-highlight",
                          )}
                          onMouseEnter={() => {
                            setHoverRow(rowIndex);
                            setHoverCol(colIndex);
                          }}
                          onMouseLeave={() => {
                            setHoverRow(null);
                            setHoverCol(null);
                          }}
                        >
                          {row.cells[column as MatrixColumn].map((item) => (
                            <span key={item} className="matrix-chip">
                              {item}
                            </span>
                          ))}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 space-y-3 lg:hidden">
              {content.capabilityMatrix.map((row) => (
                <article key={row.area} className="mobile-matrix-module">
                  <h3 className="text-base font-semibold text-[#d5e6e1]">{row.area}</h3>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {content.matrixColumns.map((column) => (
                      <div key={`${row.area}-${column}`} className="mobile-cell">
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[#8ea9a1]">
                          {content.matrixColumnLabels[column]}
                        </p>
                        <ul className="mt-1 space-y-1 text-sm text-[#bfd4cd]">
                          {row.cells[column].map((entry) => (
                            <li key={entry}>{entry}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="about"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="cc-layer-dark"
          >
            <motion.span
              aria-hidden
              className="section-scan"
              initial={reduceMotion ? undefined : { scaleX: 0, opacity: 0.35 }}
              whileInView={reduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="layer-head">
              <p className="layer-index">
                {content.ui.layerLabel} 0{sectionIndex.about}
              </p>
              <p className="layer-title">{content.ui.aboutLayerTitle}</p>
            </div>

            <div className="section-header-grid">
              <h2 className="section-title-dark">{content.ui.aboutTitle}</h2>
              <p className="section-copy-dark">{content.ui.aboutCopy}</p>
            </div>

            <div className="mt-8 grid gap-4 xl:grid-cols-2">
              <article className="archive-module">
                <div className="archive-head">
                  <h3>{content.ui.additionalSystems}</h3>
                  <a href={content.profile.github} target="_blank" rel="noreferrer">
                    {content.ui.github}
                    <ExternalLink size={14} />
                  </a>
                </div>

                <ul className="archive-list">
                  {content.archiveProjects.map((project) => (
                    <li key={project.title}>
                      <div>
                        <p className="archive-title">{project.title}</p>
                        <p className="archive-desc">{project.description}</p>
                      </div>
                      <div className="archive-meta">
                        <p>{project.stack.join(" / ")}</p>
                        {project.href ? (
                          <a href={project.href} target="_blank" rel="noreferrer">
                            {content.ui.openLink}
                            <ExternalLink size={12} />
                          </a>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="archive-module">
                <div className="archive-head">
                  <h3>{content.ui.publications}</h3>
                </div>

                <ul className="archive-list">
                  {content.publications.map((paper) => (
                    <li key={`${paper.year}-${paper.title}`}>
                      <div>
                        <p className="archive-title">
                          {paper.year} - {paper.title}
                        </p>
                        <p className="archive-desc">{paper.description}</p>
                      </div>
                      <div className="archive-meta">
                        <a
                          href={paper.href}
                          target={paper.href.startsWith("http") ? "_blank" : undefined}
                          rel={paper.href.startsWith("http") ? "noreferrer" : undefined}
                        >
                          {content.ui.readLink}
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </motion.section>

          <motion.section
            id="contact"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="cc-layer-light"
          >
            <motion.span
              aria-hidden
              className="section-scan"
              initial={reduceMotion ? undefined : { scaleX: 0, opacity: 0.35 }}
              whileInView={reduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="layer-head">
              <p className="layer-index">
                {content.ui.layerLabel} 0{sectionIndex.contact}
              </p>
              <p className="layer-title">{content.ui.contactLayerTitle}</p>
            </div>

            <div className="endpoint-shell">
              <div>
                <p className="eyebrow-light">{content.ui.readyToConnect}</p>
                <h2 className="section-title-light mt-3">{content.ui.contactTitle}</h2>
                <p className="section-copy-light mt-4 max-w-2xl">{content.ui.contactCopy}</p>
              </div>

              <div className="endpoint-grid">
                <a href={`mailto:${content.profile.email}`} className="endpoint-item">
                  <Mail size={16} />
                  <div>
                    <p>{content.ui.email}</p>
                    <span>{content.profile.email}</span>
                  </div>
                </a>
                <a href={content.profile.linkedin} target="_blank" rel="noreferrer" className="endpoint-item">
                  <User size={16} />
                  <div>
                    <p>{content.ui.linkedin}</p>
                    <span>{content.ui.linkedinMeta}</span>
                  </div>
                </a>
                <a href={content.profile.github} target="_blank" rel="noreferrer" className="endpoint-item">
                  <Globe size={16} />
                  <div>
                    <p>{content.ui.github}</p>
                    <span>{content.ui.githubMeta}</span>
                  </div>
                </a>
                <a href={content.profile.cvPath} download className="endpoint-item">
                  <Download size={16} />
                  <div>
                    <p>{content.ui.cv}</p>
                    <span>{content.ui.cvMeta}</span>
                  </div>
                </a>
              </div>
            </div>
          </motion.section>
        </main>

        <footer className="pt-8">
          <div className="rounded-xl border border-[#253533] bg-[#0a1010] px-4 py-4 text-xs text-[#86a098] sm:flex sm:items-center sm:justify-between sm:px-5">
            <p>
              {content.profile.name} - {content.profile.role}
            </p>
            <p className="mt-2 font-mono uppercase tracking-[0.14em] sm:mt-0">{content.ui.footerBuiltWith}</p>
          </div>
        </footer>
      </div>

      <button type="button" onClick={() => setPaletteOpen(true)} className="floating-command">
        <Command size={15} />
        {content.ui.floatingCommand}
      </button>

      <CommandPalette
        open={paletteOpen}
        onClose={closePalette}
        sections={content.sections}
        cvPath={content.profile.cvPath}
        linkedin={content.profile.linkedin}
        github={content.profile.github}
        copy={content.palette}
      />

      <AnimatePresence>
        {portraitOpen ? (
          <motion.div
            className="fixed inset-0 z-[140] flex items-center justify-center bg-black/72 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPortraitOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-[#344743] bg-[#0b1211] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.95)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/hasan-yucedag.jpeg"
                  alt="Portrait of Hasan Yücedag"
                  fill
                  priority
                  className="object-cover object-[center_18%]"
                  sizes="(max-width: 640px) 92vw, 520px"
                />
              </div>
              <div className="flex items-center justify-between border-t border-[#243835] px-4 py-3">
                <p className="text-sm text-[#d1e3de]">{content.profile.name}</p>
                <button
                  type="button"
                  onClick={() => setPortraitOpen(false)}
                  className="rounded-md border border-[#34514b] px-2.5 py-1 text-xs text-[#9ec0b6] transition-colors hover:bg-[#13201d]"
                >
                  {locale === "de" ? "Schließen" : "Close"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
