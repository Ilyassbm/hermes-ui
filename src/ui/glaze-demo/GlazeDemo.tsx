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
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/glaze/ui/dropdown-menu'
import { Kbd } from '@/components/glaze/ui/kbd'
import { Status } from '@/components/glaze/ui/status'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/glaze/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/glaze/ui/tooltip'
import { Icon, More, Retry } from '@/components/glaze/icon'
import { IuiBlock, IUI_TAGS } from '@/app/iui/block'
import { EXAMPLES } from '@/app/iui/examples'
import type { TagRenderer } from '@/components/glaze/ai/response'

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

const REASONING = `I start with the routine's logs, then compare the last three runs.
The cut always lands between second 30 and 31: that is the gateway's default timeout, not a bot failure.
I then check the config file before offering a rerun.`

const ANSWER = `## Why nightly-report fails

Three nights in a row the routine stops at the same point: the gateway returns a \`504\` after 30 s, while collecting the logs takes 40.

- **Atlas** reruns the routine at 02:14 without changing the timeout.
- **Scout** turned the automatic retry off to avoid the loop.
- **Nova** keeps the last complete report from 5 November.

| Run | Start | Duration | Result |
| - | - | - | - |
| run_8f2a | 02:10 | 38 s | failed |
| run_7d1c | 02:10 | 41 s | failed |
| run_6b03 | 02:09 | 39 s | failed |

The fix is one line: set \`--timeout\` to 60 s in \`routines/nightly-report.toml\`.`

const COMMAND = `hermes routine run nightly-report --bot atlas --timeout 60
run_9a41 started · 3 steps
  read routines/nightly-report.toml    ok
  collect the logs          40 s      ok
  send the report to #watch           ok
done in 44 s`

/** The turn's calls. Every one carries its `seq`: the reducer drops a late or duplicate event instead of replaying it. */
const CALLS: ToolCallData[] = [
  {
    id: 'call_read', tool: 'read', status: 'completed', seq: 1,
    input: { filePath: 'routines/nightly-report/run.log' },
    output: '02:10:31 gateway timeout after 30000ms\n02:10:32 retry 1/1 refused (automatic retry disabled)',
    startedAt: NOW - 13_800, endedAt: NOW - 13_100,
  },
  {
    id: 'call_shell', tool: 'shell', status: 'completed', seq: 2,
    input: { command: 'hermes routine logs nightly-report --bot atlas --tail 40' },
    output: '3 runs · 3 failures · last 2026-11-08 02:10',
    startedAt: NOW - 13_000, endedAt: NOW - 12_200,
  },
  {
    id: 'call_search', tool: 'websearch', status: 'completed', seq: 3,
    input: { query: 'gateway 504 timeout routine hermes' },
    output: 'The gateway default timeout is 30 s; set it with --timeout.',
    startedAt: NOW - 12_000, endedAt: NOW - 11_400,
  },
  {
    id: 'call_run', tool: 'shell', status: 'running', seq: 4,
    input: { command: 'hermes routine run nightly-report --bot atlas --timeout 60' },
    metadata: { output: 'collecting the logs 32 s / 40 s' },
    startedAt: NOW - 4_000,
  },
  {
    id: 'call_rm', tool: 'shell', status: 'awaiting-permission', seq: 5,
    input: { command: 'rm -rf cache/shared/2026-11-07' },
    permission: {
      patterns: ['rm -rf cache/shared/2026-11-07'],
      message: 'Deletes the 214 MB of temporary logs the three bots wrote yesterday.',
    },
  },
]

const PLAN = [
  { label: 'Read the logs of the three runs', detail: 'run.log', status: 'ok' as const },
  { label: 'Rerun with a 60 s timeout', detail: 'nightly-report', status: 'running' as const },
  { label: 'Send the report to #watch', detail: 'slack', status: 'queued' as const },
]

