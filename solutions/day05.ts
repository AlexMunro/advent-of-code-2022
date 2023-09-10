import * as fs from "fs";

type Instructions = { stacks: string[][]; moves: Move[] };
type Move = { quantity: number; fromStack: number; toStack: number };

export function parseInstructions(rawInstructions: string[]): Instructions {
  const stackCount = (rawInstructions[0].length + 1) / 4;

  const stacks: string[][] = Array.from({ length: stackCount }, () => []);
  const moves: Move[] = [];

  const stackRegex = /\[(\w)\]/g;
  const moveRegex = /^move (\d+) from (\d) to (\d)$/;

  rawInstructions.forEach((line) => {
    let match;
    const stackMatches = [...line.matchAll(stackRegex)];

    if (stackMatches.length > 0) {
      stackMatches.forEach((match) => {
        const stackIdx = match.index! / 4;
        stacks[stackIdx].push(match[1]);
      });
    } else if ((match = line.match(moveRegex))) {
      const quantity = Number.parseInt(match[1]);
      const fromStack = Number.parseInt(match[2]);
      const toStack = Number.parseInt(match[3]);

      moves.push({ quantity, fromStack, toStack });
    }
  });

  return { stacks, moves };
}

export function partOne(rawInstructions: string[]): string {
  const instructions = parseInstructions(rawInstructions);

  instructions.moves.forEach((move) => {
    for (let i = 0; i < move.quantity; i++) {
      instructions.stacks[move.toStack - 1].unshift(
        instructions.stacks[move.fromStack - 1].shift() as string,
      );
    }
  });

  return instructions.stacks.map((stack) => stack[0]).join("");
}

if (require.main === module) {
  const input: string[] = fs
    .readFileSync("inputs/day05.txt", "utf-8")
    .split("\n");

  console.log(partOne(input));
}
