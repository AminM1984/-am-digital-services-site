# GEO Audit Report: AM Digital Services

**Audit-Datum:** 2026-03-13  
**URL:** https://am-digital-services.de  
**Business-Typ:** Freelance Digital Agency / Local Business  
**Seiten analysiert:** 4  
**Betreiber:** Amin Moukhmalji, Bornheim, NRW

---

## Executive Summary

**Gesamtpunktzahl: 40/100 — Critical**

am-digital-services.de hat eine solide technische Grundlage: statisches HTML, alle KI-Crawler zugelassen, saubere Security-Headers und bereits mehrere Schema-Typen. Die größten Schwachstellen sind **fehlende KI-Citability** (kein FAQ-Content, kein Blog), **minimale Brand Authority** (keine Drittplattform-Erwähnungen) und **kein llms.txt**. Ohne diese Elemente ist die Wahrscheinlichkeit, von ChatGPT, Perplexity oder Google AI Overviews zitiert zu werden, sehr gering.

---

## Score-Übersicht

| Kategorie | Score | Gewichtung | Gewichteter Score |
|---|---|---|---|
| KI-Citability | 41/100 | 25% | 10,3 |
| Brand Authority | 15/100 | 20% | 3,0 |
| Content E-E-A-T | 41/100 | 20% | 8,2 |
| Technisches GEO | 74/100 | 15% | 11,1 |
| Schema & Structured Data | 58/100 | 10% | 5,8 |
| Plattform-Optimierung | 20/100 | 10% | 2,0 |
| **Gesamt-GEO-Score** | | | **40/100** |

> **Hinweis:** Technischer GEO-Score wurde nach vollständiger Agent-Auswertung auf 74/100 korrigiert (vorläufige Schätzung war 65). E-E-A-T auf 41/100 (Schätzung war 45). Gesamt-GEO-Score bleibt bei ~40/100.

---

## Kritische Probleme (sofort beheben)

### 1. Kein llms.txt vorhanden
`https://am-digital-services.de/llms.txt` → 404. llms.txt ist der Standard damit KI-Systeme die Seitenstruktur strukturiert erfassen können. Ohne sie hat kein KI-Crawler eine Übersicht über dein Angebot.  
**Fix:** `llms.txt` in Root-Verzeichnis erstellen. Vorlage am Ende dieses Reports.

### 2. Keine zitierfähigen Antwort-Blöcke
Kein Content-Block erzielt über 47/100 Citability. KI-Systeme zitieren Inhalte die konkrete Fragen vollständig beantworten. Die aktuelle Homepage ist als Marketing-Text formuliert, nicht als Informationsressource.  
**Fix:** FAQ-Sektion mit mindestens 6–8 vollständigen Frage-Antwort-Paaren.

### 3. Brand Authority nahezu nicht vorhanden
Keine bestätigten Drittplattform-Erwähnungen. LinkedIn nicht verlinkt, kein YouTube, keine Reddit-Posts, keine Gastartikel.  
**Fix:** LinkedIn-Profil erstellen + in sameAs verlinken. GitHub mit öffentlichen Projekten. 1–2 Artikel auf Dev.to oder Medium.

---

## Hohe Priorität (innerhalb 1 Woche)

### 4. sameAs-URLs unvollständig und nicht-kanonisch
- Fiverr: `de.fiverr.com/s/yvQPgQ6` ist ein Shortlink-Redirect (kann kaputtgehen)
- Facebook: `facebook.com/share/1Ar9dCcg85/` ist eine Share-URL, keine Seiten-URL
- LinkedIn fehlt komplett — wichtigstes fehlendes Signal für professionelle Identitätsverifikation

### 5. Person-Schema ohne @id, Bild und LinkedIn
KI-Systeme können "Amin Moukhmalji" ohne @id URI und LinkedIn nicht als verifizierten Wissensgraphen-Knoten auflösen.

### 6. kontakt.html ohne Schema-Markup
Die Kontaktseite hat keinerlei strukturierte Daten. ContactPage + BreadcrumbList ergänzen.

---

## Mittlere Priorität (innerhalb 1 Monat)

### 7. Kein FAQPage-Schema
Die Seite hat inhaltlich FAQ-taugliche Abschnitte ("Warum scheitern digitale Projekte?", 3-Schritte-Prozess). FAQPage-Schema direkt einsetzbar.

### 8. Kein Blog / keine Artikel
4 Seiten insgesamt. Ohne tiefe Inhalte gibt es für KI-Systeme nichts zu zitieren. Monatlich 1–2 kurze Artikel würden den GEO-Score erheblich steigern.

### 9. Keine Testimonials / Reviews
Kein Kundenzitat, keine Bewertung, kein Review-Schema. E-E-A-T dadurch kaum nachweisbar.

### 10. SoftwareApplication ohne aggregateRating
TodoFox hat kein aggregateRating — das primäre Rich-Result-Signal für App-Schemas.

---

## Quick Wins (diese Woche, ~2h Aufwand gesamt)

