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

### WhatsApp-Benachrichtigung direkt über Meta Cloud API (optional)
Der Server kann bei vollständigem Lead eine WhatsApp-Nachricht direkt über die Meta Graph API senden.

Vercel Environment Variables:
- `WHATSAPP_CLOUD_ACCESS_TOKEN=...`
- `WHATSAPP_PHONE_NUMBER_ID=...`
- `WHATSAPP_TO_NUMBER=4915XXXXXXXX`
- optional: `WHATSAPP_GRAPH_VERSION=v22.0`

Hinweis:
- Der Versand nutzt aktuell eine direkte Textnachricht.
- Abhängig vom WhatsApp-Policy-Fenster kann in Produktion eine Template-Nachricht erforderlich sein.

### Deployment-Hinweis
- Die Datei `api/lead-chat.js` ist als Serverless-Endpoint ausgelegt (z. B. Vercel).
- Der Frontend-Chat ruft standardmäßig `'/api/lead-chat'` auf.
- Falls dein API-Endpoint extern liegt, setze vor `lead-agent.js`:
  - `window.LEAD_AGENT_API_URL = 'https://dein-endpoint/lead-chat';`
