# Hermes UI

Page de chat sur mesure pour **Hermes Desktop** et la **Webapp** Hermes, au look Glaze de l'OS (mode Chat).
Un seul paquet de plugin : une page desktop (`desktop/plugin.js`) et un petit backend (`dashboard/plugin_api.py`).

## Ce qu'elle affiche

- **Colonne gauche** : les bots (profils Hermes), puis les conversations du bot choisi, groupées par date.
  En bas : l'usage des abonnements (Claude et OpenCode Go : fenêtre 5 h, semaine) et un engrenage
  qui ouvre Réglages, Capabilities, Messaging, Artifacts, Tâches planifiées, Raccourcis.
- **Fil** : ta bulle à droite, la réponse sans bulle (avatar animé aicss, nom, modèle), rendu markdown natif
  (code, tableaux, médias, widgets). Raisonnement replié « A réfléchi N s », dépliable.
  Pendant le travail, **une seule ligne vivante** : « Dex réfléchit… », « Dex travaille · lit un fichier »,
  « Dex délègue · 3 tâches ». Les approbations arrivent en carte (Refuser / Toujours / Autoriser).
  Sous chaque réponse : Copier, rien d'autre.
- **Zone de saisie** : modèle et effort mémorisés par bot, pièces jointes (bouton, glisser-déposer, coller une image).
- **Panneau droit** : routines du bot (cron), puis les fichiers créés ou modifiés dans la conversation.

Masqué : appels d'outils détaillés, diffs, barre latérale native (repliée à la première ouverture).
Terminal, fichiers et revue git restent accessibles par leurs raccourcis natifs.

## Installer

Le repo est privé et l'instance n'a pas d'accès GitHub : « Install from Git » échoue (`could not read Username`).
On installe donc sur l'instance depuis un clone local :

```bash
HERMES_HOME=/opt/data hermes plugins install file:///chemin/du/clone --enable --yes-deps   # --force pour mettre à jour
```

La partie desktop est publiée dans `desktop-plugins/hermes-ui/` par l'instance. Sur le Mac : ⌘K → *Reload desktop plugins*,
puis activer **Hermes UI** dans Capabilities → Plugins si besoin. La page s'ouvre par l'entrée « Hermes UI » de la barre
latérale ou ⌘K → « Ouvrir Hermes UI ». Le backend d'usage se monte à la première requête, sans redémarrage.

## Développer

```bash
npm install
npm run build          # src/ → desktop/plugin.js (un seul fichier ESM, imports SDK + React seulement)
HERMES_ROOT=<home> node scripts/build.mjs --install   # copie en plugin desktop autonome (dev)
```

`desktop/plugin.js` est un artefact de build commité : c'est lui que l'installation depuis Git charge.

## Sources et licences

- Composants et motifs **aicss** (MIT) : moteur `AiBotAvatar` recopié tel quel dans `src/vendor/aicss/`
  (licence et commit à côté) ; ThinkingState, ThinkingReasoning, CodeBlock, DataTable reproduits en CSS.
- **OpenBot** (PolyForm Noncommercial) : inspiration visuelle seulement, aucun code repris.
- Mouvement : règles des skills d'Emil Kowalski (transform/opacity, ease-out fort, ≤ 220 ms, survol réservé
  aux pointeurs fins, `prefers-reduced-motion`).
- Tokens Glaze : `ilyassbm/os` `components/glaze/tokens.css`.
