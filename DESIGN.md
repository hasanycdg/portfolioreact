# Portfolio Redesign — Design Document

> Ziel: Wenn jemand auf die Seite kommt, soll innerhalb von 5 Sekunden klar sein: **"Dieser Mensch kann mir etwas Echtes bauen — performant, professionell, mit nachweisbaren Ergebnissen."**

---

## 1. Diagnose der aktuellen Seite

**Was gut ist (bleibt erhalten):**
- Solide Inhalte (4 echte Systeme, Metriken, Timeline, Publikationen)
- Gute Performance-Basis (Next.js, Tailwind, Framer Motion)
- Klare Zweisprachigkeit (EN/DE)
- Saubere Datenstruktur in `portfolio-data.ts`

**Was Kunden/Recruiter abschreckt:**
| Problem | Wirkung auf den Betrachter |
|---|---|
| Boot-Sequence beim Laden ("Initializing engineering command center...") | Wirkt verspielt, verzögert den Wert |
| "Hasan OS", "Engineering Operating System", "Deployed Systems", "Collaboration Endpoint" | Klingt nach Hobby-Projekt, nicht nach Dienstleister |
| "Layer 01", "Layer 02"-Indizes, Terminal-Scanlines, blinkende Cursor | Verteilt Aufmerksamkeit, statt sie zu fokussieren |
| Dunkelgrün-monotones Farbschema | Wirkt eingeschränkt, alle Sektionen sehen gleich aus |
| Command Palette (Cmd+K) als prominentes UI-Element | Nur ~5% der Besucher nutzen das; nimmt aber visuellen Raum ein |
| Keine Sektion "**Was ich für dich bauen kann**" | Der Kunde muss selbst übersetzen "Plugin → mein Use Case" |
| Keine Testimonials, keine Logos, kein sozialer Beweis | Keine Trust-Signale |
| Hero-Headline "Software Engineer building AI-powered, performance-focused web systems" | Beschreibt **dich**, nicht **den Nutzen für den Kunden** |
| Sehr dichte Informationsdarstellung ohne Atem-Räume | Wirkt überfordert, nicht souverän |

**Kernsatz der Diagnose:**
> Die aktuelle Seite zeigt "Hier ist meine Welt — bitte ergründe sie." Die neue Seite soll zeigen "Hier ist, was ich für dich tun kann — hier ist der Beweis — hier ist der Knopf zum Loslegen."

---

## 2. Strategische Positionierung

**Zielgruppen (in dieser Reihenfolge):**
1. **Recruiter / Hiring Manager in Zürich** (Hauptziel — Umzug 08/2026)
2. **Kleine bis mittlere Unternehmen / Agenturen**, die Fullstack-, AI- oder WordPress-Arbeit auslagern wollen
3. **Andere Entwickler / Tech-Leads**, die deine Arbeit referenzieren

**Was die Seite vermitteln muss (Hierarchie):**
1. **Wer du bist** (Name, Rolle, Foto) → in <2 Sekunden
2. **Was du baust** (klare, konkrete Outcomes — nicht "AI-powered systems", sondern "Ich baue WordPress-Plugins, die in 4 Tagen statt 4 Wochen liefern")
3. **Beweise** (Case Studies mit Zahlen, Logos, Testimonials)
4. **Wie du arbeitest** (Prozess, Stack, Verfügbarkeit)
5. **Call-to-Action** (E-Mail, CV, Termin buchen)

---

## 3. Designprinzipien

| Prinzip | Bedeutung |
|---|---|
| **Vertrauen vor Originalität** | Eine ruhige Seite, die wie eine professionelle Beratung wirkt, schlägt eine kreative Seite, die wie ein Spielzeug wirkt. |
| **Outcome > Tech** | Überschriften sprechen über Ergebnisse für den Kunden, nicht über deinen Stack. Der Stack wird im Detail gezeigt, nicht in der Headline. |
| **Eine Idee pro Sektion** | Jede Sektion hat **einen** klaren Zweck. Keine Sektion mischt Inhalt + Demo + Stats + Status. |
| **Großzügige Whitespace** | Atmen lassen. Premium-Kunden assoziieren Whitespace mit Qualität. |
| **Beweise statt Behauptungen** | Statt "Performance-fokussiert" → "PageSpeed 80 → 95+ in 3 Projekten". Konkret. Messbar. |
| **Eine klare Aktion pro Seitenbereich** | Im Hero: ein Primary-CTA. Im Footer: ein CTA. Keine Wand aus 8 Buttons. |
| **Mobile-first ernst nehmen** | 50%+ der Recruiter scrollen auf dem Handy zwischen Meetings. |

