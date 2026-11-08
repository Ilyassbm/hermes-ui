---
name: intelligent-ui
description: Use when replying in the Hermes desktop app and the answer is clearer as an interactive card, chart, table, plan, form or choice than as plain text.
---

# Intelligent UI

Le fil de l’app desktop Hermes sait dessiner une interface : cartes, chiffres, tableaux, graphiques, plans, formulaires, choix. Tu écris du texte, puis un bloc `<hui-ui>`, et le fil le rend avec les composants Glaze.

## Quand l’utiliser

- une comparaison : deux options, deux périodes, deux bots ;
- des chiffres qui se lisent mieux alignés qu’en phrase : coûts, durées, taux ;
- un plan d’action, ou le suivi de ses étapes ;
- un choix à faire, ou un réglage avec des quantités ;
- des données tabulaires de plus de quatre lignes ;
- un tableau de bord : deux ou trois chiffres, un graphique, une liste.

## Quand ne pas l’utiliser

- une réponse courte : une phrase suffit, une carte l’alourdit ;
- une conversation : une question, une relance, un remerciement ;
- Telegram, Slack, Discord, l’e-mail, ou toute session dont la source n’est pas l’app desktop : le tag s’afficherait brut, avec son JSON. Dans le doute, écris du texte.

## Règles

1. Du texte d’abord : une ou deux phrases qui donnent la réponse. L’interface la complète, elle ne la remplace pas.
2. Un seul bloc `<hui-ui>` par idée. Deux idées, deux blocs, séparés par du texte.
3. Un JSON compact et valide, sur une ligne ou plusieurs, jamais dans un fence.
4. Des identifiants courts : `"r"`, `"a"`, `"b"`.
5. Des données réelles, prises dans la conversation ou dans ce que les outils ont rendu. Rien d’inventé, aucun jeu d’exemple.
6. Un bouton `send` pour proposer la suite, avec les valeurs du state interpolées : « Réserve pour {{/guests}} personnes ».
7. Un seul bouton `primary` par groupe d’actions ; le reste en `secondary`.
8. Si un composant manque, écris du texte : le catalogue est fermé, un type inconnu n’est pas rendu.

## Exemples

### Plan avec Checklist et boutons

Une réponse à « pourquoi nightly-report échoue », et la suite proposée en deux boutons.

```
<hui-ui>{"root":"r","elements":{"r":{"type":"Card","props":{"title":"Réparer nightly-report","description":"Trois étapes avant la relance de cette nuit.","meta":"3 étapes · 44 s"},"children":["c","b1","b2"]},"c":{"type":"Checklist","props":{"items":[{"label":"Lire le journal du dernier passage","status":"done","detail":"38 s"},{"label":"Repérer la fuite de mémoire du worker","status":"running","detail":"en cours"},{"label":"Relancer sur le bot Branco","status":"todo","detail":"23:00"}]}},"b1":{"type":"Button","props":{"label":"Relancer maintenant","variant":"primary","action":{"name":"send","params":{"text":"Relance nightly-report maintenant"}}}},"b2":{"type":"Button","props":{"label":"Montrer le journal","variant":"secondary","action":{"name":"send","params":{"text":"Montre les 20 dernières lignes du journal de nightly-report"}}}}}}</hui-ui>
```

### Comparaison : Table et Metric

Deux chiffres qui comptent, puis le tableau des cinq dernières lignes comparables.

```
<hui-ui>{"root":"r","elements":{"r":{"type":"Stack","props":{"direction":"column","gap":"md"},"children":["g","t"]},"g":{"type":"Grid","props":{"columns":2},"children":["m1","m2"]},"m1":{"type":"Metric","props":{"label":"Coût par passage, Preto","value":"0,42 €","delta":"−18 % sur 7 jours","status":"ok"}},"m2":{"type":"Metric","props":{"label":"Durée médiane, Branco","value":"38 s","delta":"+6 s","status":"warn"}},"t":{"type":"Table","props":{"title":"Trois routines, dernier passage","columns":[{"key":"routine","label":"Routine"},{"key":"bot","label":"Bot"},{"key":"duree","label":"Durée","align":"end"},{"key":"cout","label":"Coût","align":"end"},{"key":"etat","label":"État"}],"rows":[{"routine":"nightly-report","bot":"Branco","duree":"38 s","cout":"0,41 €","etat":"Échec"},{"routine":"inbox-triage","bot":"Dex","duree":"12 s","cout":"0,08 €","etat":"Réussi"},{"routine":"veille-prix","bot":"Preto","duree":"54 s","cout":"0,42 €","etat":"Lent"},{"routine":"backup-cache","bot":"Branco","duree":"67 s","cout":"0,19 €","etat":"Réussi"},{"routine":"digest-slack","bot":"Preto","duree":"21 s","cout":"0,12 €","etat":"Réussi"}]}}}}</hui-ui>
```

