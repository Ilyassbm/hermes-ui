// Every visible word of the Hermes UI surface, in English, in one place.
//
// Lot 13: the plugin is submitted to the public catalog, whose interface language is English. Components read their
// copy from here instead of carrying string literals, so a wording change is one edit and a reviewer reading the
// bundle sees where every sentence comes from. Labels that come from the profile — a bot's name, its role, a
// conversation's title, a model's name — are data, not copy: they are never translated here.
//
// Nothing in this module imports anything: it is the leaf every other module may reach for.

export const UI = {
  /** The gateway wait at startup, and the quiet banner when it never opens. */
  boot: {
    gatewayUnavailable: "The Hermes gateway isn't answering yet — the page is still usable.",
    profilesUnreadable: "Couldn't read the bot list.",
    botUnreachable: (name: string) => `${name} is unreachable.`
  },

  /** The bots rail: search, the team fold, the pinned tiles, the app menu. */
  rail: {
    appName: 'Hermes',
    newChat: 'New chat',
    newWithBot: 'New conversation with a bot',
    search: 'Search',
    searchLabel: 'Search a bot or a conversation',
    pinned: 'Pinned',
    bots: 'Bots',
    team: 'Team',
    pinnedLabel: 'Pinned bots',
    teamLabel: 'Team',
    working: 'Working',
    waiting: 'Waiting',
    appMenu: 'Application menu',
    settings: 'Settings',
    /** The rail's one status line while the gateway socket is still opening. */
    connecting: 'Connecting…',
    scheduled: 'Scheduled tasks',
    agents: 'Agents & connections',
    shortcuts: 'Keyboard shortcuts',
    useNative: 'Use the native interface',
    useNativeTitle: 'Native interface',
    useNativeBody: 'New chats and sessions open the desktop pages.',
    newConversation: 'New conversation',
    unpin: 'Unpin',
    pin: 'Pin',
    profileSettings: 'Profile settings'
  },

  /** The centre's header: the conversation tabs and the model picker. */
  header: {
    conversations: (name: string) => `Conversations with ${name}`,
    conversation: 'Conversation',
    allConversations: 'All conversations',
    filterConversations: 'Filter conversations',
    noConversation: 'No conversation',
    newConversation: 'New conversation',
    toggleRail: 'Show or hide the bot list',
    showBots: 'Show bots',
    hideAside: 'Hide the panel',
    showAside: 'Show the panel',
    effort: 'Effort',
    model: 'Model',
    effortLabel: 'Reasoning effort',
    modelsUnavailable: 'Models unavailable',
    allModels: (name: string) => `All ${name} models…`,
    filterModels: (name: string) => `Filter ${name} models`,
    noModel: 'No model',
    modelAndEffort: (trigger: string) => `Model and effort, ${trigger}`
  },

  /** The model picker at the foot of the composer: the trigger, the provider groups, the effort. */
  model: {
    trigger: (model: string, effort: string) => `Model and effort: ${model}, ${effort}`,
    effortShort: { low: 'Low', medium: 'Med', high: 'High' } as Record<string, string>,
    allModels: (name: string) => `All ${name} models…`,
    filterModels: (name: string) => `Filter ${name} models`,
    unavailable: 'Models unavailable',
    noModel: 'No model'
  },

  /** The settings page registered in Settings ▸ Plugins. */
  settings: {
    title: 'Hermes UI',
    intro: 'How the workspace looks and behaves. These are the same preferences the page and the rail read.',
    appearance: 'Appearance',
    theme: 'Theme',
    themeSystem: 'System',
    themeDark: 'Dark',
    themeLight: 'Light',
    density: 'Density',
    densityComfortable: 'Comfortable',
    densityCompact: 'Compact',
    measure: 'Reading width',
    measureValue: (px: number) => `${px} px`,
    animations: 'Animations',
    animationsOn: 'On',
    animationsReduced: 'Reduced',
    chat: 'Chat',
    chatDefaults: (name: string) => `Defaults for ${name}`,
    chatDefaultsHint: 'The model and the effort the composer starts with for the bot that is open in the rail.',
    model: 'Default model',
    modelHint: 'Follow the profile, or pin one model for this bot.',
    modelProfileDefault: 'Bot default',
    effort: 'Default effort',
    sendKey: 'Send with',
    sendKeyEnter: 'Enter',
    sendKeyModEnter: '⌘ Enter',
    sendKeyHint: '⌘ Enter keeps Enter for a new line. Ctrl Enter on Windows and Linux.',
    activity: 'Activity line',
    activityHint: 'Show what the bot is doing above its reply while it works.',
    shortcuts: 'Shortcuts',
    shortcutsHint: 'The plugin’s own bindings, with the combo the app really dispatches.',
    changeKeybindings: 'Change in keybindings',
    about: 'About',
    version: 'Version',
    repository: 'Repository',
    license: 'License',
    licenseName: 'MIT',
    network: 'Network',
    networkBody: 'The workspace talks to your Hermes gateway only — sessions, models, approvals — and to its own /usage endpoint. No analytics, no third-party requests.',
    openRepository: 'Open the repository'
  },

  /** The bot picker dialog (⌘⌥N). */
  picker: {
    searchTitle: 'Search a bot or a conversation',
    newTitle: 'New conversation with a bot',
    newPlaceholder: 'New conversation with…',
    description: 'Pick a bot to start a conversation, or a conversation to open it.',
    listLabel: 'Bots and conversations',
    pinned: 'Pinned',
    bots: 'Bots',
    team: 'Team',
    conversations: 'Conversations',
    empty: 'No results'
  },

  /** The right panel: files, their preview, and the routines folded under them. */
  aside: {
    label: 'Files and routines',
    routines: 'Routines',
    createRoutine: 'Create a routine',
    routinesLabel: 'The bot’s routines',
    openRoutine: (name: string) => `Open routine ${name}`,
    active: 'Active',
    paused: 'Paused',
    noRoutine: 'No routine',
    noRoutineBody: 'Nothing is scheduled for this bot.',
    newRoutine: 'New routine',
    files: 'Files',
    filesLabel: 'Files in this conversation',
    openFile: (path: string) => `Preview ${path}`,
    noFiles: 'Files read or written in this conversation show up here.',
    noMatch: 'No file matches this filter.',
    filterFiles: 'Filter files',
    fileCount: (n: number) => `${n} file${n === 1 ? '' : 's'}`,
    action: { read: 'Read', write: 'Wrote', edit: 'Edited', shell: 'Ran' } as Record<string, string>,
    preview: 'Preview',
    back: 'Back to files',
    copyPath: 'Copy path',
    openNative: 'Open in the app',
    closePreview: 'Close the preview',
    loading: 'Loading…',
    source: 'Source',
    rendered: 'Rendered',
    previewUnavailable: 'Preview not available',
    binaryBody: 'This file is binary or too large to show here.',
    missing: 'This file is no longer there.',
    refused: 'This file is not readable from here.',
    tooLarge: (size: string) => `Too large to preview (${size}).`,
    linesShown: (shown: number, total: number) => `First ${shown.toLocaleString('en-US')} of ${total.toLocaleString('en-US')} lines.`,
    pathCopied: 'Path copied',
    copiedTitle: 'Path copied',
    unreadableTitle: 'Path unreadable'
  },

  /** The media blocks in the thread: an image, another file, its preview and its download. */
  media: {
    download: 'Download',
    openPreview: 'Open preview',
    unavailable: 'File not available',
    tooLarge: 'Too large to download here',
    zoom: 'Zoom the image',
    zoomOut: 'Zoom out',
    /** A send whose file the gateway refused: said in the thread, the message kept for a retry. */
    attachFailed: (name: string) => `Couldn't attach ${name}`
  },

  /** The subscription meters at the foot of the rail: one compact row each, and the panel a row opens. */
  usage: {
    title: (provider: string, plan: string) => `Usage limits · ${provider}${plan ? ` · ${plan}` : ''}`,
    fiveHour: '5-hour limit',
    weekly: 'Weekly · all models',
    monthly: 'Monthly',
    resetsAt: (time: string) => `Resets at ${time}`,
    resetsOn: (day: string, time: string) => `Resets ${day} ${time}`,
    /** The compact row's window: 5h when there is one, else the window that is closest to its limit. */
    short: { session: '5h', week: 'Wk', month: 'Mo' },
    /** The two providers the foot draws, when the gateway sends no label of its own. */
    providerNames: { claude: 'Claude', opencode_go: 'OpenCode Go' } as Record<string, string>,
    compact: (window: string, percent: number) => `${window} · ${percent} %`,
    expand: (provider: string) => `Show the usage limits of ${provider}`,
    collapse: (provider: string) => `Hide the usage limits of ${provider}`,
    noReset: 'No reset date',
    /** The foot's refresh control, right of the two meters. */
    refresh: 'Refresh usage',
    refreshFailed: "Couldn't refresh usage"
  },

  /** The composer, and every state Glaze's PromptInput can print. */
  composer: {
    label: (name: string) => `Write to ${name}`,
    placeholder: (name: string) => `Write to ${name}…`,
    labels: {
      send: 'Send',
      stop: 'Stop',
      stopping: 'Stopping…',
      sendAgain: 'Send again',
      attach: 'Attach a file',
      attachments: 'Attachments',
      drop: 'Drop to attach',
      uploading: (percent: number) => `Uploading ${percent}%`,
      uploadFailed: 'Upload failed',
      attached: 'Attached',
      retryFile: (fileName: string) => `Retry ${fileName}`,
      cancelUpload: (fileName: string) => `Cancel the upload of ${fileName}`,
      removeFile: (fileName: string) => `Remove ${fileName}`,
      undo: 'Undo',
      cancel: 'Cancel',
      removed: (label: string) => `${label} removed`,
      expanded: (label: string) => `${label} expanded`,
      clickToExpand: 'Click to expand',
      textOnly: 'This field takes text only',
      acceptOnly: (types: string) => `Only ${types} files can be attached here`,
      notAttached: (names: string[], accept?: string) =>
        `Not attached: ${names.join(', ')}.${accept ? ` Accepted formats: ${accept}` : ''}`,
      tooLong: (characters: number, fit: number) =>
        `Too long to paste: ${characters.toLocaleString('en-US')} characters, ${fit.toLocaleString('en-US')} fit. Attach it as a file.`,
      pasted: (lines: number, characters: number) =>
        lines > 1 ? `${lines} lines pasted` : `${characters.toLocaleString('en-US')} characters pasted`,
      waiting: (n: number) => `Waiting on ${n} upload${n > 1 ? 's' : ''}`,
      held: (n: number) => `Waiting on ${n} upload${n > 1 ? 's' : ''}. Sends as soon as they finish`,
      failed: (names: string[]) => `${names.join(', ')}: upload failed. Remove the file or try again`,
      waitingOnYou: (n: number) => `${n} call${n > 1 ? 's' : ''} waiting on you`,
      review: 'Review',
      files: 'Files and resources',
      commands: 'Commands',
      searchCommands: 'Search a command',
      noMatches: (query: string) => `No results for “${query}”`,
      results: (n: number) => `${n} result${n > 1 ? 's' : ''}`,
      shell: 'shell command',
      shellPlaceholder: 'Run a shell command',
      shellStatus: 'Shell. Escape to leave',
      off: 'Input is disabled'
    }
  },

  /** The thread: suggestions, the empty state, the errors. */
  thread: {
    suggestions: ['What are you working on?', 'What did you ship today?', 'Suggest the next step'],
    conversationWith: (name: string) => `Conversation with ${name}`,
    connecting: 'Connecting to Hermes…',
    loading: 'Opening the conversation',
    emptyTitle: (name: string) => `What are we doing with ${name}?`,
    suggestionsLabel: 'Suggestions',
    retry: 'Retry',
    /** The banner after `session.resume` timed out twice; its Retry replays the resume, not the last prompt. */
    resumeFailed: "Couldn't open this conversation — the bot's backend didn't answer in time.",
    /** The gateway answered, but with no history: a silent blank page under an active tab is the worst answer. */
    emptyHistory: "This conversation came back empty — the backend knows it but returned no history. Try again, or open it in the native view.",
    /** Messages arrived but none of them could be read: a shape we do not understand, not an empty conversation. */
    unreadableHistory: "This conversation came back in a shape this page cannot read. Try again, or open it in the native view — the line below says what arrived.",
    /** `prompt.submit` left no session event behind within 5 s: the turn never started. */
    turnNotStarted: "The turn didn't start — no answer came back from the gateway.",
    jumpLatest: 'Jump to latest',
    waitingOnYou: 'Waiting on you',
    viewport: { complete: 'Response complete', stopped: 'Stopped', failed: 'Response failed' }
  },

  /** One assistant turn: the activity line, the reasoning fold, the approval buttons, the copy. */
  turn: {
    thinking: (name: string) => `${name} is thinking…`,
    reasoning: {
      thinking: 'Thinking…',
      thoughtFor: (time: string) => `Thought for ${time}`,
      moment: 'a moment',
      stoppedEarly: 'Stopped before thinking'
    },
    always: 'Always allow',
    refuse: 'Refuse',
    allow: 'Allow',
    copyResponse: 'the response'
  },

  /** The tool registry: verbs, the permission question, the folded summary, the caps. */
  tools: {
    confirm: (ask: string) => `${ask}?`,
    status: {
      pending: 'Preparing',
      running: 'Running',
      completed: 'Done',
      error: 'Failed',
      'awaiting-permission': 'Waiting',
      denied: 'Refused',
      cancelled: 'Stopped'
    },
    orphaned: 'Orphaned result',
    result: 'Result',
    forCall: (id: string) => `for call ${id}`,
    showMore: 'Show more',
    showLess: 'Show less',
    trimmed: (characters: number) => `Trimmed to ${characters.toLocaleString('en-US')} characters`,
    added: 'added',
    removed: 'removed',
    worked: (time: string) => `Worked for ${time}`,
    ranTools: (count: number) => (count === 1 ? 'Ran 1 tool' : `Ran ${count} tools`),
    failedCount: (count: number) => (count === 1 ? '1 failure' : `${count} failures`),
    allow: 'Allow',
    deny: 'Refuse',
    tasks: (n: number) => `${n} task${n > 1 ? 's' : ''}`,
    verbs: {
      shell: { active: 'Running', done: 'Ran', ask: 'Run', noun: 'command', one: 'ran a command', many: (n: number) => `ran ${n} commands`, confirm: 'Run this command?' },
      read: { active: 'Reading', done: 'Read', ask: 'Read', noun: 'file', one: 'read a file', many: (n: number) => `read ${n} files` },
      edit: { active: 'Editing', done: 'Edited', ask: 'Edit', noun: 'file', one: 'edited a file', many: (n: number) => `edited ${n} files` },
      search: { active: 'Searching', done: 'Searched', ask: 'Search', noun: 'search', one: 'searched once', many: (n: number) => `searched ${n} times` },
      list: { active: 'Listing', done: 'Listed', ask: 'List', noun: 'pattern', one: 'searched once', many: (n: number) => `searched ${n} times` },
      searchWeb: { active: 'Searching the web', done: 'Searched the web', ask: 'Search the web', noun: 'web search', one: 'searched the web', many: (n: number) => `searched the web ${n} times` },
      web: { active: 'Reading a page', done: 'Read a page', ask: 'Read the page', noun: 'page', one: 'read a page', many: (n: number) => `read ${n} pages` },
      browser: { active: 'Browsing', done: 'Browsed', ask: 'Browse', noun: 'page', one: 'browsed a page', many: (n: number) => `browsed ${n} pages` },
      code: { active: 'Running code', done: 'Ran code', ask: 'Run the code', noun: 'code', one: 'ran code', many: (n: number) => `ran code ${n} times` },
      clarify: { active: 'Asking', done: 'Asked', ask: 'Ask the question', noun: 'question', one: 'asked a question', many: (n: number) => `asked ${n} questions` },
      skill: { active: 'Reading a skill', done: 'Read a skill', ask: 'Read the skill', noun: 'skill', one: 'read a skill', many: (n: number) => `read ${n} skills` },
      memory: { active: 'Updating memory', done: 'Updated memory', ask: 'Update memory', noun: 'memory', one: 'updated memory', many: (n: number) => `updated memory ${n} times` },
      image: { active: 'Generating an image', done: 'Generated an image', ask: 'Generate the image', noun: 'image', one: 'generated an image', many: (n: number) => `generated ${n} images` },
      delegate: { active: 'Delegating', done: 'Delegated', ask: 'Delegate', noun: 'task', one: 'delegated a task', many: (n: number) => `delegated ${n} tasks`, confirm: 'Delegate these tasks?' }
    }
  },

  /** Host commands: the sidebar row, the palette, the keybinds, the toasts. */
  plugin: {
    open: 'Open Hermes UI',
    goToBot: (n: number) => `Hermes UI: go to bot ${n}`,
    useNative: 'Hermes UI: use the native interface',
    everywhere: 'Hermes UI: use Hermes UI everywhere',
    everywhereToast: 'Hermes UI everywhere',
    everywhereBody: 'New chats and sessions open Hermes UI.',
    statusbar: 'Hermes UI: status bar',
    newConversation: 'Hermes UI: new conversation (current bot)',
    newWithBot: 'Hermes UI: new conversation with a bot…',
    search: 'Hermes UI: search bots and conversations',
    toggleAside: 'Hermes UI: show or hide the panel',
    sessionMissing: 'Conversation not found'
  },

  /** The live activity line: what a running bot is doing, in three words. */
  activity: {
    read: 'read a file',
    write: 'wrote a file',
    edit: 'edited a file',
    searchFiles: 'searched the files',
    shell: 'ran a command',
    webSearch: 'searched the web',
    webRead: 'read a web page',
    browse: 'browsed the web',
    code: 'ran code',
    vision: 'looked at an image',
    image: 'generated an image',
    speech: 'prepared audio',
    skill: 'read its skills',
    memory: 'updated its memory',
    session: 'searched its conversations',
    todo: 'organised its tasks',
    clarify: 'asked you a question',
    cron: 'scheduled a task',
    message: 'sent a message',
    tool: 'used a tool',
    uses: (name: string) => `used ${name}`,
    works: 'is working',
    fallback: (name: string) => `used ${name.replace(/_/g, ' ')}`,
    /** The same vocabulary in the present tense: the line under the turn says what runs now. */
    present: {
      read: 'reads a file',
      write: 'writes a file',
      edit: 'edits a file',
      searchFiles: 'searches the files',
      shell: 'runs a command',
      webSearch: 'searches the web',
      webRead: 'reads a web page',
      browse: 'browses the web',
      code: 'runs code',
      vision: 'looks at an image',
      image: 'generates an image',
      speech: 'prepares audio',
      skill: 'reads its skills',
      memory: 'updates its memory',
      session: 'searches its conversations',
      todo: 'organises its tasks',
      clarify: 'asks you a question',
      cron: 'schedules a task',
      message: 'sends a message',
      tool: 'uses a tool',
      uses: (name: string) => `uses ${name}`,
      works: 'is working',
      fallback: (name: string) => `uses ${name.replace(/_/g, ' ')}`
    }
  },

  /** The line that shows a turn is still running: its verb, its counting time, and what Stop says. */
  working: {
    /** Nothing has happened yet. */
    thinking: 'thinking',
    /** Text is arriving. */
    writing: 'writing',
    /** Delegated work, with the number of tasks when the call names them. */
    delegates: (n: number) => (n > 1 ? `delegates ${n} tasks` : 'delegates a task'),
    /** The folded line once a turn was stopped. */
    worked: (time: string) => `Worked for ${time}`,
    /** The rail's one line under the bot's name, and the tab's name for its dot. */
    now: 'working',
    label: (name: string) => `${name} is working`,
    /** Stop failed: the turn is still live, said quietly under the composer. */
    stopFailed: "Couldn't stop the turn — it is still running."
  },

  /** Slash commands run by the page itself. */
  slash: {
    busy: 'Stop the running response before starting a command.',
    unavailable: 'command unavailable',
    unknown: 'unknown command'
  },

  /** The time words the rail and the timeline print. */
  time: {
    now: 'now',
    hourShort: 'h',
    dayShort: 'd',
    yesterday: 'yesterday',
    conversations: ["Today", 'Yesterday', 'Last 7 days', 'Older'],
    resetInDays: (n: number) => `in ${n} d`,
    resetInHours: (h: number, m: string) => `in ${h} h ${m}`,
    resetInMinutes: (m: number) => `in ${m} min`
  },

  /** The intelligent-UI renderers: status words, the chart fallback, the copy toasts. */
  iui: {
    status: { done: 'Done', running: 'Running', waiting: 'Waiting', failed: 'Failed', todo: 'To do' },
    chartFallback: 'Chart',
    tabsLabel: 'Tabs',
    less: (label: string) => `Less: ${label}`,
    more: (label: string) => `More: ${label}`,
    sent: 'Sent',
    copied: 'Copied',
    copyFailed: 'Copy failed'
  }
} as const

export type UiCopy = typeof UI