---

## 4. Visuelle Sprache

### 4.1 Farbpalette (Wechsel von Mono-Dunkelgrün zu "professional dark + warmer Akzent")

```
Hintergrund:
  --bg-base:          #0B0D10   (fast schwarz, neutral, nicht grünstichig)
  --bg-elevated:      #14171C   (Cards, Sektionen)
  --bg-hover:         #1B1F26

Text:
  --text-primary:     #F5F7FA   (Hauptüberschriften)
  --text-secondary:   #B8BFCC   (Fließtext)
  --text-muted:       #6B7280   (Meta, Labels)

Borders:
  --border-subtle:    #1F2530
  --border-default:   #2A3140
  --border-strong:    #3A4255

Akzent (warm, vertrauenswürdig, nicht gimmicky):
  --accent:           #6366F1   (Indigo — Tech, Vertrauen)
  --accent-strong:    #818CF8
  --accent-soft:      rgba(99, 102, 241, 0.12)

  Alternative: warmes Bernstein (#F59E0B) für "Verfügbar / In Arbeit"-Signale

Semantik:
  --success:          #10B981   (Production-Status)
  --info:             #3B82F6
  --warning:          #F59E0B
```

**Wichtig:** Wir behalten Dark Mode (passt zu Engineering-Identität), aber **wir machen ihn neutraler**, nicht "Terminal-Grün". Das wirkt 10× erwachsener.

### 4.2 Typografie

**Wechsel weg von Space Grotesk + IBM Plex Mono** (zu spielerisch) **hin zu:**
- **Sans (Headlines + Body):** `Inter` oder `Geist Sans` — modern, neutral, vertrauenserweckend
- **Mono (nur für Code-Snippets in Case Studies):** `Geist Mono` oder `JetBrains Mono` — dezent

**Typescale:**
```
display-1:  56-72px / 1.05 / -0.03em weight 600   (Hero-Headline)
display-2:  40-48px / 1.1  / -0.02em weight 600   (Sektion-Titel)
heading-1:  28-32px / 1.2  / -0.01em weight 600
heading-2:  20-22px / 1.3            weight 600
body-lg:    18px    / 1.6            weight 400
body:       16px    / 1.65           weight 400
caption:    13px    / 1.5            weight 500 uppercase tracking 0.08em
```

### 4.3 Spacing & Layout

- **Container max-width:** 1100px (aktuell 1240px — etwas weniger Breite = mehr Premium-Gefühl)
- **Sektion-Spacing:** mind. 96px vertikal zwischen Sektionen (Mobile 64px)
- **Grid:** 12-Spalten, 24px Gutter
- **Border-Radius:** konsistent 12px für Cards, 8px für kleine Elemente, 999px nur für Buttons/Pills

---

## 5. Sektionsweise Neugestaltung

### Sektion 1 — Hero (oberhalb der Falte)

**Heute:** Boot-Sequence + Layer 01 + Hasan OS + Engineering Operating System + 4 Metriken + System-Diagramm + Terminal + 3 Buttons. **Zu viel.**