### Formulaire : Stepper, Choice et envoi

Un compteur, un choix, et un bouton qui envoie le state interpolé au bot.

```
<hui-ui>{"root":"r","elements":{"r":{"type":"Card","props":{"title":"Réserver la chambre d’hôte","description":"Nuit du 12 novembre, chez Ilyass.","meta":"Estimation 96 €"},"children":["s","c","b"]},"s":{"type":"Stepper","props":{"label":"Personnes","min":1,"max":6,"value":{"$bindState":"/guests"}}},"c":{"type":"Choice","props":{"label":"Formule","options":[{"value":"nuit","label":"Nuit et petit-déjeuner"},{"value":"journee","label":"Journée seule"}],"value":{"$bindState":"/formule"}}},"b":{"type":"Button","props":{"label":"Demander la réservation","variant":"primary","action":{"name":"send","params":{"text":"Réserve pour {{/guests}} personnes, formule {{/formule}}"}}}}},"state":{"guests":2,"formule":"nuit"}}</hui-ui>
```

## Catalogue

FORMAT
Tu réponds dans le fil d’une conversation de l’app desktop Hermes. Pour une réponse qui se lit mieux en interface, insère un bloc dans ton texte markdown :
<hui-ui>{"root":"r","elements":{"r":{"type":"Card","props":{"title":"Réservation"},"children":["n","b"]},"n":{"type":"Stepper","props":{"label":"Personnes","min":1,"max":8,"value":{"$bindState":"/guests"}}},"b":{"type":"Button","props":{"label":"Réserver","variant":"primary","action":{"name":"send","params":{"text":"Réserve pour {{/guests}} personnes"}}}}},"state":{"guests":2}}</hui-ui>

Un seul objet JSON valide, sur une ligne ou plusieurs, entre <hui-ui> et </hui-ui>. Pas de fence, pas de commentaire, pas de JSONL.
- "root" : la clé de l’élément racine.
- "elements" : clé courte → { "type", "props", "children"?, "visible"? }. "children" liste des clés, dans l’ordre d’affichage.
- "state" : les valeurs de départ des composants interactifs. Un composant lié s’écrit { "$bindState": "/chemin" } et lit sa valeur dans le state.
- "visible" : une condition, par exemple { "$state": "/tab", "eq": "prix" } — voir CONDITIONS.

CONDITIONS
visible accepte { "$state": "/chemin", "eq": "valeur" }, { "neq": "valeur" }, { "gt": n }, { "gte": n }, { "lt": n }, { "lte": n }, { "$state": "/chemin" } (vrai si la valeur existe), un tableau (ET), ou { "$and": [...] } / { "$or": [...] }.
Pour des onglets : un composant Tabs lié à "/tab", et un enfant par onglet avec "visible": { "$state": "/tab", "eq": "<id>" }.

VALEURS DÉRIVÉES
Dans un texte ou un paramètre d’action, {{/chemin}} est remplacé par la valeur du state au moment du clic : "Réserve pour {{/guests}} personnes".

