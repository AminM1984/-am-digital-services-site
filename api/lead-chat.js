const SYSTEM_PROMPT = `Du bist ein professioneller KI-Leadqualifizierungs-Agent für AM Digital Services (Deutschland).
AM Digital Services bietet digitale Dienstleistungen für kleine und mittlere Unternehmen an, insbesondere:
- Website / Landingpage (Redesign, One-Pager, Conversion-Optimierung)
- Automatisierungen (z. B. n8n, E-Mail-Workflows, Lead-Routing, CRM-Anbindung)
- KI-Lösungen (Chatbots/Agenten, Lead-Qualifizierung, Support-Automatisierung)
- Beratung zur digitalen Prozessoptimierung

Ziel:
Erfasse strukturierte, vollständige und verwertbare Kundenanfragen (Leads), damit der Geschäftsführer die Anfrage sofort beurteilen und priorisieren kann.

GRUNDREGELN:
- Sei freundlich, professionell und effizient.
- Stelle immer nur eine Frage gleichzeitig.
- Führe den Kunden klar durch den Prozess (kurze, präzise Fragen).
- Gib keine verbindlichen Preiszusagen oder Garantien.
- Keine Rechtsberatung.
- Keine langen Erklärungen oder Technik-Vorträge: Fokus auf Lead-Erfassung.
- Wenn Informationen unklar sind, frage gezielt nach.

PFLICHTFELDER:
- Vollständiger Name
- Telefonnummer ODER E-Mail
- PLZ und Ort
- Art der Anfrage (Website / Automatisierung / KI / Sonstiges)
- Projektbeschreibung mit ausreichender Detailtiefe
- Dringlichkeit (sofort / zeitnah / flexibel)

OPTIONAL:
- Budgetrahmen
- Wunschtermin für Rückruf/Call
- Unternehmensname + Branche

WICHTIG:
- Stelle wirklich nur EINE Frage pro Antwort.
- Gib kurze Antworten.
- Wenn alle Pflichtfelder vollständig sind, setze lead_complete auf true.
- Wenn Informationen fehlen, setze lead_complete auf false und frage gezielt nach.
- Nutze für art_der_anfrage nur: Website, Automatisierung, KI, Sonstiges.
- Nutze für dringlichkeit nur: sofort, zeitnah, flexibel.
- Fülle extracted nur mit neu extrahierten oder korrigierten Werten; Unbekanntes als leerer String.`;

const JSON_SCHEMA = {
  name: 'lead_agent_turn',
  strict: true,
  schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      assistant_message: { type: 'string' },
      lead_complete: { type: 'boolean' },
      suggested_replies: {
        type: 'array',
        items: { type: 'string' },
        maxItems: 4
      },
      extracted: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: { type: 'string' },
          telefon: { type: 'string' },
          email: { type: 'string' },
          plz_ort: { type: 'string' },
          art_der_anfrage: { type: 'string' },
          projektbeschreibung: { type: 'string' },
          dringlichkeit: { type: 'string' },
          budget: { type: 'string' },
          wunschtermin: { type: 'string' },
          unternehmen_branche: { type: 'string' }
        },
        required: [
          'name',
          'telefon',
          'email',
          'plz_ort',
          'art_der_anfrage',
          'projektbeschreibung',
          'dringlichkeit',
          'budget',
          'wunschtermin',
          'unternehmen_branche'
        ]
      }
    },
    required: ['assistant_message', 'lead_complete', 'suggested_replies', 'extracted']
  }
};

const normalizeHistory = (history) => {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter((item) => item && typeof item === 'object')
    .map((item) => {
      const role = item.role === 'assistant' ? 'assistant' : 'user';
      return {
        role,
        content: String(item.text || '').slice(0, 2000)
      };
    })
    .filter((item) => item.content);
};

const defaultResult = () => ({
  assistant_message: 'Können Sie Ihr Anliegen bitte kurz konkretisieren?',
  lead_complete: false,
  suggested_replies: [],
  extracted: {
    name: '',
    telefon: '',
    email: '',
    plz_ort: '',
    art_der_anfrage: '',
    projektbeschreibung: '',
    dringlichkeit: '',
    budget: '',
    wunschtermin: '',
    unternehmen_branche: ''
  }
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'OPENAI_API_KEY fehlt auf dem Server.' });
    return;
  }

  const body = req.body || {};
  const userMessage = String(body.user_message || '').slice(0, 2000);
  const leadState = body.lead_state && typeof body.lead_state === 'object' ? body.lead_state : {};
  const history = normalizeHistory(body.history);

  if (!userMessage) {
    res.status(400).json({ error: 'user_message fehlt.' });
    return;
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const contextMessage = `Aktueller Lead-Stand (JSON):\n${JSON.stringify(leadState)}\n\nKundennachricht:\n${userMessage}`;

  try {
    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history,
          { role: 'user', content: contextMessage }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: JSON_SCHEMA
        }
      })
    });

    if (!openAiResponse.ok) {
      const errText = await openAiResponse.text();
      res.status(502).json({ error: 'OpenAI request failed', detail: errText.slice(0, 2000) });
      return;
    }

    const payload = await openAiResponse.json();
    const raw = payload?.choices?.[0]?.message?.content;

    if (!raw) {
      res.status(502).json({ error: 'Leere OpenAI-Antwort.' });
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = defaultResult();
      parsed.assistant_message = 'Danke für die Info. Können Sie das bitte noch kurz präzisieren?';
    }

    const safe = {
      ...defaultResult(),
      ...parsed,
      extracted: {
        ...defaultResult().extracted,
        ...(parsed.extracted || {})
      },
      suggested_replies: Array.isArray(parsed.suggested_replies)
        ? parsed.suggested_replies.slice(0, 4).map((v) => String(v))
        : []
    };

    res.status(200).json(safe);
  } catch (error) {
    res.status(500).json({ error: 'Serverfehler beim Lead-Chat.' });
  }
}
