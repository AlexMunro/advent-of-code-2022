import * as fs from "fs";
import runningAsMain from "../utils/runningAsMain";

type Instructions = { stacks: string[][]; moves: Move[] };
type Move = { quantity: number; fromStack: number; toStack: number };
type CrateMover = (move: Move, instructions: Instructions) => void;

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

// Perform all moves
function processInstructions(
  rawInstructions: string[],
  mover: CrateMover,
): string {
  const instructions = parseInstructions(rawInstructions);

  instructions.moves.forEach((move) => mover(move, instructions));

  return instructions.stacks.map((stack) => stack[0]).join("");
}

export function partOne(rawInstructions: string[]): string {
  const crateMover9000: CrateMover = (move, instructions) => {
    for (let i = 0; i < move.quantity; i++) {
      instructions.stacks[move.toStack - 1].unshift(
        instructions.stacks[move.fromStack - 1].shift() as string,
      );
    }
  };

  return processInstructions(rawInstructions, crateMover9000);
}

export function partTwo(rawInstructions: string[]): string {
  const crateMover9001: CrateMover = (move, instructions) => {
    const chunkToMove = [];

    for (let i = 0; i < move.quantity; i++) {
      chunkToMove.push(
        instructions.stacks[move.fromStack - 1].shift() as string,
      );
    }

    instructions.stacks[move.toStack - 1].unshift(...chunkToMove);
  };

  return processInstructions(rawInstructions, crateMover9001);
}

if (runningAsMain()) {
  const input: string[] = fs
    .readFileSync("inputs/day05.txt", "utf-8")
    .split("\n");

  console.log(partOne(input));
  console.log(partTwo(input));
}