1. **llms.txt erstellen** → sofortiger Gewinn für alle KI-Crawler (30 min)
2. **LinkedIn-URL in sameAs** → wichtigstes fehlendes Authority-Signal (5 min)
3. **sameAs-URLs korrigieren** → Fiverr & Facebook Shortlinks durch kanonische URLs ersetzen (10 min)
4. **@id auf LocalBusiness und Person** → Cross-Referenzen im Wissensgraphen (20 min)
5. **FAQPage-Schema** → 4 Fragen aus vorhandenem Content extrahieren (45 min)

---

## 30-Tage-Aktionsplan

### Woche 1: Technische Grundlagen
- [ ] `llms.txt` erstellen und deployen
- [ ] Schema: @id, kanonische sameAs-URLs, FAQPage
- [ ] LinkedIn-Profil vollständig ausfüllen und verlinken
- [ ] kontakt.html Schema ergänzen

### Woche 2: Content-Citability
- [ ] FAQ-Sektion auf der Homepage (6–8 Fragen)
- [ ] Service-Blöcke mit konkretem Use-Case und Ergebnis erweitern
- [ ] "Über mich" mit spezifischen Angaben anreichern (Jahre, Tech-Stack, Projekttypen)

### Woche 3: Brand Authority
- [ ] GitHub-Profil mit öffentlichen Projekten erstellen/aktualisieren
- [ ] Ersten Artikel auf Dev.to oder Medium veröffentlichen
- [ ] 2–3 Kundenzitate einholen und auf Homepage einbauen

### Woche 4: Monitoring
- [ ] Google Search Console auf Index-Fehler prüfen
- [ ] Bing Webmaster Tools einrichten
- [ ] TodoFox App Store Seite für aggregateRating optimieren
- [ ] llms.txt auf Vollständigkeit prüfen

---

## Detailanalyse: Schema & Structured Data (58/100)

| Schema-Typ | Status | Hauptproblem |
|---|---|---|
| LocalBusiness | Teilweise | Kein @id, sameAs 3 Plattformen (2 nicht-kanonisch), kein foundingDate |
| Person | Teilweise | Kein @id, kein Bild, sameAs 2 Plattformen, kein LinkedIn |
| WebSite | Gut | Nur potentialAction/SearchAction fehlt |
| SoftwareApplication (TodoFox) | Gut | Kein aggregateRating, kein screenshot |
| WebPage + speakable | Gut | Korrekt implementiert ✅ |
| FAQPage | **Fehlt** | Q&A-Content vorhanden aber kein Schema |
| BreadcrumbList | **Fehlt** | Auf keiner Seite vorhanden |
| ContactPage (kontakt.html) | **Fehlt** | Keinerlei Schema |

---

## Detailanalyse: Technisches GEO (74/100)

| Signal | Status |
|---|---|
| GPTBot erlaubt in robots.txt | ✅ |
| ClaudeBot erlaubt | ✅ |
| PerplexityBot erlaubt | ✅ |
| Google-Extended erlaubt | ✅ |
| Statisches HTML — kein JS-Rendering-Risiko | ✅ BEST CASE |
| Canonical-Tags | ✅ |
| Open Graph Tags | ✅ |
| Twitter Card | ✅ |
| HTTPS + HSTS (preload) | ✅ |
| X-Frame-Options, nosniff, Referrer-Policy | ✅ |
| Sitemap vorhanden + in robots.txt deklariert | ✅ |
| speakable-Schema auf Homepage | ✅ |
| Content-Security-Policy (CSP) | ❌ FEHLT |
| llms.txt | ❌ FEHLT |
| OG/Twitter Image: SVG statt PNG/JPG | ⚠️ Problem |
| Bilder ohne width/height Attribute (CLS-Risiko) | ⚠️ Foto2, Foto3, Logo |
| Meta Description zu kurz (99 Zeichen, Optimal: 150–160) | ⚠️ |
| Blog / Content-Tiefe | ❌ FEHLT |
| Interne Verlinkungsstruktur | Schwach (4 Seiten) |

---

## Empfohlene llms.txt (direkt einsetzbar)

```
# AM Digital Services

AM Digital Services ist ein Freelance-Entwickler-Studio von Amin Moukhmalji
mit Sitz in Bornheim, Nordrhein-Westfalen, Deutschland.
Spezialisierung: Websites, iOS/Android Apps und digitale Lösungen für KMU.

## Leistungen
- Web-Entwicklung: Moderne responsive Websites mit Performance- und Conversion-Fokus
- App-Entwicklung: Native und Cross-Platform Apps für iOS und Android
- Digitale Lösungen: Individuelle Tools, Prozessautomatisierung und KI-Integration

## Projekte
- TodoFox: iOS-Produktivitäts-App (live im Apple App Store, id6755613811)
- FamilyPilot: Familienorganisations-App iOS & Android (in Entwicklung)
- Betscope AI: Sportwetten-Analyse-Dashboard, Web (in Entwicklung)

## Kontakt
- Website: https://am-digital-services.de
- E-Mail: info@am-digital-services.de
- Telefon: +49 1512 3035854
- Adresse: Buschgasse 36, 53332 Bornheim, Deutschland

## Seiten
- https://am-digital-services.de/
- https://am-digital-services.de/kontakt.html
- https://am-digital-services.de/impressum.html
- https://am-digital-services.de/datenschutz.html
```

---

*Erstellt mit Claude Code GEO-Audit-Skill | am-digital-services.de | 2026-03-13*
