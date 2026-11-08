// The three specs the skill shows and the demo draws, kept in one place so the two cannot drift.
//
// Compact JSON on one line each: what a bot actually writes between <hui-ui> and </hui-ui>. Real Agentise data (bots
// Branco, Dex, Preto, the routines they run), never placeholder text — an example that lies teaches the model to lie.
export type IuiExample = { id: string; title: string; json: string }

export const EXAMPLES: IuiExample[] = [
  {
    id: 'plan',
    title: 'Plan avec Checklist et boutons',
    json: '{"root":"r","elements":{"r":{"type":"Card","props":{"title":"Réparer nightly-report","description":"Trois étapes avant la relance de cette nuit.","meta":"3 étapes · 44 s"},"children":["c","b1","b2"]},"c":{"type":"Checklist","props":{"items":[{"label":"Lire le journal du dernier passage","status":"done","detail":"38 s"},{"label":"Repérer la fuite de mémoire du worker","status":"running","detail":"en cours"},{"label":"Relancer sur le bot Branco","status":"todo","detail":"23:00"}]}},"b1":{"type":"Button","props":{"label":"Relancer maintenant","variant":"primary","action":{"name":"send","params":{"text":"Relance nightly-report maintenant"}}}},"b2":{"type":"Button","props":{"label":"Montrer le journal","variant":"secondary","action":{"name":"send","params":{"text":"Montre les 20 dernières lignes du journal de nightly-report"}}}}}}'
  },
  {
    id: 'comparaison',
    title: 'Comparaison en tableau, deux chiffres',
    json: '{"root":"r","elements":{"r":{"type":"Stack","props":{"direction":"column","gap":"md"},"children":["g","t"]},"g":{"type":"Grid","props":{"columns":2},"children":["m1","m2"]},"m1":{"type":"Metric","props":{"label":"Coût par passage, Preto","value":"0,42 €","delta":"−18 % sur 7 jours","status":"ok"}},"m2":{"type":"Metric","props":{"label":"Durée médiane, Branco","value":"38 s","delta":"+6 s","status":"warn"}},"t":{"type":"Table","props":{"title":"Trois routines, dernier passage","columns":[{"key":"routine","label":"Routine"},{"key":"bot","label":"Bot"},{"key":"duree","label":"Durée","align":"end"},{"key":"cout","label":"Coût","align":"end"},{"key":"etat","label":"État"}],"rows":[{"routine":"nightly-report","bot":"Branco","duree":"38 s","cout":"0,41 €","etat":"Échec"},{"routine":"inbox-triage","bot":"Dex","duree":"12 s","cout":"0,08 €","etat":"Réussi"},{"routine":"veille-prix","bot":"Preto","duree":"54 s","cout":"0,42 €","etat":"Lent"},{"routine":"backup-cache","bot":"Branco","duree":"67 s","cout":"0,19 €","etat":"Réussi"},{"routine":"digest-slack","bot":"Preto","duree":"21 s","cout":"0,12 €","etat":"Réussi"}]}}}}'
  },
  {
    id: 'formulaire',
    title: 'Formulaire avec compteur, choix et envoi',
    json: '{"root":"r","elements":{"r":{"type":"Card","props":{"title":"Réserver la chambre d’hôte","description":"Nuit du 12 novembre, chez Ilyass.","meta":"Estimation 96 €"},"children":["s","c","b"]},"s":{"type":"Stepper","props":{"label":"Personnes","min":1,"max":6,"value":{"$bindState":"/guests"}}},"c":{"type":"Choice","props":{"label":"Formule","options":[{"value":"nuit","label":"Nuit et petit-déjeuner"},{"value":"journee","label":"Journée seule"}],"value":{"$bindState":"/formule"}}},"b":{"type":"Button","props":{"label":"Demander la réservation","variant":"primary","action":{"name":"send","params":{"text":"Réserve pour {{/guests}} personnes, formule {{/formule}}"}}}}},"state":{"guests":2,"formule":"nuit"}}'
  }
]

/** The three specs as a fenced block for the skill, one per line so the model reads the shape it must write. */
export function exampleBlock(example: IuiExample): string {
  return ['```', `<hui-ui>${example.json}</hui-ui>`, '```'].join('\n')
}
