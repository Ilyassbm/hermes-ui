// The Intelligent UI catalog: the only components and actions a bot may draw in the thread.
//
// json-render turns a flat spec ({root, elements, state}) into React through this catalog: the zod props are the
// contract the spec must satisfy, and every `description` is what the model reads in the generated skill. French,
// short, and about the job of the component rather than its look — the look is the registry's business.
import { defineCatalog, defineSchema, type PromptContext, type SchemaType } from '@json-render/core'
import { z } from 'zod'

/** `optional()` is a marker on the schema node, not a method: spread it with a literal `true` so inference keeps it. */
const maybe = <T extends SchemaType>(node: T): T & { optional: true } => ({ ...node, optional: true })

/** The flat spec of json-render, as the bot writes it between <hui-ui> and </hui-ui>. */
export const schema = defineSchema(s => ({
  spec: s.object({
    root: s.string(),
    elements: s.record(
      s.object({
        type: s.ref('catalog.components'),
        props: s.any(),
        children: maybe(s.array(s.string())),
        slots: maybe(s.record(s.array(s.string()))),
        visible: maybe(s.any())
      })
    ),
    state: maybe(s.any())
  }),
  catalog: s.object({
    components: s.map({ props: s.zod(), description: s.string(), slots: maybe(s.array(s.string())) }),
    actions: s.map({ params: s.zod(), description: s.string() })
  })
}), { promptTemplate })

const align = z.enum(['start', 'end']).optional()

/**
 * A value the person can change: a literal, `{ "$state": "/path" }` to read it, or `{ "$bindState": "/path" }` to read
 * and write it. A bound value is seeded in the spec's `state`.
 */
const bound = (inner: z.ZodTypeAny) => z.union([inner, z.object({ $state: z.string() }), z.object({ $bindState: z.string() })])

/**
 * What the model reads: the flat spec, the components it may use with their zod props, the three actions, and the
 * rules that keep a spec inside the thread. Written once here — the generated skill is this text plus a header.
 */
function promptTemplate({ catalog, formatZodType }: PromptContext): string {
  const data = catalog as {
    components: Record<string, { props: unknown; description: string; slots?: string[] }>
    actions: Record<string, { params: unknown; description: string }>
  }
  const components = Object.entries(data.components)
  const actions = Object.entries(data.actions)
  return [
    'FORMAT',
    'Tu réponds dans le fil d’une conversation de l’app desktop Hermes. Pour une réponse qui se lit mieux en interface, insère un bloc dans ton texte markdown :',
    '<hui-ui>{"root":"r","elements":{"r":{"type":"Card","props":{"title":"Réservation"},"children":["n","b"]},"n":{"type":"Stepper","props":{"label":"Personnes","min":1,"max":8,"value":{"$bindState":"/guests"}}},"b":{"type":"Button","props":{"label":"Réserver","variant":"primary","action":{"name":"send","params":{"text":"Réserve pour {{/guests}} personnes"}}}}},"state":{"guests":2}}</hui-ui>',
    '',
    'Un seul objet JSON valide, sur une ligne ou plusieurs, entre <hui-ui> et </hui-ui>. Pas de fence, pas de commentaire, pas de JSONL.',
    '- "root" : la clé de l’élément racine.',
    '- "elements" : clé courte → { "type", "props", "children"?, "visible"? }. "children" liste des clés, dans l’ordre d’affichage.',
    '- "state" : les valeurs de départ des composants interactifs. Un composant lié s’écrit { "$bindState": "/chemin" } et lit sa valeur dans le state.',
    '- "visible" : une condition, par exemple { "$state": "/tab", "eq": "prix" } — voir CONDITIONS.',
    '',
    'CONDITIONS',
    'visible accepte { "$state": "/chemin", "eq": "valeur" }, { "neq": "valeur" }, { "gt": n }, { "gte": n }, { "lt": n }, { "lte": n }, { "$state": "/chemin" } (vrai si la valeur existe), un tableau (ET), ou { "$and": [...] } / { "$or": [...] }.',
    'Pour des onglets : un composant Tabs lié à "/tab", et un enfant par onglet avec "visible": { "$state": "/tab", "eq": "<id>" }.',
    '',
    'VALEURS DÉRIVÉES',
    'Dans un texte ou un paramètre d’action, {{/chemin}} est remplacé par la valeur du state au moment du clic : "Réserve pour {{/guests}} personnes".',
    '',
    'COMPOSANTS',
    ...components.flatMap(([name, entry]) => [
      `### ${name}`,
      entry.description,
      `props: ${formatZodType(entry.props as never)}`,
      ...(entry.slots?.length ? [`slots: ${entry.slots.join(', ')}`] : [])
    ]),
    '',
    'ACTIONS',
    ...actions.map(([name, entry]) => `### ${name} — ${entry.description}\nparams: ${formatZodType(entry.params as never)}`),
    '',
    'RÈGLES',
    '1. Du texte d’abord : une ou deux phrases qui disent la réponse, puis un seul bloc <hui-ui> par idée.',
    '2. Des identifiants courts ("r", "a", "b"). Pas de clé inutile : un élément sans props n’en a pas.',
    '3. Des données réelles, tirées de la conversation ou des outils. Jamais d’exemple inventé, jamais de lorem ipsum.',
    '4. Un seul Button "primary" par groupe d’actions ; les autres en "secondary", la confirmation en "confirm".',
    '5. Un composant interactif sans "state" ni "$bindState" est inerte : seede sa valeur et lie-la.',
    '6. Le bouton qui propose une suite utilise l’action "send" et reprend les valeurs du state avec {{/chemin}}.',
    '7. Limites : 200 éléments, 12 niveaux, 4000 caractères par chaîne. Au-delà, le bloc est coupé ou ignoré.',
    '8. Un type absent de cette liste n’est pas rendu (ses enfants seulement) : n’invente pas de composant.'
  ].join('\n')
}

