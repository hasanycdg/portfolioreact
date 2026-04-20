import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LuArrowUpRight,
  LuGithub,
  LuLinkedin,
  LuMail,
  LuPhone,
  LuTerminal,
  LuX,
} from "react-icons/lu";
import {
  education,
  experience,
  focusAreas,
  profile,
  projectShowcase,
  publications,
  skillGroups,
} from "../data/profile";

const navItems = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Publications" },
  { id: "experience", label: "Experience" },
];

const terminalPrompt = `${profile.firstName.toLowerCase()}@portfolio`;

const GlassPortfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [activeProject, setActiveProject] = useState(null);
  const [ambientAccent, setAmbientAccent] = useState("rgba(139, 92, 246, 0.22)");
  const [timelineActive, setTimelineActive] = useState({});
  const [heroMode, setHeroMode] = useState("nonTechnical");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([]);
  const timelineRefs = useRef([]);
  const terminalBodyRef = useRef(null);
  const terminalInputRef = useRef(null);
  const terminalEntryCountRef = useRef(1);

  const timelineEntries = useMemo(
    () => [
      ...experience.map((item) => ({
        type: "experience",
        title: item.role,
        subtitle: item.company,
        period: item.period,
        details: item.highlights,
      })),
      ...education.map((item) => ({
        type: "education",
        title: item.degree,
        subtitle: item.school,
        period: item.period,
        details: item.details,
      })),
    ],
    []
  );

  const stackPreview = useMemo(
    () =>
      skillGroups
        .flatMap((group) => group.items)
        .slice(0, 14)
        .filter((item, index, arr) => arr.indexOf(item) === index),
    []
  );

  const markdownFiles = useMemo(
    () => ({
      "readme.md": [
        "# Terminal Portfolio",
        "",
        "Use 'ls' to list files and 'cat <file>' to inspect sections.",
        "Example: cat projects.md",
        "",
        "Available files:",
        "- home.md",
        "- projects.md",
        "- publications.md",
        "- experience.md",
        "- skills.md",
        "- contact.md",
      ],
      "home.md": [
        "# Home",
        "",
        `- Name: ${profile.fullName}`,
        `- Role: ${profile.role}`,
        `- Location: ${profile.baseLocation}`,
        `- Relocation: ${profile.relocation}`,
        "",
        "## Summary",
        profile.summary,
        "",
        "## Focus",
        ...focusAreas.map((area) => `- ${area}`),
      ],
      "projects.md": [
        "# Projects",
        "",
        ...projectShowcase.flatMap((project, index) => [
          `## ${index + 1}. ${project.title}`,
          project.description,
          `- Stack: ${project.technologies.join(", ")}`,
          `- Link: ${project.link || "N/A"}`,
          "",
        ]),
      ],
      "publications.md": [
        "# Publications",
        "",
        ...publications.flatMap((paper, index) => [
          `## ${index + 1}. ${paper.title} (${paper.year})`,
          paper.description,
          `- Topics: ${paper.technologies.join(", ")}`,
          `- Link: ${paper.link || "N/A"}`,
          "",
        ]),
      ],
      "experience.md": [
        "# Experience",
        "",
        "## Roles",
        ...experience.flatMap((item) => [
          `### ${item.role} @ ${item.company} (${item.period})`,
          ...item.highlights.map((detail) => `- ${detail}`),
          "",
        ]),
        "## Education",
        ...education.flatMap((item) => [
          `### ${item.degree} - ${item.school} (${item.period})`,
          ...(item.details.length
            ? item.details.map((detail) => `- ${detail}`)
            : ["- No additional details"]),
          "",
        ]),
      ],
      "skills.md": [
        "# Skills",
        "",
        ...skillGroups.flatMap((group) => [
          `## ${group.title}`,
          ...group.items.map((item) => `- ${item}`),
          "",
        ]),
      ],
      "contact.md": [
        "# Contact",
        "",
        `- Email: ${profile.email}`,
        `- Phone: ${profile.phone}`,
        `- LinkedIn: ${profile.linkedin}`,
        "- Resume: /Hasan_Yucedag_lebenslauf.pdf",
      ],
    }),
    []
  );

  const terminalShortcuts = useMemo(
    () => [
      { command: "ls", description: "Show all available markdown section files." },
      { command: "cat home.md", description: "Open profile summary and focus areas." },
      { command: "cat projects.md", description: "List all projects with stack and links." },
      { command: "cat publications.md", description: "Show papers and publication links." },
      { command: "cat experience.md", description: "Show professional timeline and education." },
      { command: "cat skills.md", description: "Show grouped technical stack overview." },
      { command: "cat contact.md", description: "Show email, phone, LinkedIn, and resume path." },
      { command: "help", description: "Print supported commands in terminal." },
      { command: "clear", description: "Clear terminal output history." },
    ],
    []
  );

  useEffect(() => {
    if (heroMode !== "nonTechnical") {
      return undefined;
    }

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.36;
      let nextActiveId = sections[0].id;
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isMarkerInside = rect.top <= marker && rect.bottom >= marker;

        if (isMarkerInside) {
          nextActiveId = section.id;
          closestDistance = -1;
          return;
        }

        if (closestDistance !== -1) {
          const distance = Math.abs(rect.top - marker);
          if (distance < closestDistance) {
            closestDistance = distance;
            nextActiveId = section.id;
          }
        }
      });

      setActiveSection((prev) => (prev === nextActiveId ? prev : nextActiveId));
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [heroMode]);

  useEffect(() => {
    const nodes = timelineRefs.current.filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        setTimelineActive((prev) => {
          const next = { ...prev };
          entries.forEach((entry) => {
            const index = Number(entry.target.dataset.timelineIndex);
            next[index] = entry.isIntersecting;
          });
          return next;
        });
      },
      {
        threshold: 0,
        rootMargin: "-35% 0px -35% 0px",
      }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      nodes.forEach((node) => observer.unobserve(node));
      observer.disconnect();
    };
  }, [timelineEntries.length]);

  useEffect(() => {
    setTerminalHistory([
      {
        id: "boot",
        command: "cat readme.md",
        output: markdownFiles["readme.md"],
      },
    ]);
  }, [markdownFiles]);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  useEffect(() => {
    if (heroMode === "technical" && activeProject) {
      setActiveProject(null);
    }
  }, [heroMode, activeProject]);

  useEffect(() => {
    if (heroMode === "technical" && terminalInputRef.current) {
      terminalInputRef.current.focus();
    }
  }, [heroMode]);

  const handleCardPointer = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    event.currentTarget.style.setProperty("--cursor-x", `${x}px`);
    event.currentTarget.style.setProperty("--cursor-y", `${y}px`);
  };

  const pushTerminalEntry = (command, output) => {
    const nextEntry = {
      id: `entry-${terminalEntryCountRef.current}`,
      command,
      output,
    };

    terminalEntryCountRef.current += 1;
    setTerminalHistory((prev) => [...prev, nextEntry].slice(-20));
  };

  const runTerminalCommand = (rawCommand) => {
    const command = rawCommand.trim();

    if (!command) {
      return;
    }

    const lower = command.toLowerCase();

    if (lower === "clear") {
      setTerminalHistory([]);
      return;
    }

    if (lower === "help") {
      pushTerminalEntry(command, [
        "Available commands:",
        "- ls",
        "- pwd",
        "- help",
        "- clear",
        "- cat home.md",
        "- cat projects.md",
        "- cat publications.md",
        "- cat experience.md",
        "- cat skills.md",
        "- cat contact.md",
      ]);
      return;
    }

    if (lower === "pwd") {
      pushTerminalEntry(command, ["/Users/hasan/portfolio"]);
      return;
    }

    if (lower === "ls") {
      pushTerminalEntry(command, Object.keys(markdownFiles));
      return;
    }

    if (lower.startsWith("cat ")) {
      const target = command.slice(4).trim().toLowerCase();
      const fileContent = markdownFiles[target];

      if (fileContent) {
        pushTerminalEntry(command, fileContent);
      } else {
        pushTerminalEntry(command, [`cat: ${target}: No such file or directory`]);
      }
      return;
    }

    pushTerminalEntry(command, [
      `${command}: command not found`,
      "Type 'help' to see available commands.",
    ]);
  };

  const handleTerminalSubmit = (event) => {
    event.preventDefault();
    runTerminalCommand(terminalInput);
    setTerminalInput("");
  };

  const runShortcutCommand = (command) => {
    runTerminalCommand(command);
    setTerminalInput("");
    if (terminalInputRef.current) {
      terminalInputRef.current.focus();
    }
  };

  return (
    <div className="glass-site">
      <div className="ambient-canvas" aria-hidden>
        <motion.span
          className="ambient-orb orb-violet"
          animate={{ x: [0, 90, -30, 0], y: [0, -60, 40, 0], scale: [1, 1.2, 0.95, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="ambient-orb orb-blue"
          animate={{ x: [0, -120, 60, 0], y: [0, 50, -40, 0], scale: [1, 0.9, 1.15, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
        <motion.span
          className="ambient-orb orb-dynamic"
          style={{ background: ambientAccent }}
          animate={{ x: [0, 70, -60, 0], y: [0, -20, 35, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      <section id="home" className="glass-section hero-section">
        <div className="hero-mode-switch" role="tablist" aria-label="Audience Mode">
          <button
            type="button"
            className={heroMode === "nonTechnical" ? "is-active" : ""}
            onClick={() => setHeroMode("nonTechnical")}
          >
            Non-Technical
          </button>
          <button
            type="button"
            className={heroMode === "technical" ? "is-active" : ""}
            onClick={() => setHeroMode("technical")}
          >
            Technical
          </button>
        </div>

        <AnimatePresence mode="wait">
          {heroMode === "nonTechnical" ? (
            <motion.div
              key="non-technical"
              className="hero-inner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <p className="eyebrow">{profile.fullName}</p>
              <h1 className="hero-title">Engineering & Elegance.</h1>
              <p className="hero-copy">
                {profile.role} building scalable software systems across web platforms, AWS
                infrastructure, and AI-powered experiences.
              </p>

              <div className="hero-meta">
                <span>{profile.baseLocation}</span>
                <span>{profile.relocation}</span>
              </div>

              <div className="hero-actions">
                <a className="glass-button" href="/Hasan_Yucedag_lebenslauf.pdf" target="_blank" rel="noreferrer">
                  View Resume
                </a>
                <a className="text-link" href={`mailto:${profile.email}`}>
                  Contact
                </a>
              </div>

              <div className="hero-icons">
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <LuLinkedin size={18} />
                </a>
                <a href="https://github.com/hasanycdg" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <LuGithub size={18} />
                </a>
                <a href={`mailto:${profile.email}`} aria-label="Email">
                  <LuMail size={18} />
                </a>
                <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} aria-label="Phone">
                  <LuPhone size={18} />
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="technical"
              className="terminal-hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="terminal-window" onClick={() => terminalInputRef.current?.focus()}>
                <div className="terminal-titlebar">
                  <div className="terminal-dots" aria-hidden>
                    <span className="dot-red" />
                    <span className="dot-yellow" />
                    <span className="dot-green" />
                  </div>
                  <p>
                    <LuTerminal size={14} /> portfolio.zsh
                  </p>
                </div>

                <div className="terminal-body" ref={terminalBodyRef}>
                  {terminalHistory.map((entry) => (
                    <div className="terminal-entry" key={entry.id}>
                      <p className="terminal-prompt">
                        <span>{terminalPrompt}</span>:~$ {entry.command}
                      </p>
                      {entry.output.map((line, index) => (
                        <p className="terminal-output" key={`${entry.id}-${index}`}>
                          {line}
                        </p>
                      ))}
                    </div>
                  ))}
                  <form className="terminal-inline-input-form" onSubmit={handleTerminalSubmit}>
                    <span className="terminal-inline-prefix">
                      <span>{terminalPrompt}</span>:~$
                    </span>
                    <input
                      ref={terminalInputRef}
                      type="text"
                      className="terminal-inline-input"
                      value={terminalInput}
                      onChange={(event) => setTerminalInput(event.target.value)}
                      placeholder="cat projects.md"
                      aria-label="Terminal command input"
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </form>
                </div>
              </div>

              <aside className="command-panel" aria-label="Terminal shortcuts">
                <p className="eyebrow">Shortcuts</p>
                <h2>What Each Command Does</h2>
                <div className="command-list">
                  {terminalShortcuts.map((item) => (
                    <div key={item.command} className="command-item">
                      <button
                        type="button"
                        className="command-button"
                        onClick={() => runShortcutCommand(item.command)}
                      >
                        <span>$</span>
                        {item.command}
                      </button>
                      <p className="command-help">{item.description}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {heroMode === "nonTechnical" ? (
        <>
          <section id="projects" className="glass-section projects-section">
            <motion.div
              className="section-head"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65 }}
            >
              <p className="eyebrow">Project Showcase</p>
              <h2>Selected Works</h2>
            </motion.div>

            <div className="project-grid">
              {projectShowcase.map((project) => (
                <motion.article
                  key={project.title}
                  className="project-card"
                  onMouseMove={handleCardPointer}
                  onHoverStart={() => setAmbientAccent(project.accent || "rgba(139, 92, 246, 0.22)")}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  onClick={() => setActiveProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveProject(project);
                    }
                  }}
                >
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="stack-tags">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                    <button type="button" className="card-link">
                      Open Case Study <LuArrowUpRight size={15} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="publications" className="glass-section publications-section">
            <motion.div
              className="section-head"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65 }}
            >
              <p className="eyebrow">Publications</p>
              <h2>Research Repository</h2>
            </motion.div>

            <div className="publication-list">
              {publications.map((paper) => (
                <article key={paper.title} className="publication-row">
                  <p className="paper-year">{paper.year}</p>
                  <div className="paper-main">
                    <h3>{paper.title}</h3>
                    <p>{paper.description}</p>
                  </div>
                  <a href={paper.link} target="_blank" rel="noreferrer" className="paper-link">
                    {paper.ctaLabel || "Read Paper"} <LuArrowUpRight size={16} />
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section id="experience" className="glass-section experience-section">
            <div className="experience-layout">
              <motion.aside
                className="experience-aside"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65 }}
              >
                <p className="eyebrow">Experience</p>
                <h2>Professional Timeline</h2>
                <p>
                  Professional roles, academic milestones, and a focused stack across engineering,
                  infrastructure, and applied AI.
                </p>
                <div className="stack-preview">
                  {stackPreview.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </motion.aside>

              <div className="timeline-wrap">
                <span className="timeline-track" aria-hidden />
                <div className="timeline-list">
                  {timelineEntries.map((entry, index) => (
                    <article
                      key={`${entry.title}-${entry.subtitle}`}
                      className="timeline-item"
                      ref={(node) => {
                        timelineRefs.current[index] = node;
                      }}
                      data-timeline-index={index}
                    >
                      <span className={`timeline-node ${timelineActive[index] ? "is-active" : ""}`} />
                      <p className="timeline-kicker">
                        {entry.subtitle} · {entry.period}
                      </p>
                      <h3>{entry.title}</h3>
                      {entry.details?.length ? (
                        <ul>
                          {entry.details.map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <nav className="floating-nav" aria-label="Section Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a key={item.id} href={`#${item.id}`} className={isActive ? "is-active" : ""}>
                  {item.label}
                </a>
              );
            })}
          </nav>

          <AnimatePresence>
            {activeProject ? (
              <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProject(null)}
              >
                <motion.div
                  className="modal-panel"
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    className="modal-close"
                    onClick={() => setActiveProject(null)}
                    aria-label="Close project details"
                  >
                    <LuX size={18} />
                  </button>

                  <p className="eyebrow">Case Study</p>
                  <h3>{activeProject.title}</h3>
                  <p className="modal-copy">{activeProject.description}</p>

                  <div className="modal-stack">
                    {activeProject.technologies.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  {activeProject.link ? (
                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noreferrer"
                      className="glass-button modal-cta"
                    >
                      {activeProject.ctaLabel || "Open Project"}
                    </a>
                  ) : null}
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </>
      ) : null}
    </div>
  );
};

export default GlassPortfolio;
