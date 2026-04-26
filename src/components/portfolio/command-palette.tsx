"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Command, Search } from "lucide-react";
import type { NavSection, PaletteCopy } from "@/lib/portfolio-data";

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
  sections: NavSection[];
  cvPath: string;
  linkedin: string;
  github: string;
  copy: PaletteCopy;
};

type ActionItem = {
  id: string;
  label: string;
  hint: string;
  href: string;
  external?: boolean;
};

export function CommandPalette({
  open,
  onClose,
  sections,
  cvPath,
  linkedin,
  github,
  copy,
}: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const timeout = window.setTimeout(() => inputRef.current?.focus(), 10);
    return () => window.clearTimeout(timeout);
  }, [open]);

  const actions = useMemo<ActionItem[]>(
    () => [
      ...sections.map((section) => ({
        id: `jump-${section.id}`,
        label: `${copy.jumpPrefix} ${section.label}`,
        hint: section.short,
        href: `#${section.id}`,
      })),
      {
        id: "download-cv",
        label: copy.downloadCv,
        hint: "PDF",
        href: cvPath,
      },
      {
        id: "open-linkedin",
        label: copy.openLinkedin,
        hint: copy.externalHint,
        href: linkedin,
        external: true,
      },
      {
        id: "open-github",
        label: copy.openGithub,
        hint: copy.externalHint,
        href: github,
        external: true,
      },
    ],
    [sections, cvPath, linkedin, github, copy],
  );

  const filtered = actions.filter((action) =>
    `${action.label} ${action.hint}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[130] flex items-start justify-center bg-black/55 p-4 pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label={copy.ariaLabel}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[#283231] bg-[#0a1010] text-[#d7e2de] shadow-[0_30px_80px_-45px_rgba(0,0,0,0.9)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[#1d2827] px-4 py-3">
              <Search size={17} className="text-[#83a59d]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.placeholder}
                className="w-full bg-transparent text-sm text-[#d7e2de] outline-none placeholder:text-[#759188]"
              />
              <span className="inline-flex items-center gap-1 rounded border border-[#31413e] px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#7f9a93]">
                <Command size={12} />
                K
              </span>
            </div>

            <ul className="max-h-[58vh] overflow-y-auto p-2">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={onClose}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      className="group flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-[#111a19]"
                    >
                      <span className="text-sm font-medium text-[#dce8e4]">{item.label}</span>
                      <span className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#7f9a93]">
                        {item.hint}
                        <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />
                      </span>
                    </a>
                  </li>
                ))
              ) : (
                <li className="px-3 py-6 text-sm text-[#88a29b]">{copy.noMatch}</li>
              )}
            </ul>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
