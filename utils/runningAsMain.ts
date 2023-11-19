// Ordinarily, you could do require.main === module in the main source file
// but Bun does not correctly set require so this grubby workaround
// is required instead. This builds in the assumption that we'd never
// import one solution file into another, which I _hope_ is safe.
export default function runningAsMain(): boolean {
  return !globalThis.process.argv[1].match(/(t|j)est/);
}
