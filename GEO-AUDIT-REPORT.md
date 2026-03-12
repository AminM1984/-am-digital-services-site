# GEO Audit Report — am-digital-services.de
**Datum:** 12. März 2026
**Typ:** Vollständiger GEO + SEO Audit
**Business-Typ:** Digital Agency (Freelance, Bornheim, NRW, DE)

---

## Composite GEO Score: 37 / 100 — Poor

| Kategorie | Gewichtung | Score | Gewichtet |
|---|---|---|---|
| AI Citability & Visibility | 25% | 46/100 | 11.5 |
| Brand Authority Signals | 20% | 8/100 | 1.6 |
| Content Quality & E-E-A-T | 20% | 38/100 | 7.6 |
| Technical Foundations | 15% | 71/100 | 10.65 |
| Structured Data | 10% | 28/100 | 2.8 |
| Platform Optimization | 10% | 32/100 | 3.2 |
| **Gesamt** | **100%** | | **37.35 / 100** |

---

## Einzel-Scores im Überblick

| Bereich | Score | Status |
|---|---|---|
| AI Crawler Access | 100/100 | ✅ Perfekt |
| Technical SEO | 71/100 | ✅ Gut |
| AI Citability | 54/100 | ⚠️ Fair |
| Content / E-E-A-T | 38/100 | ❌ Schwach |
| Platform Readiness (Ø) | 32/100 | ❌ Schwach |
| Schema Markup | 28/100 | ❌ Kritisch |
| Brand Mentions | 8/100 | ❌ Kritisch |
| llms.txt | 0/100 | ❌ Fehlt |

### Platform-Scores
| Platform | Score |
|---|---|
| Google AI Overviews | 38/100 |
| Bing Copilot | 36/100 |
| Google Gemini | 35/100 |
| Perplexity AI | 27/100 |
| ChatGPT Web Search | 24/100 |

---

## Stärken

- **Technisch sauber:** Statisches HTML, vollständig server-side gerendert — alle KI-Crawler sehen sofort 100% des Inhalts.
- **AI Crawler Access: 100/100** — robots.txt erlaubt allen Crawlern vollen Zugriff, Sitemap korrekt eingebunden.
- **Mobile-Optimierung:** Responsive Design mit 4 Breakpoints, touch-freundliche Navigation.
- **LocalBusiness Schema:** Vorhanden mit korrekter Adresse, Telefon, E-Mail.
- **Rechtlich compliant:** Impressum, Datenschutz, HTTPS.

---

## Kritische Schwachstellen & Aktionsplan

### 🔴 KRITISCH — Sofortige Wirkung

**1. Brand Mentions: 8/100 — Kaum externe Sichtbarkeit**
KI-Modelle zitieren Quellen, die sie auf vertrauenswürdigen Plattformen wiedererkannt haben.
- Kein Wikipedia-Eintrag
- Kein LinkedIn Company Page (404)
- Keine Reddit-Erwähnungen
- App Store Link (`id6755613811`) gibt 404 zurück — sofort prüfen/reparieren

→ **Aktion:** LinkedIn Company Page erstellen, App Store Link reparieren, Eintrag auf Clutch.co / OMR Reviews / ProvenExpert anlegen.

**2. llms.txt fehlt vollständig — Score: 0/100**
Der neue Standard für KI-Lesbarkeit existiert nicht.

→ **Aktion:** `/llms.txt` erstellen (fertige Vorlage am Ende dieses Reports).

**3. Schema Markup: 28/100 — Kritische Lücken**
- `sameAs` enthält nur Fiverr (Instagram + Facebook im Footer, aber NICHT im Schema)
- Kein `Person`-Schema für Amin Moukhmalji
- `logo` ist SVG (Google bevorzugt PNG/JPEG)
- Keine `Service`-, `SoftwareApplication`- oder `speakable`-Schemas

→ **Aktion:** Schema-Block in `index.html` mit vollständigen Templates aus diesem Report ersetzen.

---

### 🟠 HOCH — Starke Wirkung

**4. Content / E-E-A-T: 38/100 — Zu dünn, zu anonym**
- ~400–500 Wörter gesamt — weit unter dem Standard für Agenturen
- Kein Profilfoto, keine Credentials, keine Berufsjahre
- Kein einziges Kundentestimonial
- Keine Fallstudien mit messbaren Ergebnissen
- KI-generiert wirkender Copy ohne persönliche Stimme

