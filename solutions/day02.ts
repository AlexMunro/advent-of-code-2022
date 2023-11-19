import * as fs from "fs";
import runningAsMain from "../utils/runningAsMain";

enum Move {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

/**
 * Represents rounds as pairs of moves
 *    Rock: 1
 *    Paper: 2
 *    Scissors: 3
 *
 *  Being 1 "more" wins, being equal draws and being 1 "less" loses
 */

function parseMovePairs(input: string[]): Move[][] {
  const opponentBase = "A".codePointAt(0)! - 1;
  const playerBase = "X".codePointAt(0)! - 1;

  return input.map((pair) => {
    const opponentMove = pair.codePointAt(0)!;
    const playerMove = pair.codePointAt(2)!;
    return [opponentMove - opponentBase, playerMove - playerBase];
  });
}

/**
 * Infer the correct player move from a given result
 */
function secretlyParseMovePairs(input: string[]): Move[][] {
  const opponentBase = "A".codePointAt(0)! - 1;

  return input.map((pair) => {
    const opponentMove = pair.codePointAt(0)! - opponentBase;

    let playerMove;

    switch (pair[2]) {
      case "X": // lose
        playerMove = (opponentMove + 3) % 4; // Subtract one, modulo 4
        if (playerMove == 0) {
          playerMove = 3;
        }
        break;
      case "Y": // draw
        playerMove = opponentMove;
        break;
      case "Z": // win
        playerMove = (opponentMove % 3) + 1;
        break;
      default:
        throw new Error("Invalid move " + pair[2]);
    }

    return [opponentMove, playerMove];
  });
}

function scoreForRound(round: Move[]): number {
  const [opponentMove, playerMove] = round;

  // Hacked together modulo to handle opponentMove > playerMove
  switch ((playerMove - opponentMove + 3) % 3) {
    case 0: // Draw
      return playerMove + 3;
    case 1: // Win
      return playerMove + 6;
    case 2: // Lose
      return playerMove;
  }

  throw new Error("Invalid result: " + (playerMove - opponentMove));
}

export function partOne(guide: string[]): number {
  const parsedMoves = parseMovePairs(guide);
  return parsedMoves.reduce((sum, round) => sum + scoreForRound(round), 0);
}

export function partTwo(guide: string[]): number {
  const secretlyParsedMoves = secretlyParseMovePairs(guide);
  return secretlyParsedMoves.reduce(
    (sum, round) => sum + scoreForRound(round),
    0,
  );
}

if (runningAsMain()) {
  const input: string[] = fs
    .readFileSync("inputs/day02.txt", "utf-8")
    .split("\n")
    .filter((s) => s != "");

  console.log("The answer to part one is " + partOne(input));
  console.log("The answer to part two is " + partTwo(input));
}
