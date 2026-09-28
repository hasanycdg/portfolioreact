"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

type Consent = "granted" | "denied";

const STORAGE_KEY = "consent-v1";
const OPEN_EVENT = "consent:open";

const copy = {
  de: {
    title: "Datenschutz-Einstellungen",
    text: "Diese Website nutzt keine Werbe- oder Tracking-Cookies. Mit deiner Zustimmung messe ich anonym Reichweite und Ladezeiten über Vercel Analytics, um die Seite zu verbessern.",
    accept: "Akzeptieren",
    decline: "Nur notwendige",
    more: "Mehr erfahren",
    settings: "Cookie-Einstellungen",
  },
  en: {
    title: "Privacy settings",
    text: "This website uses no advertising or tracking cookies. With your consent, I measure reach and load times anonymously via Vercel Analytics to improve the site.",
    accept: "Accept",
    decline: "Essential only",
    more: "Learn more",
    settings: "Cookie settings",
  },
};

function readLocale(): keyof typeof copy {
  try { return window.localStorage.getItem("portfolio-locale") === "en" ? "en" : "de"; } catch { return "de"; }
}

function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch { return null; }
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function ConsentManager() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<keyof typeof copy>("de");

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    setOpen(stored === null);
    setLocale(readLocale());
    const onOpen = () => { setLocale(readLocale()); setOpen(true); };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const choose = (value: Consent) => {
    try { window.localStorage.setItem(STORAGE_KEY, value); } catch { /* storage blocked: choice lasts for this visit */ }
    // Already-loaded analytics scripts cannot be unloaded, so a revocation reloads the page.
    if (consent === "granted" && value === "denied") { window.location.reload(); return; }
    setConsent(value);
    setOpen(false);
  };

  const t = copy[locale];

  return (
    <>
      {consent === "granted" ? <><Analytics /><SpeedInsights /></> : null}
      {open ? (
        <div className="consent" role="dialog" aria-live="polite" aria-labelledby="consent-title" aria-describedby="consent-text">
          <p id="consent-title" className="consent-title">{t.title}</p>
          <p id="consent-text" className="consent-text">{t.text} <Link href="/datenschutz">{t.more}</Link></p>
          <div className="consent-actions">
            <button type="button" className="btn consent-accept" onClick={() => choose("granted")}>{t.accept}</button>
            <button type="button" className="btn consent-decline" onClick={() => choose("denied")}>{t.decline}</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function ConsentSettingsButton({ label }: { label?: string }) {
  return <button type="button" className="footer-link-button" onClick={openConsentSettings}>{label ?? copy.de.settings}</button>;
}