**Neu — Layout:**
```
┌───────────────────────────────────────────────────────┐
│  [Foto Hasan] Hasan Yücedag                           │
│               Software Engineer · Innsbruck → Zürich  │
│               • Verfügbar ab 08/2026  [grüner Dot]    │
│                                                       │
│  Ich baue Webprodukte, die                            │
│  in Produktion bestehen.                              │
│                                                       │
│  Fullstack-Entwicklung, AI-Integration und            │
│  Performance-Optimierung für Unternehmen,             │
│  die ernsthafte Software brauchen — kein Demoware.    │
│                                                       │
│  [ Projekte ansehen → ]  [ CV laden ]  [ EN | DE ]   │
│                                                       │
│  ─────────────────────────────────────────            │
│  Vertrauen bisher von:                                │
│  [florianmatthias]  [Translogica]  [Uni Innsbruck]   │
└───────────────────────────────────────────────────────┘
```

**Warum das funktioniert:**
- Foto + Name + Status (verfügbar/grüner Dot) = sofortige menschliche Verbindung & Verfügbarkeitssignal
- Outcome-Headline ("in Produktion bestehen") spricht den Kunden an, nicht dich
- Subcopy nennt 3 konkrete Stärken (Fullstack, AI, Performance) — der Kunde checkt ab "passt das zu mir?"
- **Ein** primärer CTA, **ein** sekundärer CTA — kein Buttons-Sumpf
- Logo-Leiste der bisherigen Arbeitgeber/Klienten = Social Proof in der Hero

**Was wegfällt:**
- Boot-Sequence (komplett raus, oder nur als kleines Detail im Footer)
- "Hasan OS" / "Engineering Operating System" Branding
- "Layer 01" Index
- Terminal-Zeile mit blinkendem Cursor im Hero (kann später als Easter Egg an einer ruhigen Stelle wieder rein)
- System-Diagramm aus dem Hero (gehört zu einer Case Study, nicht in die Hero)

### Sektion 2 — Was ich für dich bauen kann (NEU!)

Das ist die **wichtigste neue Sektion**. Sie übersetzt deine Skills in **Kundennutzen**.

```
┌────────────────────────────────────────────────────────┐
│  Was ich für dich bauen kann                           │
│                                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ 🌐           │  │ 🤖           │  │ ⚡           │ │
│  │ Fullstack    │  │ AI-Integration│  │ Performance &│ │
│  │ Webprodukte  │  │              │  │ Infrastruktur│ │
│  │              │  │              │  │              │ │
│  │ Next.js,     │  │ RAG-Chatbots,│  │ PageSpeed-   │ │
│  │ TypeScript,  │  │ Custom AI-   │  │ Optimierung, │ │
│  │ Node, PHP    │  │ Plugins für  │  │ AWS-Setups,  │ │
│  │              │  │ WordPress    │  │ CDN, Caching │ │
│  │ → Beispiel   │  │ → Beispiel   │  │ → Beispiel   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└────────────────────────────────────────────────────────┘
```

Drei Karten = drei Service-Säulen. Jede Karte hat:
- Icon (dezent)
- Headline (Outcome-orientiert)
- 2-3 Zeilen Beschreibung
- Liste typischer Technologien
- Link zum konkreten Beispiel weiter unten

### Sektion 3 — Case Studies (statt "Deployed Systems")

Aktuell heißt das "Deployed Systems". **Neu: "Ausgewählte Projekte"** oder **"Case Studies"**.

**Pro Projekt eine eigene "Mini-Story"** (nicht ein Toggle mit verstecktem Inhalt):

```
┌─────────────────────────────────────────────────────────┐
│  AI SEO Plugin für WordPress           [In Produktion] │
│  florianmatthias · 2024–heute                          │
│                                                         │
│  Problem:                                               │
│  Redaktionsteams verbringen Stunden mit manueller       │
│  Pflege von Alt-Texten, Meta-Daten und interner         │
│  Verlinkung. Das skaliert nicht.                        │
│                                                         │
│  Lösung:                                                │
│  Eigenes WordPress-Plugin, das AI-Pipelines (OpenAI)    │
│  in den Redaktions-Workflow integriert. Alt-Texte,      │
│  Yoast-Metadaten und interne Links werden               │
│  vorgeschlagen — die Redaktion entscheidet.             │
│                                                         │
│  Ergebnis:                                              │
│  • Mehrere Kunden im produktiven Einsatz                │
│  • Spürbar weniger Aufwand pro publiziertem Artikel     │
│  • Konsistentere SEO-Qualität über Teams hinweg         │
│                                                         │
│  Stack: PHP · WordPress Plugin API · OpenAI · Yoast    │
└─────────────────────────────────────────────────────────┘
```

