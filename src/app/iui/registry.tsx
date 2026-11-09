'use client';

// What each catalog type draws: Glaze components, nothing hand-built beyond a row of tokens.
//
// The spec is data, so every renderer here is a leaf of the app's trust: it reads props, writes the state path the
// spec bound, and calls at most the three catalogue actions. An unknown type is not a component — the renderer falls
// back to its children, so a spec written for a newer catalogue shows what it can and never raw JSON.
import { Children, Fragment, isValidElement, useId, useState, type ReactNode } from 'react'
import { getByPath } from '@json-render/core'
import { defineRegistry, useActions, useStateStore } from '@json-render/react'
import { Icon, Add, Subtract } from '@/components/glaze/icon'
import { Alert, AlertDescription, AlertTitle } from '@/components/glaze/ui/alert'
import { Button } from '@/components/glaze/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardMeta, CardTitle } from '@/components/glaze/ui/card'
import { Chart } from '@/components/glaze/ui/chart'
import { CodeBlock } from '@/components/glaze/ui/code-block'
import { DataList, DataListItem, DataListLabel, DataListValue } from '@/components/glaze/ui/data-list'
import { Field, FieldLabel } from '@/components/glaze/ui/field'
import { Input } from '@/components/glaze/ui/input'
import { SegmentedControl, SegmentedControlItem } from '@/components/glaze/ui/segmented-control'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/glaze/ui/select'
import { Slider } from '@/components/glaze/ui/slider'
import { Status } from '@/components/glaze/ui/status'
import { Step, StepDescription, StepIndicator, StepText, StepTitle, StepTrigger, Steps } from '@/components/glaze/ui/steps'
import { Switch } from '@/components/glaze/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/glaze/ui/table'
import { toast } from '@/components/glaze/ui/toast'
import { Response } from '@/components/glaze/ai/response'
import { openExternal, send as sendMessage } from '@/lib/hermes'
import { catalog } from './catalog'
import { UI } from '../strings'

// ---------- What the app hands to a spec ----------

/** Where a spec's actions land: the open conversation, unless a screen hands its own in (the demo logs instead). */
export type IuiSink = { send: (text: string) => void }
let sink: IuiSink = { send: (text: string) => void sendMessage(text) }

export function getIuiSink(): IuiSink {
  return sink
}

export function setIuiSink(next: Partial<IuiSink>) {
  sink = { ...sink, ...next }
}

/** `{{/guests}}` reads the state the spec seeded, so a sentence follows the counters above it. */
export function interpolate(text: string, state: Record<string, unknown>): string {
  return String(text ?? '').replace(/\{\{\s*(\/[^}]*)\s*\}\}/g, (_, path: string) => {
    const value = getByPath(state ?? {}, path.trim())
    return value === null || value === undefined ? '' : String(value)
  })
}

// ---------- A bound value ----------

/** An interactive value: the spec binds it with `$bindState`, the renderer hands the path back in `bindings`. */
function useWrite(bindings?: Record<string, string>) {
  const { set } = useStateStore()
  const path = bindings?.value
  return (next: unknown) => {
    if (path) set(path, next)
  }
}

const STATUS = { done: 'ok', running: 'running', waiting: 'waiting', failed: 'fail', todo: 'idle' } as const
const STATUS_WORD = UI.iui.status
const GAP = { sm: 'gap-2', md: 'gap-3', lg: 'gap-5' } as const

/** A `Button` child of a card, marked by its own renderer so the card can lift it into the footer. */
function isAction(node: ReactNode): boolean {
  return isValidElement(node) && Boolean((node.props as Record<string, unknown>)?.['data-iui-action'])
}

// json-render's prop inference reads a union of a literal and a `$state` object as `unknown`, so each renderer states
// its own shape here instead of fighting it; the zod schema in the catalog is still the contract that admits a spec.
type Ctx = { props: any; children?: ReactNode; slots?: Record<string, ReactNode>; bindings?: Record<string, string> }
const view = (render: (ctx: Ctx) => ReactNode) => render as never

// ---------- The catalogue ----------

