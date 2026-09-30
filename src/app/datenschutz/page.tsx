import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { legal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Datenschutz — Hasan Yücedag",
  description: "Informationen zur Verarbeitung personenbezogener Daten auf dieser Website gemäß DSGVO.",
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <section>
        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br />
          {legal.name}, {legal.city}, {legal.country}<br />
          E-Mail: <a href={`mailto:${legal.email}`}>{legal.email}</a> · Telefon: {legal.phone}
        </p>
      </section>

      <section>
        <h2>2. Überblick</h2>
        <p>
          Diese Website verwendet kein Kontaktformular und bindet keine Werbe- oder Social-Media-Tracker ein. Cookies setzt ausschließlich Google Analytics – und nur, wenn du im Datenschutz-Banner zustimmst. Dasselbe gilt für die übrige Reichweitenmessung (Abschnitte 4 und 5).
          Personenbezogene Daten werden nur in dem Umfang verarbeitet, der für den technischen Betrieb, eine datensparsame Reichweitenmessung und die Beantwortung deiner Anfrage erforderlich ist.
        </p>
      </section>

      <section>
        <h2>3. Hosting und Server-Logfiles</h2>
        <p>
          Die Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet. Beim Aufruf der Website verarbeitet Vercel automatisch technische Daten, die dein Browser übermittelt,
          insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Referrer-URL sowie Browser- und Betriebssysteminformationen. Diese Daten sind erforderlich, um die Website auszuliefern,
          ihre Stabilität und Sicherheit zu gewährleisten und Missbrauch abzuwehren.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und funktionsfähigen Betrieb). Die Übermittlung in die USA erfolgt auf Grundlage des
          EU-U.S. Data Privacy Framework bzw. der EU-Standardvertragsklauseln. Weitere Informationen: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">vercel.com/legal/privacy-policy</a>.
        </p>
      </section>

      <section>
        <h2>4. Reichweitenmessung und Performance (Vercel Web Analytics & Speed Insights)</h2>
        <p>
          Zur Verbesserung der Website nutze ich Vercel Web Analytics und Vercel Speed Insights – ausschließlich nach deiner Einwilligung über das Datenschutz-Banner. Ohne Zustimmung werden diese Dienste nicht geladen. Beide Dienste arbeiten ohne Cookies und ohne Speicherung von Informationen auf deinem Endgerät.
          Erfasst werden aggregierte Daten wie aufgerufene Seiten, Referrer, Land, Gerätetyp, Browser sowie Ladezeiten. Besucher werden nicht über mehrere Tage oder Websites hinweg wiedererkannt;
          die IP-Adresse wird nicht gespeichert.
        </p>
        <p>Rechtsgrundlage ist deine Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Du kannst sie jederzeit mit Wirkung für die Zukunft widerrufen – über den Link „Cookie-Einstellungen“ im Footer.</p>
      </section>

      <section>
        <h2>5. Google Analytics</h2>
        <p>
          Mit deiner Einwilligung nutze ich Google Analytics 4, einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google“).
          Google Analytics setzt Cookies (<code>_ga</code>, <code>_ga_&lt;ID&gt;</code>, Laufzeit bis zu 2 Jahre), um wiederkehrende Besuche zu erkennen, und erfasst u. a. aufgerufene Seiten,
          Verweildauer, Referrer, ungefähren Standort (Land/Region), Gerätetyp, Browser und Betriebssystem. Die IP-Adresse wird von Google Analytics 4 nicht gespeichert.
        </p>
        <p>
          Dabei können Daten an die Google LLC in den USA übermittelt werden. Google ist unter dem EU-U.S. Data Privacy Framework zertifiziert; zusätzlich gelten die EU-Standardvertragsklauseln.
          Die Analysedaten werden nach 14 Monaten automatisch gelöscht.
        </p>
        <p>
          Rechtsgrundlage ist deine Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 165 Abs. 3 TKG 2021. Du kannst sie jederzeit über „Cookie-Einstellungen“ im Footer widerrufen;
          die Google-Analytics-Cookies werden dabei gelöscht. Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">policies.google.com/privacy</a>.
        </p>
      </section>

      <section>
        <h2>6. Lokale Speicherung von Einstellungen</h2>
        <p>
          Deine Spracheinstellung (Deutsch/Englisch) und deine Entscheidung im Datenschutz-Banner werden im lokalen Speicher deines Browsers (Local Storage) abgelegt, damit du beim nächsten Besuch nicht erneut gefragt wirst.
          Diese Information verlässt dein Gerät nicht und wird nicht an mich übermittelt. Die Speicherung ist für diese von dir gewünschten Funktionen unbedingt erforderlich (§ 165 Abs. 3 TKG 2021).
          Du kannst sie jederzeit über die Einstellungen deines Browsers löschen.
        </p>
      </section>

      <section>
        <h2>7. Kontaktaufnahme per E-Mail, Telefon oder WhatsApp</h2>
        <p>
          Wenn du mich per E-Mail, telefonisch oder über WhatsApp kontaktierst, verarbeite ich die von dir übermittelten Daten (z. B. Name, Kontaktdaten, Inhalt der Nachricht), um deine Anfrage zu beantworten
          und ein mögliches Projekt anzubahnen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
        </p>
        <p>
          Die Links zu WhatsApp werden erst bei deinem Klick aktiv. Für die Nutzung von WhatsApp gilt die Datenschutzrichtlinie der WhatsApp Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland
          (<a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noreferrer">whatsapp.com/legal/privacy-policy-eea</a>). Wenn du das nicht möchtest, nutze bitte E-Mail oder Telefon.
        </p>
        <p>Anfragen werden gelöscht, sobald sie abschließend bearbeitet sind und keine gesetzlichen Aufbewahrungspflichten (z. B. nach § 132 BAO) entgegenstehen.</p>
      </section>

      <section>
        <h2>8. Externe Links</h2>
        <p>
          Diese Website verlinkt auf externe Angebote wie LinkedIn, GitHub, den App Store sowie Websites meiner Kund:innen. Beim Laden dieser Website werden keine Daten an diese Anbieter übertragen.
          Erst wenn du einen Link anklickst, gelten die Datenschutzbestimmungen des jeweiligen Anbieters.
        </p>
      </section>

      <section>
        <h2>9. Deine Rechte</h2>
        <p>
          Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
          Wende dich dafür formlos an <a href={`mailto:${legal.email}`}>{legal.email}</a>.
        </p>
        <p>
          Wenn du der Ansicht bist, dass die Verarbeitung deiner Daten gegen das Datenschutzrecht verstößt, kannst du dich bei der Österreichischen Datenschutzbehörde beschweren:
          Barichgasse 40–42, 1030 Wien, <a href="https://www.dsb.gv.at" target="_blank" rel="noreferrer">www.dsb.gv.at</a>.
        </p>
      </section>
    </LegalPage>
  );
}
