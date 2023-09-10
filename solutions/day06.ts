import * as fs from "fs";

export function partOne(signal: string): number {
  for (let i = 4; i < signal.length; i++) {
    if (new Set(signal.slice(i - 4, i)).size == 4) {
      return i;
    }
  }

  throw Error("Signal does not have start-of-packet marker");
}

if (require.main === module) {
  const input: string = fs.readFileSync("inputs/day06.txt", "utf-8").trim();
  console.log(partOne(input));
}