**Format pro Projekt:** Problem → Lösung → Ergebnis → Stack. Diese Struktur ist **das, was Recruiter und Kunden lesen wollen.** Sie ist erprobt und zwingt dich, den Kundennutzen klar zu formulieren.

Vier Projekte = vier solche Karten, **untereinander**, mit großzügigem vertikalem Spacing. Keine Akkordeons mehr — alles direkt lesbar.

### Sektion 4 — Über mich (Schlanker)

```
┌────────────────────────────────────────────────────────┐
│  [Foto, 240×320]    Über mich                          │
│                                                        │
│                     Ich bin Software Engineer aus      │
│                     Innsbruck. Ich habe Informatik     │
│                     an der Uni Innsbruck studiert      │
│                     (BSc, Sehr gut) und arbeite seit   │
│                     2025 als Lead-Fullstack-Entwickler │
│                     bei florianmatthias.               │
│                                                        │
│                     Im August 2026 ziehe ich nach      │
│                     Zürich und bin offen für Software- │
│                     Engineer-Rollen in der Schweiz.    │
│                                                        │
│                     [LinkedIn] [GitHub] [E-Mail]       │
└────────────────────────────────────────────────────────┘
```

Kurz, persönlich, klar. Das aktuelle "Operator Profile" mit Archive + Publikationen wird in zwei Unter-Karten aufgeteilt.

### Sektion 5 — Erfahrung (umbenannt von "Execution Timeline")

Klassische, ruhige Timeline. Kein Terminal-Look. Kein "log-scan". Datumsspalte links, Inhalt rechts. Dezent.

### Sektion 6 — Skills (statt "Capability Matrix")

Die 6×4 Matrix ist **clever, aber überfordernd**. Wir reduzieren auf:
- Eine kompakte Gruppe von Skill-Tags, gruppiert in 3-4 Kategorien (Frontend / Backend / Infra / AI)
- Kein Hover-Highlighting, kein Build/Optimize/Deploy/Maintain-Schema (das ist intern für dich relevant, für Kunden Overkill)

### Sektion 7 — Kontakt mit Formular (Resend-Integration)

Statt nur eines Mailto-Links bekommt der Kunde ein **richtiges Kontaktformular**, das direkt eine E-Mail an dich auslöst — niedrige Reibung, professioneller Eindruck.

**Layout (zweispaltig auf Desktop, gestapelt auf Mobile):**

