// Glaze demo — /hui/glaze.
//
// The whole composed surface on one screen: a thread (person + agent turn with reasoning, tool calls and a markdown
// answer), an agent plan card, a command block, a table and a chart, and the prompt input with its model menu.
// Everything lives inside ONE `.glaze` element, in dark, with GlazePortalProvider inside it so menus and tooltips
// render into that element instead of document.body and keep the tokens.
//
// The stylesheet is compiled by scripts/build.mjs and imported as text: it is injected in a <style> on mount, so the
// native app's own stylesheets and Tailwind are never touched. Nothing here hardcodes a colour, a size or a font:
// only Glaze tokens and classes (the lint enforces it).
import { useEffect, useRef, useState } from 'react'
import css from '../../styles/.compiled.css'
import { GlazePortalProvider } from '@/lib/glaze/portal'
import { AgentTurn, Message, MessageBubble, MessageBubbleContent, MessageContent, MessageFooter, MessageHeader, MessageTime, MessageWorked } from '@/components/glaze/ai/message'
import { Response } from '@/components/glaze/ai/response'
import { Reasoning } from '@/components/glaze/ai/reasoning'
import { Activity } from '@/components/glaze/ai/activity'
import { ToolCallList, useToolCalls, type ToolCallData } from '@/components/glaze/ai/tool-call'
import { PromptInput, PromptInputModel } from '@/components/glaze/ai/prompt-input'
import { Avatar, AvatarFallback } from '@/components/glaze/ui/avatar'
import { Badge } from '@/components/glaze/ui/badge'
import { Button } from '@/components/glaze/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardMeta, CardTitle } from '@/components/glaze/ui/card'
import { Chart } from '@/components/glaze/ui/chart'
import { CodeBlock } from '@/components/glaze/ui/code-block'
import { CopyButton } from '@/components/glaze/ui/copy-button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/glaze/ui/dropdown-menu'
import { Kbd } from '@/components/glaze/ui/kbd'
import { Status } from '@/components/glaze/ui/status'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/glaze/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/glaze/ui/tooltip'
import { Icon, More, Retry } from '@/components/glaze/icon'

const STYLE_ID = 'hermes-ui-glaze'

/** The compiled Glaze sheet, kept in one <style> of its own. Every rule in it is scoped to .glaze. */
function useGlazeStyle() {
  useEffect(() => {
    let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null
    if (!el) {
      el = document.createElement('style')
      el.id = STYLE_ID
      document.head.appendChild(el)
    }
    el.textContent = css
    return () => { el?.remove() }
  }, [])
}

const NOW = Date.now()

const MODELS = ['hermes-3-405b', 'deepseek-v4.1-flash', 'qwen3-coder-30b']

const REASONING = `Je commence par les journaux de la routine, puis je compare les trois derniers passages.
La coupure tombe toujours entre la 30e et la 31e seconde : c'est le délai par défaut du gateway, pas une panne du bot.
Je vérifie ensuite le fichier de configuration avant de proposer une relance.`

const ANSWER = `## Pourquoi nightly-report échoue

Trois nuits de suite, la routine s'arrête sur le même point : le gateway rend un \`504\` après 30 s, alors que la collecte des journaux en demande 40.

- **Branco** relance la routine à 02:14, sans changer le délai.
- **Dex** a coupé la reprise automatique pour éviter la boucle.
- **Preto** garde le dernier rapport complet du 5 novembre.

| Passage | Début | Durée | Résultat |
| - | - | - | - |
| run_8f2a | 02:10 | 38 s | échec |
| run_7d1c | 02:10 | 41 s | échec |
| run_6b03 | 02:09 | 39 s | échec |

Le correctif tient en une ligne : passer \`--timeout\` à 60 s dans \`routines/nightly-report.toml\`.`

const COMMAND = `hermes routine run nightly-report --bot branco --timeout 60
run_9a41 démarré · 3 étapes
  lecture routines/nightly-report.toml  ok
  collecte des journaux          40 s   ok
  envoi du rapport vers #veille         ok
terminé en 44 s`

