"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

type Consent = "granted" | "denied";

const STORAGE_KEY = "consent-v1";
const OPEN_EVENT = "consent:open";
const GA_ID = "G-H2VEST0RR3";

// Removes the Google Analytics cookies (_ga, _ga_<id>) after consent is withdrawn.
function clearGaCookies() {
  const host = window.location.hostname;
  for (const entry of document.cookie.split(";")) {
    const name = entry.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const domain of ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}

const copy = {
  de: {
    title: "Datenschutz-Einstellungen",
    text: "Mit deiner Zustimmung nutze ich Google Analytics und Vercel Analytics, um Besuche und Ladezeiten zu messen und die Seite zu verbessern. Google Analytics setzt dafür Cookies. Ohne Zustimmung wird nichts davon geladen.",
    accept: "Akzeptieren",
    decline: "Nur notwendige",
    more: "Mehr erfahren",
    settings: "Cookie-Einstellungen",
  },
  en: {
    title: "Privacy settings",
    text: "With your consent, I use Google Analytics and Vercel Analytics to measure visits and load times and improve the site. Google Analytics sets cookies for this. Without consent, none of it is loaded.",
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
    if (consent === "granted" && value === "denied") { clearGaCookies(); window.location.reload(); return; }
    setConsent(value);
    setOpen(false);
  };

  const t = copy[locale];

  return (
    <>
      {consent === "granted" ? <><GoogleAnalytics /><Analytics /><SpeedInsights /></> : null}
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
