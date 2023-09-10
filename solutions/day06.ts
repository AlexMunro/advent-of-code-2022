import * as fs from "fs";

function firstDistinctNCharsIndex(signal: string, n: number): number {
  let i = n;

  while (i < signal.length) {
    const distinctCharsInChunk = new Set(signal.slice(i - n, i)).size;

    if (distinctCharsInChunk == n) {
      return i;
    } else {
      i += n - distinctCharsInChunk; // Skip ahead as far as we know we can
    }
  }

  throw Error(`Unable to find distinct sequence of ${n} chars in ${signal}`);
}

export function partOne(signal: string): number {
  return firstDistinctNCharsIndex(signal, 4);
}

export function partTwo(signal: string): number {
  return firstDistinctNCharsIndex(signal, 14);
}

if (require.main === module) {
  const input: string = fs.readFileSync("inputs/day06.txt", "utf-8").trim();
  console.log(partOne(input));
  console.log(partTwo(input));
}
