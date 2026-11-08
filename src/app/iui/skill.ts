// The skill a bot reads before answering with an interface: when to draw one, when not to, the rules, three complete
// specs, then the catalogue's own prompt. Written by scripts/gen-iui-skill.mjs into skills/intelligent-ui/SKILL.md,
// which is what the plugin registers — one source, one generated file, committed.
import { catalog } from './catalog'
import { EXAMPLES, exampleBlock } from './examples'

export const SKILL_TITLE = 'intelligent-ui'

export const SKILL_DESCRIPTION =
  'Use when replying in the Hermes desktop app and the answer is clearer as an interactive card, chart, table, plan, form or choice than as plain text.'

const HEADER = `---
name: ${SKILL_TITLE}
description: ${SKILL_DESCRIPTION}
---`

const BODY = `# Intelligent UI

Le fil de l’app desktop Hermes sait dessiner une interface : cartes, chiffres, tableaux, graphiques, plans, formulaires, choix. Tu écris du texte, puis un bloc \`<hui-ui>\`, et le fil le rend avec les composants Glaze.

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
2. Un seul bloc \`<hui-ui>\` par idée. Deux idées, deux blocs, séparés par du texte.
3. Un JSON compact et valide, sur une ligne ou plusieurs, jamais dans un fence.
4. Des identifiants courts : \`"r"\`, \`"a"\`, \`"b"\`.
5. Des données réelles, prises dans la conversation ou dans ce que les outils ont rendu. Rien d’inventé, aucun jeu d’exemple.
6. Un bouton \`send\` pour proposer la suite, avec les valeurs du state interpolées : « Réserve pour {{/guests}} personnes ».
7. Un seul bouton \`primary\` par groupe d’actions ; le reste en \`secondary\`.
8. Si un composant manque, écris du texte : le catalogue est fermé, un type inconnu n’est pas rendu.

## Exemples

### Plan avec Checklist et boutons

Une réponse à « pourquoi nightly-report échoue », et la suite proposée en deux boutons.

${exampleBlock(EXAMPLES[0])}

### Comparaison : Table et Metric

Deux chiffres qui comptent, puis le tableau des cinq dernières lignes comparables.

${exampleBlock(EXAMPLES[1])}

### Formulaire : Stepper, Choice et envoi

Un compteur, un choix, et un bouton qui envoie le state interpolé au bot.

${exampleBlock(EXAMPLES[2])}

## Catalogue
`

/** The whole SKILL.md: header, French body, examples, then the catalogue's generated prompt. */
export function renderSkill(): string {
  return `${HEADER}\n\n${BODY}\n${catalog.prompt()}\n`
}

/** The examples as the checker reads them. */
export const SKILL_EXAMPLES = EXAMPLES
