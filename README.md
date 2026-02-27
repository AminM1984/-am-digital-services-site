# -am-digital-services-site
Website 

## KI-Lead-Chat (OpenAI)

Der Lead-Agent im Kontaktbereich nutzt jetzt eine Server-API unter `api/lead-chat.js`.

### Wichtig
- Den OpenAI-Key **nicht** im Frontend eintragen.
- Setze den Key nur als Server-Umgebungsvariable:
  - `OPENAI_API_KEY=...`
  - optional: `OPENAI_MODEL=gpt-4o-mini`

### Automatischer Lead-Mailversand (optional, empfohlen)
Der Server kann bei vollständigem Lead automatisch eine E-Mail senden.

Vercel Environment Variables:
- `RESEND_API_KEY=...`
- `LEAD_TO_EMAIL=deine-adresse@example.com`
- optional: `LEAD_FROM_EMAIL=onboarding@resend.dev` (oder eigene verifizierte Domain-Adresse)

### WhatsApp-Benachrichtigung für neue Leads (optional)
Zusätzlich kann der Server bei vollständigem Lead einen Webhook aufrufen (z. B. n8n), der die Nachricht per WhatsApp verschickt.

Vercel Environment Variables:
- `LEAD_WHATSAPP_WEBHOOK_URL=https://dein-webhook-endpoint`
- optional: `LEAD_WHATSAPP_WEBHOOK_TOKEN=dein_geheimer_token`

Webhook-Payload (POST, JSON):
- `event`: `lead_completed`
- `source`: `am-digital-services-site`
- `created_at`: ISO-Zeitstempel
- `summary`: formatierte Lead-Zusammenfassung
- `lead`: strukturiertes Lead-Objekt

### Deployment-Hinweis
- Die Datei `api/lead-chat.js` ist als Serverless-Endpoint ausgelegt (z. B. Vercel).
- Der Frontend-Chat ruft standardmäßig `'/api/lead-chat'` auf.
- Falls dein API-Endpoint extern liegt, setze vor `lead-agent.js`:
  - `window.LEAD_AGENT_API_URL = 'https://dein-endpoint/lead-chat';`