```
┌──────────────────────────────────────────────────────────────────────┐
│  Lass uns reden.                                                     │
│  Ob Stelle in Zürich oder Projektanfrage — ich antworte              │
│  innerhalb von 24 Stunden.                                           │
│                                                                      │
│  ┌────────────────────────────┐  ┌────────────────────────────────┐ │
│  │  Direkter Draht             │  │  Nachricht senden              │ │
│  │                             │  │                                │ │
│  │  ✉  yucedagh1@gmail.com     │  │  Name *                        │ │
│  │  in LinkedIn                │  │  [____________________]        │ │
│  │  gh GitHub                  │  │                                │ │
│  │  ⬇  CV herunterladen (PDF)  │  │  E-Mail *                      │ │
│  │                             │  │  [____________________]        │ │
│  │  Standort: Innsbruck        │  │                                │ │
│  │  Ab 08/2026: Zürich         │  │  Unternehmen / Kontext          │ │
│  │  Verfügbar [grüner Dot]     │  │  [____________________]        │ │
│  │  Antwortzeit < 24h          │  │                                │ │
│  │                             │  │  Worum geht es? *              │ │
│  │                             │  │  ( ) Stelle / Recruiting       │ │
│  │                             │  │  ( ) Projektanfrage            │ │
│  │                             │  │  ( ) Sonstiges                 │ │
│  │                             │  │                                │ │
│  │                             │  │  Nachricht *                   │ │
│  │                             │  │  [____________________]        │ │
│  │                             │  │  [                    ]        │ │
│  │                             │  │  [                    ]        │ │
│  │                             │  │                                │ │
│  │                             │  │  [   Nachricht senden  →   ]   │ │
│  │                             │  │  ↳ Erfolg/Fehler-Feedback hier │ │
│  └────────────────────────────┘  └────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

**Formular-Felder:**
| Feld | Pflicht | Typ | Validierung |
|---|---|---|---|
| Name | ✓ | text | min 2 Zeichen |
| E-Mail | ✓ | email | valides Format |
| Unternehmen / Kontext | – | text | optional |
| Anlass | ✓ | radio | 3 Optionen (Stelle / Projekt / Sonstiges) |
| Nachricht | ✓ | textarea | min 20 Zeichen |
| Honeypot | hidden | text | leer = Mensch |

**UX-Verhalten:**
- **Inline-Validierung** beim Verlassen des Feldes (kein Submit, der erst alle Fehler aufdeckt)
- **Submit-Button** zeigt drei Zustände: idle → loading (Spinner) → success/error
- **Success-State:** Formular wird ersetzt durch grüne Bestätigungskarte: "Danke! Ich melde mich innerhalb von 24 Stunden bei dir." + Button "Weitere Nachricht senden"
- **Error-State:** rote Inline-Meldung mit klarem Grund ("Server-Fehler — bitte schreib direkt an yucedagh1@gmail.com")
- **Reduced Motion** respektieren (kein Loading-Spinner spinnt, sondern fadet)

### 7.1 Technische Umsetzung — Resend-Integration

**Stack:**
- **Resend** als E-Mail-Provider (`resend` npm-Paket)
- **Next.js Route Handler:** `app/api/contact/route.ts` (Server-seitig, POST)
- **React Hook Form** + **Zod** für Validierung (clientseitig + serverseitig spiegeln)
- **Sender-Adresse:** muss eine bei Resend verifizierte Domain sein (z. B. `noreply@hasanyucedag.dev` — oder vorerst Resend's Test-Domain `onboarding@resend.dev` für lokales Testing)
- **Empfänger:** deine private Adresse `yucedagh1@gmail.com`
- **Reply-To:** wird auf die im Formular eingegebene E-Mail gesetzt — so kannst du direkt aus Gmail auf den Absender antworten

**Architektur:**
```
[Formular] ──POST──▶ /api/contact ──▶ Resend API ──▶ deine Inbox
                          │
                          ├─ Zod-Validierung (Server)
                          ├─ Honeypot-Check (Spam-Filter)
                          ├─ Rate-Limit (z. B. 3 Requests / 10 Min pro IP, via Vercel KV oder Upstash — optional)
                          └─ strukturierte E-Mail rendern (Resend React Email Templates oder einfaches HTML)
```

**Mail-Template (an dich):**
```
Betreff: [Portfolio] Neue Anfrage — {Anlass} — {Name}

Name:        Lisa Müller
E-Mail:      lisa@firma.ch
Unternehmen: Acme GmbH
Anlass:      Projektanfrage

Nachricht:
> Hallo Hasan, wir suchen einen Entwickler für ein WordPress-Projekt...

