# -am-digital-services-site
Website 

## KI-Lead-Chat (OpenAI)

Der Lead-Agent im Kontaktbereich nutzt jetzt eine Server-API unter `api/lead-chat.js`.

### Wichtig
- Den OpenAI-Key **nicht** im Frontend eintragen.
- Setze den Key nur als Server-Umgebungsvariable:
  - `OPENAI_API_KEY=...`
  - optional: `OPENAI_MODEL=gpt-4o-mini`

### Deployment-Hinweis
- Die Datei `api/lead-chat.js` ist als Serverless-Endpoint ausgelegt (z. B. Vercel).
- Der Frontend-Chat ruft standardmäßig `'/api/lead-chat'` auf.
- Falls dein API-Endpoint extern liegt, setze vor `lead-agent.js`:
  - `window.LEAD_AGENT_API_URL = 'https://dein-endpoint/lead-chat';`
