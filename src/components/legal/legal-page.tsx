import Link from "next/link";
import type { ReactNode } from "react";
import { legal } from "@/lib/legal";
import { ConsentSettingsButton } from "@/components/consent/consent-manager";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <header className="legal-header">
        <div className="container legal-header-row">
          <Link className="brand" href="/">hasan<span>yücedag</span></Link>
          <Link className="legal-back" href="/">← Zurück zur Startseite</Link>
        </div>
      </header>
      <main id="main" className="legal container">
        <p className="eyebrow">Rechtliches</p>
        <h1>{title}</h1>
        <div className="legal-body">{children}</div>
        <p className="legal-updated">Stand: {legal.updated}</p>
      </main>
      <LegalFooter />
    </>
  );
}

export function LegalFooter() {
  return (
    <footer className="footer">
      <div className="container footer-row">
        <Link className="brand footer-brand" href="/">hasan<span>yücedag</span></Link>
        <p>© {new Date().getFullYear()} · {legal.name}</p>
        <div><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link><ConsentSettingsButton /></div>
      </div>
    </footer>
  );
}