const ROUTINES = [
  { nom: 'nightly-report', bot: 'Atlas', duree: '38 s', statut: 'fail' as const },
  { nom: 'inbox-triage', bot: 'Scout', duree: '12 s', statut: 'ok' as const },
  { nom: 'price-watch', bot: 'Nova', duree: '54 s', statut: 'warn' as const },
  { nom: 'backup-cache', bot: 'Atlas', duree: '67 s', statut: 'ok' as const },
]

const WEEK = [
  { jour: 'Mon', reussies: 18, echouees: 1 },
  { jour: 'Tue', reussies: 21, echouees: 0 },
  { jour: 'Wed', reussies: 17, echouees: 2 },
  { jour: 'Thu', reussies: 22, echouees: 1 },
  { jour: 'Fri', reussies: 20, echouees: 3 },
  { jour: 'Sat', reussies: 11, echouees: 1 },
  { jour: 'Sun', reussies: 9, echouees: 2 },
]

// ---------- Intelligent UI ----------

/** The demo's own send: a spec's `send` logs here instead of typing into the conversation behind this page. */
const DEMO_SEND = (text: string) => console.log('[glaze-demo] iui send →', text)

/** The real tag, with the demo's send: same Response path as a thread, same catalogue, same sanitiser. */
const DEMO_TAGS: Record<string, TagRenderer> = {
  'hui-ui': { ...IUI_TAGS['hui-ui'], render: data => <IuiBlock spec={data} onSend={DEMO_SEND} /> }
}

const LEADS: Record<string, string> = {
  plan: 'Three steps before the rerun, and the next step offered as two buttons.',
  comparison: 'Nova costs less, Atlas holds the duration: the last five runs, side by side.',
  form: 'The booking fits in a counter, a choice and a button.'
}