export const catalog = defineCatalog(schema, {
  components: {
    Card: {
      props: z.object({
        title: z.string().max(120),
        description: z.string().max(400).optional(),
        meta: z.string().max(120).optional()
      }),
      description: 'Une carte : un titre, une phrase, son contenu, et ses boutons dans le pied. Le conteneur d’une réponse qui se lit comme un bloc.',
      slots: ['footer']
    },
    Stack: {
      props: z.object({ direction: z.enum(['row', 'column']), gap: z.enum(['sm', 'md', 'lg']).optional() }),
      description: 'Empile des éléments en ligne ou en colonne, avec un espacement court, moyen ou large.'
    },
    Grid: {
      props: z.object({ columns: z.union([z.literal(2), z.literal(3), z.literal(4)]) }),
      description: 'Place des éléments côte à côte sur 2, 3 ou 4 colonnes égales. Pour des chiffres ou des cartes courtes.'
    },
    Text: {
      props: z.object({ text: z.string().max(4000), tone: z.enum(['default', 'muted']).optional() }),
      description: 'Un paragraphe de markdown court : une ou deux phrases, avec du gras ou du code en ligne. Pas de titre, pas de liste.'
    },
    Metric: {
      props: z.object({
        label: z.string().max(120),
        value: z.string().max(40),
        delta: z.string().max(40).optional(),
        status: z.enum(['ok', 'warn', 'fail', 'neutral']).optional(),
        hint: z.string().max(160).optional()
      }),
      description: 'Un chiffre qui compte : sa valeur en gros, ce qu’il mesure, son écart, et une note. Le statut colore seulement l’écart.'
    },
    KeyValue: {
      props: z.object({ items: z.array(z.object({ label: z.string().max(80), value: z.string().max(400) })).min(1).max(20) }),
      description: 'Une liste de paires libellé / valeur, alignées. Pour les caractéristiques d’une chose : modèle, date, coût, propriétaire.'
    },
    Table: {
      props: z.object({
        columns: z.array(z.object({ key: z.string(), label: z.string().max(80), align })).min(1).max(8),
        rows: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))).min(1).max(50),
        title: z.string().max(120).optional()
      }),
      description: 'Un tableau : ses colonnes et ses lignes. À partir de quatre lignes de données comparables, jamais pour deux valeurs.'
    },
    Chart: {
      props: z.object({
        kind: z.enum(['bar', 'line', 'area']),
        data: z.array(z.record(z.string(), z.union([z.string(), z.number()]))).min(1).max(60),
        xKey: z.string(),
        series: z.array(z.object({ key: z.string(), label: z.string().max(60), status: z.enum(['ok', 'warn', 'fail']).optional() })).min(1).max(4),
        title: z.string().max(120).optional(),
        height: z.number().min(80).max(400).optional()
      }),
      description: 'Un graphique en barres, en courbe ou en aire : une clé pour l’axe des abscisses, une à quatre séries numériques, avec leurs libellés.'
    },
    Checklist: {
      props: z.object({
        items: z
          .array(
            z.object({
              label: z.string().max(200),
              status: z.enum(['done', 'running', 'waiting', 'failed', 'todo']),
              detail: z.string().max(160).optional()
            })
          )
          .min(1)
          .max(20)
      }),
      description: 'Un plan ou un suivi d’étapes, une ligne par étape avec son état : fait, en cours, en attente, en échec, à faire.'
    },
    Steps: {
      props: z.object({
        items: z.array(z.object({ title: z.string().max(200), detail: z.string().max(300).optional(), time: z.string().max(40).optional() })).min(1).max(12)
      }),
      description: 'Une suite d’étapes numérotées dans l’ordre, avec un détail et une heure par étape. Pour une procédure, pas pour un état.'
    },
    Callout: {
      props: z.object({
        tone: z.enum(['info', 'ok', 'warn', 'fail']),
        title: z.string().max(120),
        text: z.string().max(600)
      }),
      description: 'Un encadré qui signale une chose : une information, un succès, un avertissement ou un échec. Une phrase ou deux, pas un paragraphe.'
    },
    Tabs: {
      props: z.object({
        tabs: z.array(z.object({ id: z.string(), label: z.string().max(40) })).min(2).max(4),
        value: bound(z.string())
      }),
      description: 'Un sélecteur d’onglets lié à l’état. Les enfants qui portent une condition visible sur le même chemin changent avec l’onglet choisi.'
    },
    Image: {
      props: z.object({
        src: z.string().max(2000),
        alt: z.string().max(200),
        caption: z.string().max(200).optional()
      }),
      description: 'Une image par son adresse https, ou un chemin local servi par l’app. Jamais de data: ni de javascript:.'
    },
    CodeBlock: {
      props: z.object({ code: z.string().max(4000), language: z.enum(['bash', 'ts', 'tsx', 'js', 'json', 'python', 'yaml', 'text']).optional() }),
      description: 'Un bloc de code ou de commande, copiable, avec son langage. Court : la sortie d’une commande, pas un fichier entier.'
    },
    Choice: {
      props: z.object({
        label: z.string().max(120),
        options: z.array(z.object({ value: z.string(), label: z.string().max(60) })).min(2).max(6),
        value: bound(z.string())
      }),
      description: 'Un choix unique entre deux et six options, lié à l’état. La valeur retenue se relit dans les textes par {{/chemin}}.'
    },
    Stepper: {
      props: z.object({
        label: z.string().max(120),
        min: z.number(),
        max: z.number(),
        step: z.number().optional(),
        value: bound(z.number())
      }),
      description: 'Un compteur à moins et plus, lié à l’état. Pour une quantité : personnes, chambres, exemplaires.'
    },
    Slider: {
      props: z.object({
        label: z.string().max(120),
        min: z.number(),
        max: z.number(),
        step: z.number().optional(),
        unit: z.string().max(20).optional(),
        value: bound(z.number())
      }),
      description: 'Un curseur entre un minimum et un maximum, lié à l’état, avec sa valeur affichée. Pour un réglage continu.'
    },
    Switch: {
      props: z.object({ label: z.string().max(120), value: bound(z.boolean()) }),
      description: 'Un interrupteur oui / non, lié à l’état. Pour activer une option.'
    },
    TextField: {
      props: z.object({
        label: z.string().max(120),
        placeholder: z.string().max(120).optional(),
        value: bound(z.string())
      }),
      description: 'Un champ de texte court, lié à l’état : un nom, une adresse, une recherche.'
    },
    Select: {
      props: z.object({
        label: z.string().max(120),
        options: z.array(z.object({ value: z.string(), label: z.string().max(60) })).min(2).max(24),
        value: bound(z.string())
      }),
      description: 'Une liste déroulante à choix unique, liée à l’état. Pour plus de six options.'
    },
    Button: {
      props: z.object({
        label: z.string().max(60),
        variant: z.enum(['primary', 'secondary', 'confirm']),
        action: z.object({
          name: z.enum(['send', 'copy', 'open']),
          params: z.record(z.string(), z.string()).optional()
        })
      }),
      description: 'Un bouton qui agit : envoyer un message au bot (send, texte avec {{/chemin}}), copier un texte (copy), ouvrir une adresse https (open). Un seul primary par groupe.'
    }
  },
  actions: {
    send: {
      params: z.object({ text: z.string().min(1).max(2000) }),
      description: 'Envoie text comme prochain message de la personne, avec les valeurs de l’état interpolées ({{/guests}}).'
    },
    copy: {
      params: z.object({ text: z.string().min(1).max(4000) }),
      description: 'Copie text dans le presse-papiers et confirme par un toast « Copié ».'
    },
    open: {
      params: z.object({ url: z.string().url().startsWith('https://').max(2000) }),
      description: 'Ouvre une adresse https dans le navigateur du système.'
    }
  }
})

export type IuiCatalog = typeof catalog