──────────────────────────────────
Gesendet via hasanyucedagportfolio.vercel.app · {Zeitstempel}
IP-Hash: {gekürzter Hash für Spam-Tracking}
```

**Sicherheit & Anti-Spam:**
- Honeypot-Feld (für Bots unsichtbar; wenn ausgefüllt → silent reject)
- Server-seitige Zod-Validierung (vertraue nichts vom Client)
- Optionales Rate-Limiting per IP (Vercel KV / Upstash, falls Spam-Aufkommen relevant wird)
- Kein User-Eingabe-Markup ungefiltert in die E-Mail kippen (Escape vor dem Einsetzen ins Template)
- API-Key **nur** in `RESEND_API_KEY` als Environment Variable (Vercel) — niemals committen

**Env Variables (Vercel + lokal):**
```
RESEND_API_KEY=re_...           # bekomme ich von dir
CONTACT_TO_EMAIL=yucedagh1@gmail.com
CONTACT_FROM_EMAIL=noreply@<deine-verified-domain>
```

**DSGVO-Hinweis unter dem Formular (kompakt, ein Satz):**
> "Deine Angaben werden ausschließlich zur Beantwortung deiner Nachricht genutzt. Mehr im Impressum."

(Impressum/Datenschutz-Seite werden in einem späteren Schritt ergänzt, sobald die Hauptseite steht.)

### 7.2 Was ich von dir brauche
1. **Resend API Key** (`re_...`) — sende ich nach Bestätigung
2. **Verifizierte Sender-Domain bei Resend** — oder Freigabe, dass wir zum Start Resend's `onboarding@resend.dev` als Sender nutzen (funktioniert sofort, nur weniger professionell im Absender-Feld)
3. **Empfänger-Adresse bestätigen:** `yucedagh1@gmail.com`?

### Footer

Eine Zeile. Name. Standort. Jahr. Ggf. unauffälliger "Built with Next.js"-Hinweis. Kein "Engineering Operating System"-Branding.

---

## 6. Interaktion & Motion

**Heutige Probleme:** Boot-Sequence, blinkender Cursor, Spotlight-Overlay (folgt der Maus), Scan-Linien in Sektionen, Architektur-Pulse-Dots, Section-Rail mit OVR/SYS/LOG-Codes — **alles gleichzeitig**.

**Neu — die "Stille-Regel":**
- **Eine** dezente Bewegung pro Sektion (z. B. Fade-up beim Reinscrollen, langsam, kurz)
- Hover-States bewegen sich um ≤ 2px, Farben wechseln in 200ms
- Kein Spotlight-Overlay (Mausverfolgung wirkt nervös)
- Keine permanent laufenden Pulse-Animationen
- Boot-Sequence: **raus** (oder nur als kurzer Fade-In der gesamten Seite, max 300ms)
- Cmd+K Palette: bleibt als Feature, aber **kleineres Floating-Button** unten rechts; nicht im Hero erwähnt

**Reduced motion:** Wird vollständig respektiert — alle Decoration-Animations aus.

---

## 7. Mikro-Texte (Copy-Verbesserungen)

Die aktuellen "engineering"-Begriffe werden auf Kunden-Sprache umgestellt:

| Heute | Neu |
|---|---|
| "Engineering Operating System" | Streichen (oder "Portfolio von Hasan Yücedag") |
| "Deployed Systems" | "Ausgewählte Projekte" / "Selected Work" |
| "Execution Timeline" | "Erfahrung" / "Experience" |
| "Capability Matrix" | "Skills" / "Stack" |
| "Operator Profile" | "Über mich" / "About" |
| "Collaboration Endpoint" | "Kontakt" / "Contact" |
| "Inspect architecture internals" | "Details anzeigen" / "Show details" |
| "Impact log" | "Ergebnis" / "Outcome" |
| "Ready for recruiter inspection" | (raus) |

**Hero-Headline (DE):**
> "Ich baue Webprodukte, die in Produktion bestehen."

**Hero-Subcopy (DE):**
> "Fullstack-Entwicklung, AI-Integration und Performance-Optimierung für Unternehmen, die ernsthafte Software brauchen."

---

## 8. Soziale Beweise (NEU hinzufügen)

Wenn möglich (ggf. später ergänzen):
- **Logo-Leiste** unter dem Hero: florianmatthias, Translogica, Uni Innsbruck — als dezente, einfarbige Logos auf 40% Opacity
- **Ein Testimonial** vom Mentor / CEO bei florianmatthias, falls erhältlich
- **GitHub-Statistik** (Repos, Sterne) als kleine Zahlen-Leiste
- **Echte Metriken** aus Case Studies (PageSpeed 80→95, X Stunden Redaktions-Zeit pro Monat eingespart, etc.)

---

## 9. Technische Umsetzungsstrategie

1. **Datenmodell beibehalten** (`portfolio-data.ts` ist gut strukturiert) — nur Inhalte/Labels umtexten.
2. **Globales CSS umbauen** auf neue Farbpalette + Spacing-Variablen (zentraler Wechsel, betrifft alle Komponenten).
3. **Komponenten neu schreiben:** `portfolio-page.tsx` wird größtenteils neu aufgebaut. Komponenten wie `boot-sequence.tsx`, `system-diagram.tsx`, `technical-flow.tsx` werden **entfernt** oder stark vereinfacht.
4. **Command Palette behalten** als Power-User-Feature, aber visuell zurücknehmen.
5. **Schriftart wechseln** im `layout.tsx` (Inter statt Space Grotesk).
6. **Schrittweise umstellen:** zuerst Hero + neue Services-Sektion, dann Case Studies, dann Rest.

---

## 10. Erfolgskriterien

Nach dem Redesign soll die Seite:
- [ ] Innerhalb von **3 Sekunden** vermitteln, wer du bist und was du anbietest
- [ ] Ein klares **"Was bekommt der Kunde?"** beantworten (Sektion "Was ich bauen kann")
- [ ] Pro Projekt eine lesbare **Problem → Lösung → Ergebnis**-Struktur haben
- [ ] **Eine** primäre Aktion pro Bereich haben
- [ ] **Keine** Boot-Sequence, **keine** Spotlight-Verfolgung, **keine** "Engineering OS"-Sprache
- [ ] Auf dem Handy genauso ruhig und scannbar sein wie auf dem Desktop
- [ ] Beim Recruiter den Eindruck erzeugen: *"Den lade ich zum Gespräch ein."*
- [ ] Beim Kunden den Eindruck erzeugen: *"Dem kann ich mein Projekt anvertrauen."*

---

## 11. Was als Nächstes passiert

Wenn du das Design freigibst, baue ich es **schrittweise** um:

**Phase 1 — Foundation (Farben, Typografie, globale Tokens)**
- Neue CSS-Variablen in `globals.css`
- Schriftarten-Wechsel in `layout.tsx`
- Removal: Spotlight-Overlay, Boot-Sequence (Datei bleibt liegen, wird nicht mehr eingebunden)

**Phase 2 — Hero-Sektion neu**
- Foto + Name + Verfügbarkeitssignal
- Neue Headline + Subcopy
- Reduzierte CTAs
- Logo-Leiste (Platzhalter, bis du Logos hast)

**Phase 3 — Neue "Was ich bauen kann"-Sektion**
- Drei Service-Karten

**Phase 4 — Case Studies umbauen**
- Problem/Lösung/Ergebnis-Format pro Projekt
- Akkordeons raus, alles direkt sichtbar

**Phase 5 — Restliche Sektionen aufräumen**
- Timeline schlanker
- Skills statt Matrix

**Phase 6 — Kontaktformular mit Resend**
- `resend`, `react-hook-form`, `zod` installieren
- `app/api/contact/route.ts` mit Zod-Validierung + Honeypot
- Kontakt-Komponente (zweispaltig: Direktkontakt + Formular)
- Erfolg/Fehler-States, Inline-Validierung
- Env Variables in Vercel setzen
- End-to-End-Test (Submit → echte E-Mail im Postfach)

**Phase 7 — Polish**
- Motion zurücknehmen
- Mobile-Check
- Lighthouse-Audit

---

**Was ich von dir brauche, bevor ich anfange:**
1. **Freigabe** des Konzepts (oder Anpassungen)
2. **Resend API Key** — kann auch erst zu Phase 6 nachgereicht werden; bis dahin baue ich alles bis inkl. Phase 5
3. **Sender-Domain-Entscheidung:** verifizierte Eigen-Domain bei Resend oder Start mit `onboarding@resend.dev`?
4. **Optional:** ein oder zwei Testimonials von Florian / Kunden (kann auch nachgereicht werden)
5. **Optional:** echte Logos der Auftraggeber (florianmatthias-Logo, Translogica-Logo) — falls nicht, baue ich Text-Badges

Sobald du grünes Licht gibst, starte ich mit Phase 1.