→ **Aktionen:**
  - Echter „Über mich"-Bereich mit Foto, Berufsjahren, Tech-Stack
  - Mindestens 3 Testimonials (Name, Unternehmen, Zitat)
  - TodoFox Case Study auf 300–400 Wörter ausbauen

**5. Fehlende Service-Seiten (Topical Authority = 0)**
Ein Single-Page-Site kann für keine relevante Suchanfrage ranken.

→ **Aktion:** Separate Seiten für `/webentwicklung.html`, `/app-entwicklung.html`, `/ki-automatisierung.html` mit je 600–1.000 Wörtern.

**6. Google Business Profile fehlt**
Wichtigste Aktion für Google Gemini + lokales Ranking.

→ **Aktion:** GBP unter Bornheim-Adresse verifizieren, URL in `sameAs` eintragen.

---

### 🟡 MITTEL — Mittelfristige Wirkung

**7. Sicherheits-Header fehlen (Technical Score: 28/100 für Security)**
HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy alle absent.

→ **Aktion:** `vercel.json` mit Header-Block erstellen (Code am Ende dieses Reports).

**8. Google Fonts: Render-blocking @import in CSS**
`@import` in style.css blockiert Rendering und schadet LCP.

→ **Aktion:** `@import` aus style.css entfernen, durch `<link>`-Tags mit `preconnect` in `<head>` ersetzen.

**9. OG-Image ist SVG (funktioniert nicht auf Social Media)**
Facebook, LinkedIn, WhatsApp ignorieren SVGs beim Link-Preview.

→ **Aktion:** `og-cover.png` (1200×630px) erstellen und in allen 4 HTML-Dateien eintragen.

**10. Bing Webmaster Tools nicht verifiziert**
Kein `msvalidate.01` Meta-Tag → Bing Copilot kennt die Site nicht aktiv.

→ **Aktion:** Domain in Bing Webmaster Tools verifizieren, Sitemap einreichen.

---

### 🟢 NIEDRIG — Langfristige Verbesserung

- FAQ-Sektion hinzufügen (8+ Fragen mit `FAQPage` JSON-LD)
- Blog starten: 3–4 Artikel zu relevanten Themen
- `noindex` für Impressum und Datenschutz-Seiten
- `<link rel="icon">` / Favicon hinzufügen
- Page-Titles auf 55–60 Zeichen mit Geo-Targeting erweitern
- IndexNow für Bing implementieren

---

## Fertige Code-Snippets

### llms.txt (sofort deployen unter /llms.txt)
```
# AM Digital Services

> Freelance-Agentur für Web- und App-Entwicklung in Bornheim, Deutschland.
> Spezialisiert auf moderne Websites, iOS/Android Apps und digitale Lösungen
> für kleine und mittlere Unternehmen.

## Leistungen

- [Web-Entwicklung](https://am-digital-services.de/#leistungen): Responsive Websites mit Performance- und Mobile-Optimierung
- [App-Entwicklung](https://am-digital-services.de/#leistungen): Native und Cross-Platform Apps für iOS und Android
- [Digitale Lösungen](https://am-digital-services.de/#leistungen): Individuelle Workflows und Automatisierungen

## Projekte

- [TodoFox – iOS App](https://apps.apple.com/us/app/todo-fox-aufgabenliste/id6755613811): Produktivitäts-App im Apple App Store

## Kontakt

- [Projektanfrage](https://am-digital-services.de/kontakt.html): Kontaktformular und direkte Anfrage
- [Impressum](https://am-digital-services.de/impressum.html): Rechtliche Informationen
```

### vercel.json Security Headers
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

### Google Fonts Fix (style.css ersetzen durch HTML-Tags in <head>)
```html
<!-- Diese 3 Zeilen in <head> VOR dem style.css <link> einfügen -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
```
Und `@import url('https://fonts.googleapis.com/...')` aus style.css entfernen.

---

## Score-Potenzial nach Umsetzung

| Maßnahme | Score-Impact |
|---|---|
| llms.txt erstellen | +4 Punkte |
| LinkedIn + GBP + sameAs erweitern | +8 Punkte |
| Schema komplett überarbeiten | +6 Punkte |
| Testimonials + Profilfoto | +5 Punkte |
| Service-Seiten aufbauen | +7 Punkte |
| Security Headers | +3 Punkte |
| Blog (3 Artikel) | +5 Punkte |
| **Gesamt-Potenzial** | **~75/100** |