/** One spec streamed a character at a time, 16 ms apart: the placeholder, then the card. */
function StreamedSpec({ text }: { text: string }) {
  const [shown, setShown] = useState('')
  const [run, setRun] = useState(0)
  useEffect(() => {
    setShown('')
    let i = 0
    const timer = setInterval(() => {
      i += 1
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [text, run])
  return (
    <div className="flex flex-col gap-2">
      <Response streaming={shown.length < text.length} tags={DEMO_TAGS}>
        {shown}
      </Response>
      <Button variant="secondary" size="sm" className="self-start" onClick={() => setRun(n => n + 1)}>
        Replay the stream
      </Button>
    </div>
  )
}

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
    dispatch({ type: 'reply', seq: ++seq.current, id: call.id, reply: answer, feedback: answer === 'reject' ? 'Keep this week\'s logs.' : undefined })
  }

  return (
    <div className="glaze flex h-dvh min-h-0 w-full flex-col bg-page text-text-1" data-theme="dark">
      <GlazePortalProvider>
        <header className="flex items-center gap-2 border-b border-line-faint px-4 py-2">
          <Avatar type="agent" size="sm" name="Scout"><AvatarFallback /></Avatar>
          <span className="type-label">Scout</span>
          <Badge variant="outline" size="sm">Glaze demo</Badge>
          <span className="type-caption text-text-3">/hui/glaze</span>
          <div className="ms-auto flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Rerun the routine" />}>
                  <Icon icon={Retry} size={14} />
                </TooltipTrigger>
                <TooltipContent shortcut={['mod', 'shift', 'R']}>Rerun the routine</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Routine actions" />}>
                <Icon icon={More} size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" size="sm">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>nightly-report routine</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => console.log('[glaze-demo] open the logs')}>Open the logs</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log('[glaze-demo] copy the run link')}>Copy the run link</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => console.log('[glaze-demo] disable the routine')}>Disable the routine</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-measure flex-col gap-6 px-4 py-5">
            <Message from="user">
              <MessageContent>
                <MessageHeader>You<MessageTime>21:12</MessageTime></MessageHeader>
                <MessageBubble>
                  <MessageBubbleContent>
                    Rerun the nightly-report routine on the Atlas bot and tell me why it failed three nights in a row.
                  </MessageBubbleContent>
                </MessageBubble>
              </MessageContent>
            </Message>

            <AgentTurn name="Scout" state="done" time="21:14">
              <Reasoning streaming={false} duration={7}>{REASONING}</Reasoning>
              <Activity label="Reading the logs" doneLabel="Logs read" active status="ok" announce={false} />
              <ToolCallList calls={state.calls} onReply={reply} />
              <Response>{ANSWER}</Response>
              <MessageFooter>
                <MessageWorked>14 s</MessageWorked>
                <CopyButton value={ANSWER} label="the response" size="icon-sm" />
              </MessageFooter>
            </AgentTurn>

            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2">
                <h2 className="type-heading-sm">Agent plan</h2>
                <span className="type-caption text-text-3">Open a call: <Kbd keys="enter" /></span>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Fix nightly-report</CardTitle>
                  <CardDescription>Three steps; the rerun is under way on the Atlas bot.</CardDescription>
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
                  <CardMeta>3 steps · 44 s</CardMeta>
                  <Button size="sm" variant="secondary" onClick={() => console.log('[glaze-demo] edit the plan')}>Edit</Button>
                  <Button size="sm" variant="confirm" onClick={() => console.log('[glaze-demo] plan approved')}>Approve the plan</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="type-heading-sm">The rerun, on the command line</h2>
              <CodeBlock variant="command" code={COMMAND} />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="type-heading-sm">The three bots' routines</h2>
              <Table aria-label="The three bots' routines, last run">
                <TableHeader>
                  <TableRow>
                    <TableHead>Routine</TableHead>
                    <TableHead>Bot</TableHead>
                    <TableHead numeric>Duration</TableHead>
                    <TableHead>Result</TableHead>
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
              <h2 className="type-heading-sm">Runs per day</h2>
              <Chart
                type="bar"
                label="Routines per day, last seven days"
                data={WEEK}
                xKey="jour"
                unit="count"
                stacked
                height={170}
                config={{ reussies: { label: 'Passed' }, echouees: { label: 'Failed', status: 'fail' } }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="type-heading-sm">Intelligent UI</h2>
              <p className="type-caption text-text-3">
                The real path: a <span className="mono">{'<hui-ui>'}</span> block in the markdown, the tag registered on Response, the skill's catalogue, the thread's sanitiser.
              </p>
            </div>

            {EXAMPLES.slice(0, 2).map(example => (
              <AgentTurn key={example.id} name="Scout" state="done" time="21:20">
                <Response tags={DEMO_TAGS}>{`${LEADS[example.id]}\n\n<hui-ui>${example.json}</hui-ui>`}</Response>
              </AgentTurn>
            ))}

            <AgentTurn name="Scout" state="live" time="21:24">
              <StreamedSpec text={`${LEADS.form}\n\n<hui-ui>${EXAMPLES[2].json}</hui-ui>`} />
            </AgentTurn>
          </div>
        </div>

        <footer className="border-t border-line-faint px-4 py-3">
          <div className="mx-auto flex w-full max-w-measure flex-col gap-2">
            <PromptInput
              draftKey="hermes-ui-glaze-demo"
              placeholder="Ask Scout to rerun a routine"
              status="ready"
              generation="run_9a41"
              onAttach={() => console.log('[glaze-demo] attachment')}
              attachments={[]}
              accept=".md,.txt,.json"
              onSubmit={value => console.log('[glaze-demo] send', value.serialized)}
              tools={
                <DropdownMenu>
                  <DropdownMenuTrigger render={<PromptInputModel model={model} />} />
                  <DropdownMenuContent align="start" side="top" size="sm">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Model</DropdownMenuLabel>
                      <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
                        {MODELS.map(name => (
                          <DropdownMenuRadioItem key={name} value={name}>{name}</DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              }
            />
            <p className="type-caption text-text-3">
              Enter sends · <Kbd keys="shift+enter" /> for a new line
            </p>
          </div>
        </footer>
      </GlazePortalProvider>
    </div>
  )
}
