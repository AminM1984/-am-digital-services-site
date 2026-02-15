const API_URL = window.LEAD_AGENT_API_URL || '/api/lead-chat';

const leadState = {
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
};

const el = {
  root: document.getElementById('lead-agent'),
  log: document.getElementById('lead-agent-log'),
  quick: document.getElementById('lead-agent-quick'),
  form: document.getElementById('lead-agent-form'),
  input: document.getElementById('lead-agent-input'),
  restart: document.getElementById('lead-agent-restart')
};

if (el.root && el.log && el.quick && el.form && el.input && el.restart) {
  const history = [];
  let completed = false;
  let busy = false;

  const requiredComplete = (lead) => {
    const hasContact = !!(lead.telefon || lead.email);
    return Boolean(
      lead.name &&
      lead.plz_ort &&
      lead.art_der_anfrage &&
      lead.projektbeschreibung &&
      lead.projektbeschreibung.length >= 20 &&
      lead.dringlichkeit &&
      hasContact
    );
  };

  const sanitize = (value) => (value || '').trim();

  const mergeLead = (incoming) => {
    if (!incoming || typeof incoming !== 'object') {
      return;
    }

    Object.keys(leadState).forEach((key) => {
      const value = sanitize(incoming[key]);
      if (!value) {
        return;
      }
      leadState[key] = value;
    });
  };

  const appendMessage = (role, text, extraClass = '') => {
    const node = document.createElement('div');
    node.className = `chat-msg ${role} ${extraClass}`.trim();
    node.textContent = text;
    el.log.appendChild(node);
    el.log.scrollTop = el.log.scrollHeight;
  };

  const appendHtmlMessage = (role, html, extraClass = '') => {
    const node = document.createElement('div');
    node.className = `chat-msg ${role} ${extraClass}`.trim();
    node.innerHTML = html;
    el.log.appendChild(node);
    el.log.scrollTop = el.log.scrollHeight;
  };

  const setQuickReplies = (items) => {
    el.quick.innerHTML = '';

    if (!Array.isArray(items) || !items.length || completed) {
      return;
    }

    items.slice(0, 4).forEach((label) => {
      const value = sanitize(label);
      if (!value) {
        return;
      }
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quick-btn';
      button.textContent = value;
      button.addEventListener('click', () => handleUserInput(value));
      el.quick.appendChild(button);
    });
  };

  const setBusy = (value) => {
    busy = value;
    el.input.disabled = value || completed;
    const submitBtn = el.form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = value || completed;
      submitBtn.textContent = value ? 'Wird gesendet ...' : 'Senden';
    }
  };

  const renderCompletion = () => {
    completed = true;
    setQuickReplies([]);
    appendMessage('bot', 'Vielen Dank für Ihre Anfrage. AM Digital Services meldet sich zeitnah bei Ihnen.');

    setBusy(false);
    el.input.disabled = true;
  };

  const callAgent = async (userMessage) => {
    setBusy(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_message: userMessage,
          lead_state: leadState,
          history: history.slice(-14)
        })
      });

      if (!response.ok) {
        throw new Error(`API Fehler: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = sanitize(data.assistant_message) || 'Danke. Können Sie das bitte kurz präzisieren?';

      mergeLead(data.extracted || {});
      appendMessage('bot', assistantMessage);
      history.push({ role: 'assistant', text: assistantMessage });
      setQuickReplies(data.suggested_replies || []);

      const modelWantsFinish = Boolean(data.lead_complete);
      if (modelWantsFinish && requiredComplete(leadState)) {
        renderCompletion();
        return;
      }

      if (modelWantsFinish && !requiredComplete(leadState)) {
        appendMessage('bot', 'Es fehlen noch Pflichtangaben (Name, Kontakt, PLZ/Ort, Anfrageart, Projektdetails und Dringlichkeit). Ich stelle dazu jetzt gezielte Nachfragen.');
      }

      setBusy(false);
    } catch (error) {
      appendMessage('bot', 'Der KI-Lead-Agent ist gerade nicht erreichbar. Bitte versuchen Sie es in 1-2 Minuten erneut oder nutzen Sie vorübergehend WhatsApp.');
      setBusy(false);
    }
  };

  const handleUserInput = async (rawValue) => {
    if (busy || completed) {
      return;
    }

    const value = sanitize(rawValue);
    if (!value) {
      return;
    }

    appendMessage('user', value);
    history.push({ role: 'user', text: value });
    el.input.value = '';
    setQuickReplies([]);
    await callAgent(value);
  };

  const startConversation = async () => {
    completed = false;
    setBusy(false);
    el.log.innerHTML = '';
    el.quick.innerHTML = '';
    Object.keys(leadState).forEach((key) => {
      leadState[key] = '';
    });
    history.length = 0;

    appendMessage('bot', 'Hallo und willkommen bei AM Digital Services. Ich erfasse Ihre Anfrage strukturiert und stelle immer nur eine Frage.');
    history.push({ role: 'assistant', text: 'Hallo und willkommen bei AM Digital Services. Ich erfasse Ihre Anfrage strukturiert und stelle immer nur eine Frage.' });

    await callAgent('__START__');
  };

  el.form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await handleUserInput(el.input.value);
  });

  el.restart.addEventListener('click', async () => {
    await startConversation();
  });

  startConversation();
}
