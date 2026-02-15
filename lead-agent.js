const LEAD_AGENT_PROMPT = `Du bist ein professioneller KI-Leadqualifizierungs-Agent für AM Digital Services (Deutschland).
Ziel: Strukturierte, vollständige und verwertbare Kundenanfragen erfassen.
Regeln: freundlich, professionell, effizient, immer nur eine Frage gleichzeitig, keine Preiszusagen/Garantien, keine Rechtsberatung.`;

const el = {
  root: document.getElementById('lead-agent'),
  log: document.getElementById('lead-agent-log'),
  quick: document.getElementById('lead-agent-quick'),
  form: document.getElementById('lead-agent-form'),
  input: document.getElementById('lead-agent-input'),
  restart: document.getElementById('lead-agent-restart')
};

if (el.root && el.log && el.quick && el.form && el.input && el.restart) {
  const state = {
    name: '',
    telefon: '',
    email: '',
    plz_ort: '',
    art_der_anfrage: '',
    projektbeschreibung: '',
    dringlichkeit: '',
    budget: '',
    wunschtermin: '',
    unternehmen_branche: '',
    detailBuffer: {}
  };

  const typeLabels = {
    website: 'Website',
    automatisierung: 'Automatisierung',
    ki: 'KI',
    sonstiges: 'Sonstiges'
  };

  let currentStep = null;
  let completed = false;

  const sanitize = (value) => (value || '').trim();
  const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
  const validPhone = (value) => /^(\+?[0-9][0-9\s\-/]{6,})$/i.test(value.replace(/[()]/g, ''));

  const appendMessage = (role, text, extraClass = '') => {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${role} ${extraClass}`.trim();
    msg.textContent = text;
    el.log.appendChild(msg);
    el.log.scrollTop = el.log.scrollHeight;
  };

  const appendHTMLMessage = (role, html, extraClass = '') => {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${role} ${extraClass}`.trim();
    msg.innerHTML = html;
    el.log.appendChild(msg);
    el.log.scrollTop = el.log.scrollHeight;
  };

  const setQuickReplies = (options) => {
    el.quick.innerHTML = '';
    if (!options || !options.length || completed) {
      return;
    }

    options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quick-btn';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => handleUserInput(opt.value));
      el.quick.appendChild(btn);
    });
  };

  const askStep = (step) => {
    currentStep = step;
    appendMessage('bot', step.question);
    setQuickReplies(step.quick || []);
    el.input.placeholder = step.placeholder || 'Ihre Antwort eingeben ...';
    el.input.disabled = !!step.readonly;
  };

  const getNextDetailStep = () => {
    if (state.art_der_anfrage === 'Website') {
      if (!state.detailBuffer.website_ziel) {
        return {
          id: 'website_ziel',
          question: 'Was ist das Hauptziel der Website? (Leads, Bewerbungen, Verkauf, Information)',
          placeholder: 'z. B. Mehr Anfragen über die Website'
        };
      }
      if (!state.detailBuffer.website_umfang) {
        return {
          id: 'website_umfang',
          question: 'Welchen Umfang planen Sie? (One-Pager, mehrere Seiten oder Shop)',
          quick: [
            { label: 'One-Pager', value: 'One-Pager' },
            { label: 'Mehrere Seiten', value: 'Mehrere Seiten' },
            { label: 'Shop', value: 'Shop' }
          ]
        };
      }
      if (!state.detailBuffer.website_bestand) {
        return {
          id: 'website_bestand',
          question: 'Gibt es bereits eine Website? Falls ja, bitte URL angeben.',
          placeholder: 'z. B. Nein oder https://...'
        };
      }
      if (!state.detailBuffer.website_inhalte) {
        return {
          id: 'website_inhalte',
          question: 'Welche wichtigsten Seiten oder Funktionen sind relevant? (z. B. Kontakt, Terminbuchung, Mehrsprachigkeit)',
          placeholder: 'z. B. Startseite, Leistungen, Kontakt, Terminbuchung'
        };
      }
      if (!state.detailBuffer.website_zeitrahmen) {
        return {
          id: 'website_zeitrahmen',
          question: 'Bis wann soll die Website idealerweise live gehen?',
          placeholder: 'z. B. in 6 Wochen'
        };
      }
      return null;
    }

    if (state.art_der_anfrage === 'Automatisierung') {
      if (!state.detailBuffer.auto_prozess) {
        return {
          id: 'auto_prozess',
          question: 'Welcher Prozess soll automatisiert werden?',
          placeholder: 'z. B. Lead-Weiterleitung von Formular zu CRM + Mail'
        };
      }
      if (!state.detailBuffer.auto_systeme) {
        return {
          id: 'auto_systeme',
          question: 'Welche Systeme sind beteiligt? (z. B. Gmail, HubSpot, Pipedrive, Notion, WooCommerce)',
          placeholder: 'z. B. Website-Formular, Gmail, HubSpot'
        };
      }
      if (!state.detailBuffer.auto_ergebnis) {
        return {
          id: 'auto_ergebnis',
          question: 'Welches konkrete Ergebnis erwarten Sie?',
          placeholder: 'z. B. Jeder Lead automatisch ins CRM + Benachrichtigung'
        };
      }
      if (!state.detailBuffer.auto_volumen) {
        return {
          id: 'auto_volumen',
          question: 'Wie häufig tritt der Prozess auf? (Volumen/Häufigkeit)',
          placeholder: 'z. B. 30 Leads pro Woche'
        };
      }
      return null;
    }

    if (state.art_der_anfrage === 'KI') {
      if (!state.detailBuffer.ki_einsatzort) {
        return {
          id: 'ki_einsatzort',
          question: 'Wo soll der Agent eingesetzt werden? (Website, Support oder intern)',
          quick: [
            { label: 'Website', value: 'Website' },
            { label: 'Support', value: 'Support' },
            { label: 'Interne Prozesse', value: 'Interne Prozesse' }
          ]
        };
      }
      if (!state.detailBuffer.ki_ziel) {
        return {
          id: 'ki_ziel',
          question: 'Was ist das Hauptziel? (Lead-Qualifizierung, FAQ, Terminvereinbarung, Support-Tickets)',
          placeholder: 'z. B. Lead-Qualifizierung + Terminvereinbarung'
        };
      }
      if (!state.detailBuffer.ki_datenquellen) {
        return {
          id: 'ki_datenquellen',
          question: 'Welche Informationen oder Datenquellen sollen genutzt werden? (FAQ, PDFs, Website, Datenbank)',
          placeholder: 'z. B. Website-Inhalte + interne FAQ als PDF'
        };
      }
      if (!state.detailBuffer.ki_uebergabe) {
        return {
          id: 'ki_uebergabe',
          question: 'Wie soll die Übergabe am Ende erfolgen? (E-Mail, CRM, später auch WhatsApp möglich)',
          placeholder: 'z. B. Lead per E-Mail + CRM-Eintrag'
        };
      }
      if (!state.detailBuffer.ki_umfang) {
        return {
          id: 'ki_umfang',
          question: 'Wie umfangreich soll die Lösung zum Start sein?',
          placeholder: 'z. B. MVP mit 20 FAQ + Lead-Erfassung'
        };
      }
      return null;
    }

    if (!state.detailBuffer.sonstiges_ziel) {
      return {
        id: 'sonstiges_ziel',
        question: 'Was ist das konkrete Ziel Ihres Projekts?',
        placeholder: 'z. B. digitale Prozesse vereinfachen und Zeit sparen'
      };
    }

    if (!state.detailBuffer.sonstiges_umfang) {
      return {
        id: 'sonstiges_umfang',
        question: 'Welche Funktionen oder Ergebnisse sind Ihnen besonders wichtig?',
        placeholder: 'z. B. Anfrageformular, interne Übergaben, Auswertungen'
      };
    }

    return null;
  };

  const buildProjectDescription = () => {
    const parts = [];
    const add = (label, value) => {
      if (value) {
        parts.push(`${label}: ${value}`);
      }
    };

    if (state.art_der_anfrage === 'Website') {
      add('Ziel', state.detailBuffer.website_ziel);
      add('Umfang', state.detailBuffer.website_umfang);
      add('Bestehende Website', state.detailBuffer.website_bestand);
      add('Inhalte/Funktionen', state.detailBuffer.website_inhalte);
      add('Zeitrahmen', state.detailBuffer.website_zeitrahmen);
    } else if (state.art_der_anfrage === 'Automatisierung') {
      add('Prozess', state.detailBuffer.auto_prozess);
      add('Systeme', state.detailBuffer.auto_systeme);
      add('Erwartetes Ergebnis', state.detailBuffer.auto_ergebnis);
      add('Volumen/Häufigkeit', state.detailBuffer.auto_volumen);
    } else if (state.art_der_anfrage === 'KI') {
      add('Einsatzort', state.detailBuffer.ki_einsatzort);
      add('Ziel', state.detailBuffer.ki_ziel);
      add('Datenquellen', state.detailBuffer.ki_datenquellen);
      add('Übergabe', state.detailBuffer.ki_uebergabe);
      add('Umfang', state.detailBuffer.ki_umfang);
    } else {
      add('Ziel', state.detailBuffer.sonstiges_ziel);
      add('Wichtige Funktionen/Ergebnisse', state.detailBuffer.sonstiges_umfang);
    }

    return parts.join(' | ');
  };

  const summaryText = () => `--- LEAD ZUSAMMENFASSUNG ---\n\nName: ${state.name}\nTelefon: ${state.telefon}\nE-Mail: ${state.email}\nPLZ / Ort: ${state.plz_ort}\nArt der Anfrage: ${state.art_der_anfrage}\nProjektbeschreibung: ${state.projektbeschreibung}\nDringlichkeit: ${state.dringlichkeit}\nBudget (falls genannt): ${state.budget}\nWunschtermin: ${state.wunschtermin}\n\n--------------------------`;

  const jsonPayload = () => ({
    lead_complete: true,
    name: state.name,
    telefon: state.telefon,
    email: state.email,
    plz_ort: state.plz_ort,
    art_der_anfrage: state.art_der_anfrage,
    projektbeschreibung: state.projektbeschreibung,
    dringlichkeit: state.dringlichkeit,
    budget: state.budget,
    wunschtermin: state.wunschtermin
  });

  const finishLead = () => {
    completed = true;
    currentStep = null;
    setQuickReplies([]);

    const summary = summaryText();
    const payload = JSON.stringify(jsonPayload(), null, 2);

    appendHTMLMessage(
      'bot',
      `<strong>--- LEAD ZUSAMMENFASSUNG ---</strong><div class="lead-summary">\n\nName: ${state.name}\nTelefon: ${state.telefon}\nE-Mail: ${state.email}\nPLZ / Ort: ${state.plz_ort}\nArt der Anfrage: ${state.art_der_anfrage}\nProjektbeschreibung: ${state.projektbeschreibung}\nDringlichkeit: ${state.dringlichkeit}\nBudget (falls genannt): ${state.budget}\nWunschtermin: ${state.wunschtermin}\n\n--------------------------</div><strong>JSON</strong><pre class="lead-json">${payload}</pre>Abschluss: Vielen Dank. AM Digital Services meldet sich zeitnah bei Ihnen.`,
      'lead-result'
    );

    const mailBody = encodeURIComponent(`${summary}\n\nJSON:\n${payload}`);
    const mailTo = `mailto:a.moukhmalji@gmx.de?subject=Neue%20Lead-Anfrage%20AM%20Digital%20Services&body=${mailBody}`;

    const sendButton = document.createElement('a');
    sendButton.className = 'btn btn-primary';
    sendButton.href = mailTo;
    sendButton.textContent = 'Zusammenfassung per E-Mail senden';

    const actionWrap = document.createElement('div');
    actionWrap.className = 'lead-agent-actions';
    actionWrap.appendChild(sendButton);
    el.log.appendChild(actionWrap);
    el.log.scrollTop = el.log.scrollHeight;

    el.input.disabled = true;
  };

  const askClassification = () => {
    askStep({
      id: 'classify',
      question: 'Welche Art von Anfrage passt am besten?',
      quick: [
        { label: 'Website/Redesign/Landingpage', value: 'website' },
        { label: 'Automatisierung/Prozesse', value: 'automatisierung' },
        { label: 'KI-Agent/Chatbot/Support', value: 'ki' },
        { label: 'Sonstiges', value: 'sonstiges' }
      ]
    });
  };

  const continueAfterDetails = () => {
    const desc = buildProjectDescription();
    state.projektbeschreibung = desc;

    if (!desc || desc.length < 24) {
      askStep({
        id: 'detail_refine',
        question: 'Können Sie bitte noch 1-2 konkrete Details ergänzen (Ziel und Umfang/Prozess)?',
        placeholder: 'Bitte Ziel und Umfang genauer beschreiben'
      });
      return;
    }

    askStep({
      id: 'plz_ort',
      question: 'Bitte nennen Sie PLZ und Ort.',
      placeholder: 'z. B. 53332 Bornheim'
    });
  };

  const nextFlowStep = () => {
    if (!state.art_der_anfrage) {
      askClassification();
      return;
    }

    const detailStep = getNextDetailStep();
    if (detailStep) {
      askStep(detailStep);
      return;
    }

    if (!state.projektbeschreibung) {
      continueAfterDetails();
      return;
    }

    if (!state.plz_ort) {
      askStep({
        id: 'plz_ort',
        question: 'Bitte nennen Sie PLZ und Ort.',
        placeholder: 'z. B. 53332 Bornheim'
      });
      return;
    }

    if (!state.name) {
      askStep({
        id: 'name',
        question: 'Wie lautet Ihr vollständiger Name?',
        placeholder: 'Vor- und Nachname'
      });
      return;
    }

    if (!state.telefon && !state.email) {
      askStep({
        id: 'contact',
        question: 'Wie können wir Sie erreichen? Bitte Telefonnummer oder E-Mail angeben (mindestens eins).',
        placeholder: 'z. B. +49... oder name@firma.de'
      });
      return;
    }

    if (!state.dringlichkeit) {
      askStep({
        id: 'dringlichkeit',
        question: 'Wie dringlich ist Ihr Vorhaben?',
        quick: [
          { label: 'Sofort', value: 'sofort' },
          { label: 'Zeitnah', value: 'zeitnah' },
          { label: 'Flexibel', value: 'flexibel' }
        ]
      });
      return;
    }

    if (!state.unternehmen_branche) {
      askStep({
        id: 'unternehmen_branche',
        question: 'Optional: Wie heißt Ihr Unternehmen und in welcher Branche sind Sie tätig? (oder "überspringen")',
        placeholder: 'z. B. Muster GmbH, Handwerk'
      });
      return;
    }

    if (!state.budget) {
      askStep({
        id: 'budget',
        question: 'Optional: Gibt es einen groben Budgetrahmen, an dem wir uns orientieren sollen? (oder "überspringen")',
        placeholder: 'z. B. 3.000 - 5.000 EUR'
      });
      return;
    }

    if (!state.wunschtermin) {
      askStep({
        id: 'wunschtermin',
        question: 'Optional: Möchten Sie einen Rückruf-/Gesprächstermin vorschlagen? (Tag/Uhrzeit oder "überspringen")',
        placeholder: 'z. B. Dienstag 14:00'
      });
      return;
    }

    finishLead();
  };

  const handleDetailInput = (stepId, value) => {
    state.detailBuffer[stepId] = value;
    state.projektbeschreibung = '';
    nextFlowStep();
  };

  const handleUserInput = (rawValue) => {
    if (!currentStep || completed) {
      return;
    }

    const value = sanitize(rawValue);
    if (!value) {
      appendMessage('bot', 'Bitte geben Sie eine kurze Antwort ein.');
      return;
    }

    appendMessage('user', value);

    const skip = ['überspringen', 'skip', '-'].includes(value.toLowerCase());

    if (currentStep.id === 'classify') {
      state.art_der_anfrage = typeLabels[value] || 'Sonstiges';
      nextFlowStep();
      return;
    }

    if (currentStep.id === 'plz_ort') {
      if (value.length < 5) {
        appendMessage('bot', 'Bitte geben Sie PLZ und Ort an, z. B. 53332 Bornheim.');
        return;
      }
      state.plz_ort = value;
      nextFlowStep();
      return;
    }

    if (currentStep.id === 'name') {
      if (value.split(' ').length < 2) {
        appendMessage('bot', 'Bitte vollständigen Namen mit Vor- und Nachname angeben.');
        return;
      }
      state.name = value;
      nextFlowStep();
      return;
    }

    if (currentStep.id === 'contact') {
      if (validEmail(value)) {
        state.email = value;
      } else if (validPhone(value)) {
        state.telefon = value;
      } else {
        appendMessage('bot', 'Bitte eine gültige Telefonnummer oder E-Mail angeben.');
        return;
      }
      nextFlowStep();
      return;
    }

    if (currentStep.id === 'dringlichkeit') {
      const map = { sofort: 'sofort', zeitnah: 'zeitnah', flexibel: 'flexibel' };
      const normalized = map[value.toLowerCase()];
      if (!normalized) {
        appendMessage('bot', 'Bitte wählen Sie sofort, zeitnah oder flexibel.');
        return;
      }
      state.dringlichkeit = normalized;
      nextFlowStep();
      return;
    }

    if (currentStep.id === 'unternehmen_branche') {
      state.unternehmen_branche = skip ? '-' : value;
      nextFlowStep();
      return;
    }

    if (currentStep.id === 'budget') {
      state.budget = skip ? '-' : value;
      nextFlowStep();
      return;
    }

    if (currentStep.id === 'wunschtermin') {
      state.wunschtermin = skip ? '-' : value;
      nextFlowStep();
      return;
    }

    if (currentStep.id === 'detail_refine') {
      state.projektbeschreibung = `${buildProjectDescription()} | Ergänzung: ${value}`;
      nextFlowStep();
      return;
    }

    handleDetailInput(currentStep.id, value);
  };

  const resetState = () => {
    Object.assign(state, {
      name: '',
      telefon: '',
      email: '',
      plz_ort: '',
      art_der_anfrage: '',
      projektbeschreibung: '',
      dringlichkeit: '',
      budget: '',
      wunschtermin: '',
      unternehmen_branche: '',
      detailBuffer: {}
    });
    currentStep = null;
    completed = false;
  };

  const startFlow = () => {
    resetState();
    el.log.innerHTML = '';
    el.quick.innerHTML = '';
    el.input.disabled = false;
    el.input.value = '';

    appendMessage('bot', 'Hallo und willkommen bei AM Digital Services. Ich erfasse Ihre Anfrage strukturiert für eine schnelle Rückmeldung.');
    appendMessage('bot', 'Wobei kann ich Ihnen helfen?');
    askClassification();
  };

  el.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = el.input.value;
    el.input.value = '';
    handleUserInput(value);
  });

  el.restart.addEventListener('click', startFlow);

  startFlow();
}