export const { registry, handlers } = defineRegistry(catalog, {
  components: {
    Card: view(({ props, children, slots }) => {
      // Buttons land in the footer whether the spec put them in children or in the declared footer slot.
      const all = [...Children.toArray(children), ...Children.toArray(slots?.footer)]
      const actions = all.filter(isAction)
      const body = all.filter(node => !isAction(node))
      return (
        <Card>
          <CardHeader>
            <CardTitle>{props.title}</CardTitle>
            {props.description ? <CardDescription>{props.description}</CardDescription> : null}
          </CardHeader>
          {body.length ? <CardContent>{body}</CardContent> : null}
          {actions.length || props.meta ? (
            <CardFooter>
              {props.meta ? <CardMeta>{props.meta}</CardMeta> : null}
              {actions}
            </CardFooter>
          ) : null}
        </Card>
      )
    }),

    Stack: view(({ props, children }) => (
      <div className={`flex min-w-0 ${props.direction === 'row' ? 'flex-row flex-wrap items-center' : 'flex-col'} ${GAP[props.gap ?? 'md']}`}>
        {children}
      </div>
    )),

    Grid: view(({ props, children }) => (
      <div className={`grid min-w-0 gap-3 ${props.columns === 2 ? 'grid-cols-2' : props.columns === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>{children}</div>
    )),

    Text: view(({ props }) => (
      <Response size="sm" className={props.tone === 'muted' ? 'text-text-2' : undefined}>
        {props.text}
      </Response>
    )),

    Metric: view(({ props }) => {
      const tone =
        props.status === 'ok' ? 'text-ok-text' : props.status === 'warn' ? 'text-warn-text' : props.status === 'fail' ? 'text-fail-text' : 'text-text-2'
      return (
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="type-heading text-text-1">{props.value}</span>
          <span className="type-label-sm text-text-2">{props.label}</span>
          {props.delta ? <span className={`type-caption ${tone}`}>{props.delta}</span> : null}
          {props.hint ? <span className="type-caption text-text-3">{props.hint}</span> : null}
        </div>
      )
    }),

    KeyValue: view(({ props }) => (
      <DataList orientation="horizontal">
        {props.items.map((item: any, i: number) => (
          <DataListItem key={`${item.label}-${i}`}>
            <DataListLabel>{item.label}</DataListLabel>
            <DataListValue>{item.value}</DataListValue>
          </DataListItem>
        ))}
      </DataList>
    )),

    Table: view(({ props }) => (
      <Table title={props.title} count={props.rows.length}>
        <TableHeader>
          <TableRow>
            {props.columns.map((column: any) => (
              <TableHead key={column.key} numeric={column.align === 'end'}>
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.rows.map((row: any, i: number) => (
            <TableRow key={i}>
              {props.columns.map((column: any) => {
                const value = row[column.key]
                return (
                  <TableCell key={column.key} numeric={column.align === 'end'}>
                    {value === null || value === undefined ? '—' : String(value)}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )),

    Chart: view(({ props }) => (
      <Chart
        type={props.kind === 'bar' ? 'bar' : 'line'}
        area={props.kind === 'area'}
        label={props.title ?? UI.iui.chartFallback}
        height={props.height}
        data={props.data}
        xKey={props.xKey}
        config={Object.fromEntries(props.series.map((series: any) => [series.key, { label: series.label, status: series.status }]))}
        series={props.series.map((series: any) => series.key)}
      />
    )),

    Checklist: view(({ props }) => (
      <div className="flex min-w-0 flex-col">
        {props.items.map((item: any, i: number) => (
          <div key={`${item.label}-${i}`} className="flex min-h-(--row) items-center gap-3 border-b border-line-faint px-1 py-2 last:border-b-0">
            <Status status={STATUS[item.status as keyof typeof STATUS]} size="sm">
              {STATUS_WORD[item.status as keyof typeof STATUS_WORD]}
            </Status>
            <span className="type-body-sm min-w-0 flex-1 text-text-1">{item.label}</span>
            {item.detail ? <span className="type-caption shrink-0 text-text-3">{item.detail}</span> : null}
          </div>
        ))}
      </div>
    )),

    Steps: view(({ props }) => (
      <Steps value={0} orientation="vertical" size="sm">
        {props.items.map((item: any, i: number) => (
          <Step key={`${item.title}-${i}`} step={i + 1} state="upcoming">
            <StepTrigger>
              <StepIndicator />
              <StepText>
                <StepTitle>{item.title}</StepTitle>
                {item.detail ? <StepDescription>{item.detail}</StepDescription> : null}
                {item.time ? <span className="type-caption text-text-3">{item.time}</span> : null}
              </StepText>
            </StepTrigger>
          </Step>
        ))}
      </Steps>
    )),

    Callout: view(({ props }) => (
      <Alert status={props.tone === 'info' ? 'neutral' : props.tone}>
        <AlertTitle>{props.title}</AlertTitle>
        <AlertDescription>{props.text}</AlertDescription>
      </Alert>
    )),

    Tabs: view(({ props, children, bindings }) => {
      const write = useWrite(bindings)
      return (
        <div className="flex min-w-0 flex-col gap-3">
          <SegmentedControl value={props.value} onValueChange={(next: string) => write(next)} aria-label={UI.iui.tabsLabel}>
            {props.tabs.map((tab: any) => (
              <Fragment key={tab.id}>
                <SegmentedControlItem value={tab.id}>{tab.label}</SegmentedControlItem>
              </Fragment>
            ))}
          </SegmentedControl>
          {children}
        </div>
      )
    }),

    Image: view(({ props }) => {
      // Only an https source or a path the app serves, plus the three data: types a screenshot takes.
      const src = String(props.src ?? '')
      const safe = /^https:\/\//i.test(src) || /^\/(?!\/)/.test(src) || /^data:image\/(png|jpeg|webp);/i.test(src)
      if (!safe) return null
      return (
        <figure className="flex min-w-0 flex-col gap-1">
          <img src={src} alt={props.alt} className="max-w-full rounded-panel border border-line-faint" />
          {props.caption ? <figcaption className="type-caption text-text-3">{props.caption}</figcaption> : null}
        </figure>
      )
    }),

    CodeBlock: view(({ props }) => <CodeBlock code={props.code} language={props.language ?? 'text'} />),

    Choice: view(({ props, bindings }) => {
      const write = useWrite(bindings)
      return (
        <div className="flex min-w-0 flex-col gap-2">
          <span className="type-label-sm text-text-2">{props.label}</span>
          <SegmentedControl value={props.value} onValueChange={(next: string) => write(next)} aria-label={props.label}>
            {props.options.map((option: any) => (
              <Fragment key={option.value}>
                <SegmentedControlItem value={option.value}>{option.label}</SegmentedControlItem>
              </Fragment>
            ))}
          </SegmentedControl>
        </div>
      )
    }),

    Stepper: view(({ props, bindings }) => {
      const write = useWrite(bindings)
      const step = props.step ?? 1
      const clamp = (n: number) => Math.min(props.max, Math.max(props.min, n))
      return (
        <div className="flex min-w-0 items-center gap-2">
          <span className="type-label-sm me-auto text-text-2">{props.label}</span>
          <Button variant="secondary" size="icon-sm" aria-label={UI.iui.less(props.label)} disabled={props.value <= props.min} onClick={() => write(clamp(props.value - step))}>
            <Icon icon={Subtract} size={14} />
          </Button>
          <span className="type-label min-w-(--control-sm) text-center tabular-nums text-text-1">{props.value}</span>
          <Button variant="secondary" size="icon-sm" aria-label={UI.iui.more(props.label)} disabled={props.value >= props.max} onClick={() => write(clamp(props.value + step))}>
            <Icon icon={Add} size={14} />
          </Button>
        </div>
      )
    }),

    Slider: view(({ props, bindings }) => {
      const write = useWrite(bindings)
      return (
        <div className="flex min-w-0 flex-col gap-2">
          <span className="type-label-sm text-text-2">
            {props.label}
            {props.unit ? ` (${props.unit})` : ''}
          </span>
          <Slider
            value={props.value}
            min={props.min}
            max={props.max}
            step={props.step ?? 1}
            showValue
            locale="en-US"
            thumbLabels={[props.label]}
            onValueChange={(next: number | readonly number[]) => write(Array.isArray(next) ? next[0] : next)}
          />
        </div>
      )
    }),

    Switch: view(({ props, bindings }) => {
      const write = useWrite(bindings)
      const id = useId()
      return (
        <div className="flex min-w-0 items-center gap-3">
          <Switch checked={props.value} onCheckedChange={(next: boolean) => write(next)} id={id} />
          <label htmlFor={id} className="type-body-sm min-w-0 flex-1 text-text-1">
            {props.label}
          </label>
        </div>
      )
    }),

    TextField: view(({ props, bindings }) => {
      const write = useWrite(bindings)
      return (
        <Field>
          <FieldLabel>{props.label}</FieldLabel>
          <Input value={props.value ?? ''} placeholder={props.placeholder} onValueChange={(next: string) => write(next)} />
        </Field>
      )
    }),

    Select: view(({ props, bindings }) => {
      const write = useWrite(bindings)
      const items = props.options.map((option: any) => ({ value: option.value, label: option.label }))
      return (
        <Field>
          <FieldLabel>{props.label}</FieldLabel>
          <Select items={items} value={props.value} onValueChange={(next: string | null) => write(next)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {items.map((item: { value: string; label: string }) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )
    }),

    Button: view(({ props }) => {
      const { execute } = useActions()
      const { getSnapshot } = useStateStore()
      const [sent, setSent] = useState(false)
      const isSend = props.action.name === 'send'
      return (
        <Button
          data-iui-action=""
          size="sm"
          variant={props.variant}
          disabled={isSend && sent}
          onClick={() => {
            // The state is read at the click, not at the render: a counter changed after the spec arrived still lands.
            const params = { ...(props.action.params ?? {}) }
            if (typeof params.text === 'string') params.text = interpolate(params.text, getSnapshot())
            void execute({ action: props.action.name, params }).then(() => {
              if (isSend) setSent(true)
            })
          }}
        >
          {isSend && sent ? UI.iui.sent : props.label}
        </Button>
      )
    })
  },

  actions: {
    send: async params => {
      // The text arrives interpolated: the Button reads the live state at the click, not the state the spec was
      // born with, so a counter moved after the spec landed still lands in the sentence.
      const text = String(params?.text ?? '').trim()
      if (text) sink.send(text)
    },
    copy: async params => {
      try {
        await navigator.clipboard.writeText(String(params?.text ?? ''))
        toast(UI.iui.copied)
      } catch {
        toast.fail(UI.iui.copyFailed)
      }
    },
    open: async params => {
      openExternal(String(params?.url ?? ''))
    }
  }
})