/** The turn's calls. Every one carries its `seq`: the reducer drops a late or duplicate event instead of replaying it. */
const CALLS: ToolCallData[] = [
  {
    id: 'call_read', tool: 'read', status: 'completed', seq: 1,
    input: { filePath: 'routines/nightly-report/run.log' },
    output: '02:10:31 gateway timeout after 30000ms\n02:10:32 retry 1/1 refusé (reprise automatique coupée)',
    startedAt: NOW - 13_800, endedAt: NOW - 13_100,
  },
  {
    id: 'call_shell', tool: 'shell', status: 'completed', seq: 2,
    input: { command: 'hermes routine logs nightly-report --bot branco --tail 40' },
    output: '3 passages · 3 échecs · dernier 2026-11-08 02:10',
    startedAt: NOW - 13_000, endedAt: NOW - 12_200,
  },
  {
    id: 'call_search', tool: 'websearch', status: 'completed', seq: 3,
    input: { query: 'gateway 504 timeout routine hermes' },
    output: 'Le délai par défaut du gateway est de 30 s ; il se règle par --timeout.',
    startedAt: NOW - 12_000, endedAt: NOW - 11_400,
  },
  {
    id: 'call_run', tool: 'shell', status: 'running', seq: 4,
    input: { command: 'hermes routine run nightly-report --bot branco --timeout 60' },
    metadata: { output: 'collecte des journaux 32 s / 40 s' },
    startedAt: NOW - 4_000,
  },
  {
    id: 'call_rm', tool: 'shell', status: 'awaiting-permission', seq: 5,
    input: { command: 'rm -rf cache/shared/2026-11-07' },
    permission: {
      patterns: ['rm -rf cache/shared/2026-11-07'],
      message: 'Supprime les 214 Mo de journaux temporaires que les trois bots ont écrits hier.',
    },
  },
]

const PLAN = [
  { label: 'Lire les journaux des trois passages', detail: 'run.log', status: 'ok' as const },
  { label: 'Relancer avec un délai de 60 s', detail: 'nightly-report', status: 'running' as const },
  { label: 'Envoyer le rapport dans #veille', detail: 'slack', status: 'queued' as const },
]

const ROUTINES = [
  { nom: 'nightly-report', bot: 'Branco', duree: '38 s', statut: 'fail' as const },
  { nom: 'inbox-triage', bot: 'Dex', duree: '12 s', statut: 'ok' as const },
  { nom: 'veille-prix', bot: 'Preto', duree: '54 s', statut: 'warn' as const },
  { nom: 'backup-cache', bot: 'Branco', duree: '67 s', statut: 'ok' as const },
]

const WEEK = [
  { jour: 'lun', reussies: 18, echouees: 1 },
  { jour: 'mar', reussies: 21, echouees: 0 },
  { jour: 'mer', reussies: 17, echouees: 2 },
  { jour: 'jeu', reussies: 22, echouees: 1 },
  { jour: 'ven', reussies: 20, echouees: 3 },
  { jour: 'sam', reussies: 11, echouees: 1 },
  { jour: 'dim', reussies: 9, echouees: 2 },
]