COMPOSANTS
### Card
Une carte : un titre, une phrase, son contenu, et ses boutons dans le pied. Le conteneur d’une réponse qui se lit comme un bloc.
props: { title: string, description?: string, meta?: string }
slots: footer
### Stack
Empile des éléments en ligne ou en colonne, avec un espacement court, moyen ou large.
props: { direction: "row" | "column", gap?: "sm" | "md" | "lg" }
### Grid
Place des éléments côte à côte sur 2, 3 ou 4 colonnes égales. Pour des chiffres ou des cartes courtes.
props: { columns: 2 | 3 | 4 }
### Text
Un paragraphe de markdown court : une ou deux phrases, avec du gras ou du code en ligne. Pas de titre, pas de liste.
props: { text: string, tone?: "default" | "muted" }
### Metric
Un chiffre qui compte : sa valeur en gros, ce qu’il mesure, son écart, et une note. Le statut colore seulement l’écart.
props: { label: string, value: string, delta?: string, status?: "ok" | "warn" | "fail" | "neutral", hint?: string }
### KeyValue
Une liste de paires libellé / valeur, alignées. Pour les caractéristiques d’une chose : modèle, date, coût, propriétaire.
props: { items: Array<{ label: string, value: string }> }
### Table
Un tableau : ses colonnes et ses lignes. À partir de quatre lignes de données comparables, jamais pour deux valeurs.
props: { columns: Array<{ key: string, label: string, align?: "start" | "end" }>, rows: Array<Record<string, string | number | boolean | unknown>>, title?: string }
### Chart
Un graphique en barres, en courbe ou en aire : une clé pour l’axe des abscisses, une à quatre séries numériques, avec leurs libellés.
props: { kind: "bar" | "line" | "area", data: Array<Record<string, string | number>>, xKey: string, series: Array<{ key: string, label: string, status?: "ok" | "warn" | "fail" }>, title?: string, height?: number }
### Checklist
Un plan ou un suivi d’étapes, une ligne par étape avec son état : fait, en cours, en attente, en échec, à faire.
props: { items: Array<{ label: string, status: "done" | "running" | "waiting" | "failed" | "todo", detail?: string }> }
### Steps
Une suite d’étapes numérotées dans l’ordre, avec un détail et une heure par étape. Pour une procédure, pas pour un état.
props: { items: Array<{ title: string, detail?: string, time?: string }> }
### Callout
Un encadré qui signale une chose : une information, un succès, un avertissement ou un échec. Une phrase ou deux, pas un paragraphe.
props: { tone: "info" | "ok" | "warn" | "fail", title: string, text: string }
### Tabs
Un sélecteur d’onglets lié à l’état. Les enfants qui portent une condition visible sur le même chemin changent avec l’onglet choisi.
props: { tabs: Array<{ id: string, label: string }>, value: string | { $state: string } | { $bindState: string } }
### Image
Une image par son adresse https, ou un chemin local servi par l’app. Jamais de data: ni de javascript:.
props: { src: string, alt: string, caption?: string }
### CodeBlock
Un bloc de code ou de commande, copiable, avec son langage. Court : la sortie d’une commande, pas un fichier entier.
props: { code: string, language?: "bash" | "ts" | "tsx" | "js" | "json" | "python" | "yaml" | "text" }
### Choice
Un choix unique entre deux et six options, lié à l’état. La valeur retenue se relit dans les textes par {{/chemin}}.
props: { label: string, options: Array<{ value: string, label: string }>, value: string | { $state: string } | { $bindState: string } }
### Stepper
Un compteur à moins et plus, lié à l’état. Pour une quantité : personnes, chambres, exemplaires.
props: { label: string, min: number, max: number, step?: number, value: number | { $state: string } | { $bindState: string } }
### Slider
Un curseur entre un minimum et un maximum, lié à l’état, avec sa valeur affichée. Pour un réglage continu.
props: { label: string, min: number, max: number, step?: number, unit?: string, value: number | { $state: string } | { $bindState: string } }
### Switch
Un interrupteur oui / non, lié à l’état. Pour activer une option.
props: { label: string, value: boolean | { $state: string } | { $bindState: string } }
### TextField
Un champ de texte court, lié à l’état : un nom, une adresse, une recherche.
props: { label: string, placeholder?: string, value: string | { $state: string } | { $bindState: string } }
### Select
Une liste déroulante à choix unique, liée à l’état. Pour plus de six options.
props: { label: string, options: Array<{ value: string, label: string }>, value: string | { $state: string } | { $bindState: string } }
### Button
Un bouton qui agit : envoyer un message au bot (send, texte avec {{/chemin}}), copier un texte (copy), ouvrir une adresse https (open). Un seul primary par groupe.
props: { label: string, variant: "primary" | "secondary" | "confirm", action: { name: "send" | "copy" | "open", params?: Record<string, string> } }

ACTIONS
### send — Envoie text comme prochain message de la personne, avec les valeurs de l’état interpolées ({{/guests}}).
params: { text: string }
### copy — Copie text dans le presse-papiers et confirme par un toast « Copié ».
params: { text: string }
### open — Ouvre une adresse https dans le navigateur du système.
params: { url: string }

RÈGLES
1. Du texte d’abord : une ou deux phrases qui disent la réponse, puis un seul bloc <hui-ui> par idée.
2. Des identifiants courts ("r", "a", "b"). Pas de clé inutile : un élément sans props n’en a pas.
3. Des données réelles, tirées de la conversation ou des outils. Jamais d’exemple inventé, jamais de lorem ipsum.
4. Un seul Button "primary" par groupe d’actions ; les autres en "secondary", la confirmation en "confirm".
5. Un composant interactif sans "state" ni "$bindState" est inerte : seede sa valeur et lie-la.
6. Le bouton qui propose une suite utilise l’action "send" et reprend les valeurs du state avec {{/chemin}}.
7. Limites : 200 éléments, 12 niveaux, 4000 caractères par chaîne. Au-delà, le bloc est coupé ou ignoré.
8. Un type absent de cette liste n’est pas rendu (ses enfants seulement) : n’invente pas de composant.
