import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { legal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Impressum — Hasan Yücedag",
  description: "Impressum und Offenlegung gemäß § 5 ECG und § 25 MedienG.",
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  const { trade } = legal;
  return (
    <LegalPage title="Impressum">
      <section>
        <h2>Angaben gemäß § 5 ECG und § 25 MedienG</h2>
        <p>
          {legal.name}<br />
          {legal.city}<br />
          {legal.country}
        </p>
        <p>
          E-Mail: <a href={`mailto:${legal.email}`}>{legal.email}</a><br />
          Telefon / WhatsApp: <a href={`tel:${legal.phone.replace(/\s/g, "")}`}>{legal.phone}</a>
        </p>
      </section>

      <section>
        <h2>Unternehmensgegenstand</h2>
        <p>{legal.business}</p>
        {legal.vatId ? <p>UID-Nummer: {legal.vatId}</p> : null}
      </section>

      {trade ? (
        <section>
          <h2>Gewerberechtliche Angaben</h2>
          <p>
            Gewerbewortlaut: {trade.licence}<br />
            GISA-Zahl: {trade.gisa}<br />
            Gewerbebehörde: {trade.authority}<br />
            Kammerzugehörigkeit: Mitglied der {trade.chamber}<br />
            Anwendbare Rechtsvorschrift: Gewerbeordnung, abrufbar unter <a href="https://www.ris.bka.gv.at" target="_blank" rel="noreferrer">www.ris.bka.gv.at</a>
          </p>
        </section>
      ) : null}

      <section>
        <h2>Offenlegung gemäß § 25 MedienG</h2>
        <p>
          Medieninhaber und Herausgeber: {legal.name}, {legal.city}<br />
          Grundlegende Richtung: Information über die Leistungen, Projekte und Produkte von {legal.name} im Bereich Webdesign sowie Web- und Softwareentwicklung.
        </p>
      </section>

      <section>
        <h2>Haftung für Inhalte und Links</h2>
        <p>
          Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität wird jedoch keine Gewähr übernommen.
          Diese Website enthält Links zu externen Websites. Auf deren Inhalte habe ich keinen Einfluss; verantwortlich ist der jeweilige Anbieter. Werden Rechtsverletzungen bekannt, entferne ich betroffene Links umgehend.
        </p>
      </section>

      <section>
        <h2>Urheberrecht</h2>
        <p>
          Texte, Grafiken und Code dieser Website unterliegen dem Urheberrecht. Screenshots von Kundenprojekten werden mit Zustimmung der jeweiligen Kund:innen gezeigt; die Rechte an Marken, Logos und Bildern verbleiben bei den jeweiligen Inhaber:innen.
        </p>
      </section>
    </LegalPage>
  );
}
