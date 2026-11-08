# Hermes UI

L'accueil de **Hermes Desktop** : une page de chat Glaze (noir et blanc) qui remplace les routes de chat natives, et le
thème **Glaze Noir** pour les pages qui restent natives (Réglages, Capabilities, Messaging…).
Un seul paquet de plugin : la page desktop (`desktop/plugin.js`) et un petit backend (`dashboard/plugin_api.py`).

## Ce que c'est

- **Hermes UI est l'accueil.** Au lancement, `#/` (nouveau chat) et `#/<id de session>` ouvrent `/hui`, la conversation
  demandée comprise ; le chrome natif est masqué une fois (barre latérale repliée, barre d'état cachée).
  Réglages, Capabilities, Crons… restent natifs et prennent le skin Glaze Noir.
- **Trois colonnes** : le rail (bots, conversations du bot), le fil (bulle utilisateur, réponse sans bulle, raisonnement
  replié, une seule ligne d'activité vivante, approbations en carte), le panneau droit (routines, fichiers du fil).
  La zone de saisie garde le modèle et l'effort par bot, avec pièces jointes.
- **Le fil s'efface en haut** sous la pastille du bot : le texte qui défile reste lisible au lieu d'être coupé net.
- **Tout se défait** : ⌘K → « Hermes UI : utiliser l'interface native » rend les routes au bureau ;
  « … utiliser Hermes UI partout » les reprend.

Les captures ne sont pas dans le dépôt : Dex les ajoutera.

## Installer

Le dépôt est privé et l'instance n'a pas d'accès GitHub : « Install from Git » échoue. On installe depuis un clone local,
dans chaque profil **et** dans le root (`HERMES_HOME=/opt/data`) :

```bash
HERMES_HOME=/opt/data hermes plugins install file:///chemin/du/clone --enable --yes-deps --force
```

La partie desktop est publiée dans `desktop-plugins/hermes-ui/`. Sur le Mac : ⌘K → *Reload desktop plugins*, puis
activer **Hermes UI** dans Capabilities → Plugins si besoin. La page s'ouvre d'elle-même au lancement, par l'entrée
« Hermes UI » de la barre latérale, ou ⌘K → « Ouvrir Hermes UI ». Le backend d'usage se monte à la première requête.

## Raccourcis

| Geste | Effet |
| --- | --- |
| ⌥1 … ⌥9 | Aller au bot 1 à 9 (l'ordre du rail, épinglés d'abord) |
| ⌘⌥N | Nouvelle discussion avec un bot… (chiffre 1–9 dans la fenêtre pour choisir, Échap pour fermer) |
| ⌘⌥K | Rechercher un bot ou une conversation |
| ⌘⇧O | Nouvelle conversation dans Hermes UI |
| ⌘⌥B | Afficher ou masquer le panneau droit |
| ⌘⇧S | Barre d'état native (cachée une fois à l'installation) |
| ⌘B | Barre latérale native (repliée une fois à l'installation) |
| ⌘K | « Ouvrir Hermes UI », « utiliser l'interface native », « utiliser Hermes UI partout », « barre d'état » |

Les raccourcis du plugin sont rebindables dans Réglages → Raccourcis ; les trois derniers sont ceux du bureau : rien
n'est forcé après la première fois.

Les combos par défaut sont en **Alt + chiffre**, pas ⌘⌥ + chiffre : le bureau réserve ⌘⌥1…⌘⌥9 à ses propres
`profile.switch.10..18`, et un défaut natif passe toujours avant un défaut de plugin. `npm run check:keybinds` refuse un
défaut qui prendrait un combo natif (la liste du bureau est embarquée dans le script). Alt + chiffre passe aussi quand le
curseur est dans la zone de saisie.

## Intelligent UI

Le fil sait dessiner une interface : le modèle écrit son texte, puis un bloc `<hui-ui>` contenant un JSON compact, et la
page le rend avec les composants Glaze (cartes, tableaux, graphiques, plans, formulaires, choix). Le plugin enregistre
la skill **`hermes-ui:intelligent-ui`**, qui donne le format, le catalogue fermé et les règles ; hors de l'app desktop
(Telegram, Slack, e-mail), la skill dit de n'écrire que du texte.

## Développer

```bash
npm install
npm run build            # CSS Glaze + check-css + esbuild → desktop/plugin.js
npm run lint             # glaze.eslint.config.mjs, 0 erreur
npm run check:takeover   # la table de routage du takeover, cas par cas
npm run check:css        # aucun sélecteur global hors .glaze, skin natif < 8 Ko
npm run check:keybinds   # aucun défaut du plugin sur un combo natif (liste du bureau embarquée)
HERMES_ROOT=<home> node scripts/build.mjs --install   # copie en plugin desktop autonome (dev)
```

`desktop/plugin.js` est un artefact de build commité : c'est lui que l'installation charge.

## Sources et licences

- **aicss** — MIT (`src/vendor/aicss/LICENSE`) : moteur `AiBotAvatar` recopié tel quel (commit `7f9dc40`), et
  ThinkingState, ThinkingReasoning, CodeBlock, DataTable reproduits en CSS.
- **Glaze** (design.how) — licence **non déclarée** : aucun fichier de licence ni champ `license` dans les composants
  installés ni dans `https://design.how/r/glaze/registry.json`. Seule mention, dans `tokens.css` : Glaze Sans / Glaze
  Mono ne sont pas livrées avec le thème, Geist (SIL OFL) prend le relais. À confirmer auprès de design.how avant
  redistribution.
- **json-render** — Apache-2.0 (`node_modules/@json-render/core/LICENSE`) : le catalogue et le rendu d'Intelligent UI.
- **OpenBot** — inspiration visuelle seulement, aucun code repris.
- Mouvement : règles des skills d'Emil Kowalski (transform/opacity, ease-out fort, ≤ 220 ms, `prefers-reduced-motion`).
