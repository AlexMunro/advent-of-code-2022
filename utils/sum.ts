export default function sum(xs: number[]): number {
  return xs.reduce((sum, n) => sum + n, 0);
}
