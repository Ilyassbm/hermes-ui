// Types for what esbuild's loaders hand us: `loader: {'.css': 'text'}` means a stylesheet imported from TS/TSX is
// a string, not a style side effect. scripts/build.mjs compiles src/styles/app.css and the surfaces import it as text.
declare module '*.css' {
  const content: string
  export default content
}