export function GlazeDemo() {
  useGlazeStyle()
  const [state, dispatch] = useToolCalls(CALLS)
  const [model, setModel] = useState(MODELS[0])
  const seq = useRef(100)
  const signed = useRef(false)

  // A live tool keeps reporting through the reducer, with its own seq: never a setState over `running`.
  useEffect(() => {
    if (signed.current) return
    signed.current = true
    const id = setTimeout(() => {
      dispatch({ type: 'progress', seq: ++seq.current, id: 'call_run', metadata: { output: 'collecte des journaux 40 s / 40 s' } })
    }, 1200)
    return () => clearTimeout(id)
  }, [])

  const reply = (call: ToolCallData, answer: 'once' | 'reject') => {
    console.log(`[glaze-demo] tool ${call.id} → ${answer}`)
    dispatch({ type: 'reply', seq: ++seq.current, id: call.id, reply: answer, feedback: answer === 'reject' ? 'Journaux à garder cette semaine.' : undefined })
  }

  return (
    <div className="glaze flex h-dvh min-h-0 w-full flex-col bg-page text-text-1" data-theme="dark">
      <GlazePortalProvider>
        <header className="flex items-center gap-2 border-b border-line-faint px-4 py-2">
          <Avatar type="agent" size="sm" name="Dex"><AvatarFallback /></Avatar>
          <span className="type-label">Dex</span>
          <Badge variant="outline" size="sm">démo Glaze</Badge>
          <span className="type-caption text-text-3">/hui/glaze</span>
          <div className="ms-auto flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Relancer la routine" />}>
                  <Icon icon={Retry} size={14} />
                </TooltipTrigger>
                <TooltipContent shortcut={['mod', 'shift', 'R']}>Relancer la routine</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Actions de la routine" />}>
                <Icon icon={More} size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" size="sm">
                <DropdownMenuLabel>Routine nightly-report</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => console.log('[glaze-demo] ouvrir les journaux')}>Ouvrir les journaux</DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log('[glaze-demo] copier le lien du passage')}>Copier le lien du passage</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => console.log('[glaze-demo] désactiver la routine')}>Désactiver la routine</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-measure flex-col gap-6 px-4 py-5">
            <Message from="user">
              <MessageContent>
                <MessageHeader>Ilyass<MessageTime>21:12</MessageTime></MessageHeader>
                <MessageBubble>
                  <MessageBubbleContent>
                    Relance la routine nightly-report du bot Branco et dis-moi pourquoi elle a échoué trois nuits de suite.
                  </MessageBubbleContent>
                </MessageBubble>
              </MessageContent>
            </Message>

            <AgentTurn name="Dex" state="done" time="21:14">
              <Reasoning streaming={false} duration={7}>{REASONING}</Reasoning>
              <Activity label="Consultant les journaux" doneLabel="Journaux consultés" active status="ok" announce={false} />
              <ToolCallList calls={state.calls} onReply={reply} />
              <Response>{ANSWER}</Response>
              <MessageFooter>
                <MessageWorked>14 s</MessageWorked>
                <CopyButton value={ANSWER} label="la réponse" size="icon-sm" />
              </MessageFooter>
            </AgentTurn>

            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2">
                <h2 className="type-heading-sm">Plan de l'agent</h2>
                <span className="type-caption text-text-3">Ouvrir un appel : <Kbd keys="enter" /></span>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Réparer nightly-report</CardTitle>
                  <CardDescription>Trois étapes, la relance est en cours sur le bot Branco.</CardDescription>
                </CardHeader>
                <CardContent flush>
                  {PLAN.map(row => (
                    <div key={row.label} className="rule-row flex min-h-(--row) items-center gap-3 px-3 py-2">
                      <span className="type-body-sm flex-1 text-text-1">{row.label}</span>
                      <span className="mono text-text-3">{row.detail}</span>
                      <Status status={row.status} size="sm" />
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <CardMeta>3 étapes · 44 s</CardMeta>
                  <Button size="sm" variant="secondary" onClick={() => console.log('[glaze-demo] modifier le plan')}>Modifier</Button>
                  <Button size="sm" variant="confirm" onClick={() => console.log('[glaze-demo] plan validé')}>Valider le plan</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="type-heading-sm">La relance, en ligne de commande</h2>
              <CodeBlock variant="command" code={COMMAND} />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="type-heading-sm">Routines des trois bots</h2>
              <Table aria-label="Routines des trois bots, dernier passage">
                <TableHeader>
                  <TableRow>
                    <TableHead>Routine</TableHead>
                    <TableHead>Bot</TableHead>
                    <TableHead numeric>Durée</TableHead>
                    <TableHead>Résultat</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ROUTINES.map(row => (
                    <TableRow key={row.nom}>
                      <TableCell mono>{row.nom}</TableCell>
                      <TableCell>{row.bot}</TableCell>
                      <TableCell numeric>{row.duree}</TableCell>
                      <TableCell><Status status={row.statut} size="sm" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="type-heading-sm">Passages par jour</h2>
              <Chart
                type="bar"
                label="Routines par jour, sept derniers jours"
                data={WEEK}
                xKey="jour"
                unit="count"
                stacked
                height={170}
                config={{ reussies: { label: 'Réussies' }, echouees: { label: 'Échouées', status: 'fail' } }}
              />
            </div>
          </div>
        </div>

        <footer className="border-t border-line-faint px-4 py-3">
          <div className="mx-auto flex w-full max-w-measure flex-col gap-2">
            <PromptInput
              draftKey="hermes-ui-glaze-demo"
              placeholder="Demander à Dex de relancer une routine"
              status="ready"
              generation="run_9a41"
              onAttach={() => console.log('[glaze-demo] pièce jointe')}
              attachments={[]}
              accept=".md,.txt,.json"
              onSubmit={value => console.log('[glaze-demo] envoi', value.serialized)}
              tools={
                <DropdownMenu>
                  <DropdownMenuTrigger render={<PromptInputModel model={model} />} />
                  <DropdownMenuContent align="start" side="top" size="sm">
                    <DropdownMenuLabel>Modèle</DropdownMenuLabel>
                    {MODELS.map(name => (
                      <DropdownMenuItem key={name} onClick={() => setModel(name)}>{name}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              }
            />
            <p className="type-caption text-text-3">
              Entrée envoie · <Kbd keys="shift+enter" /> pour une nouvelle ligne
            </p>
          </div>
        </footer>
      </GlazePortalProvider>
    </div>
  )
}
