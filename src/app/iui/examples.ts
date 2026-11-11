// The three specs the skill shows and the demo draws, kept in one place so the two cannot drift.
//
// Compact JSON on one line each: what a bot actually writes between <hui-ui> and </hui-ui>. A team's data (bots
// Atlas, Scout, Nova, the routines they run), never placeholder text — an example that lies teaches the model to lie.
export type IuiExample = { id: string; title: string; json: string }

export const EXAMPLES: IuiExample[] = [
  {
    id: 'plan',
    title: 'Plan with a Checklist and buttons',
    json: '{"root":"r","elements":{"r":{"type":"Card","props":{"title":"Fix nightly-report","description":"Three steps before tonight’s rerun.","meta":"3 steps · 44 s"},"children":["c","b1","b2"]},"c":{"type":"Checklist","props":{"items":[{"label":"Read the log of the last run","status":"done","detail":"38 s"},{"label":"Find the worker’s memory leak","status":"running","detail":"running"},{"label":"Rerun on the Atlas bot","status":"todo","detail":"23:00"}]}},"b1":{"type":"Button","props":{"label":"Run it now","variant":"primary","action":{"name":"send","params":{"text":"Run nightly-report now"}}}},"b2":{"type":"Button","props":{"label":"Show the log","variant":"secondary","action":{"name":"send","params":{"text":"Show the last 20 lines of the nightly-report log"}}}}}}'
  },
  {
    id: 'comparison',
    title: 'Comparison as a table, two numbers',
    json: '{"root":"r","elements":{"r":{"type":"Stack","props":{"direction":"column","gap":"md"},"children":["g","t"]},"g":{"type":"Grid","props":{"columns":2},"children":["m1","m2"]},"m1":{"type":"Metric","props":{"label":"Cost per run, Nova","value":"€0.42","delta":"−18% over 7 days","status":"ok"}},"m2":{"type":"Metric","props":{"label":"Median duration, Atlas","value":"38 s","delta":"+6 s","status":"warn"}},"t":{"type":"Table","props":{"title":"Three routines, last run","columns":[{"key":"routine","label":"Routine"},{"key":"bot","label":"Bot"},{"key":"duration","label":"Duration","align":"end"},{"key":"cost","label":"Cost","align":"end"},{"key":"state","label":"State"}],"rows":[{"routine":"nightly-report","bot":"Atlas","duration":"38 s","cost":"€0.41","state":"Failed"},{"routine":"inbox-triage","bot":"Scout","duration":"12 s","cost":"€0.08","state":"Passed"},{"routine":"price-watch","bot":"Nova","duration":"54 s","cost":"€0.42","state":"Slow"},{"routine":"backup-cache","bot":"Atlas","duration":"67 s","cost":"€0.19","state":"Passed"},{"routine":"digest-slack","bot":"Nova","duration":"21 s","cost":"€0.12","state":"Passed"}]}}}}'
  },
  {
    id: 'form',
    title: 'Form with a counter, a choice and a send',
    json: '{"root":"r","elements":{"r":{"type":"Card","props":{"title":"Book the guest room","description":"Night of 12 November, at the lake house.","meta":"Estimate €96"},"children":["s","c","b"]},"s":{"type":"Stepper","props":{"label":"People","min":1,"max":6,"value":{"$bindState":"/guests"}}},"c":{"type":"Choice","props":{"label":"Plan","options":[{"value":"night","label":"Night and breakfast"},{"value":"day","label":"Day only"}],"value":{"$bindState":"/plan"}}},"b":{"type":"Button","props":{"label":"Request the booking","variant":"primary","action":{"name":"send","params":{"text":"Book for {{/guests}} people, {{/plan}} plan"}}}}},"state":{"guests":2,"plan":"night"}}'
  }
]

/** The three specs as a fenced block for the skill, one per line so the model reads the shape it must write. */
export function exampleBlock(example: IuiExample): string {
  return ['```', `<hui-ui>${example.json}</hui-ui>`, '```'].join('\n')
}
