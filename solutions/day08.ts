import * as fs from "fs";
import runningAsMain from "../utils/runningAsMain";

function treesLeftOf(
  row: number,
  column: number,
  forest: number[][],
): number[] {
  return forest[row].slice(0, column);
}

function treesRightOf(
  row: number,
  column: number,
  forest: number[][],
): number[] {
  return forest[row].slice(column + 1);
}

function treesAbove(row: number, column: number, forest: number[][]): number[] {
  return forest.slice(0, row).map((r) => r[column]);
}

function treesBelow(row: number, column: number, forest: number[][]): number[] {
  return forest.slice(row + 1).map((r) => r[column]);
}

function treeIsVisible(
  row: number,
  column: number,
  forest: number[][],
): boolean {
  if (forest[row][column] > Math.max(...treesLeftOf(row, column, forest))) {
    return true;
  }

  if (forest[row][column] > Math.max(...treesRightOf(row, column, forest))) {
    return true;
  }

  if (forest[row][column] > Math.max(...treesAbove(row, column, forest))) {
    return true;
  }

  if (forest[row][column] > Math.max(...treesBelow(row, column, forest))) {
    return true;
  }

  return false;
}

function interiorVisibleTreeCount(forest: number[][]): number {
  let visibleCount = 0;

  for (let row = 1; row < forest.length - 1; row++) {
    for (let column = 1; column < forest[0].length - 1; column++) {
      if (treeIsVisible(row, column, forest)) {
        visibleCount++;
      }
    }
  }

  return visibleCount;
}

function canSeeFirst(treeSize: number, otherTrees: number[]): number {
  let seenTrees = 0;
  for (const nextTree of otherTrees) {
    seenTrees++;
    if (nextTree >= treeSize) {
      break;
    }
  }
  return seenTrees;
}

function scenicScore(row: number, column: number, forest: number[][]) {
  const treeSize = forest[row][column];

  const scenicLeft = canSeeFirst(
    treeSize,
    treesLeftOf(row, column, forest).reverse(),
  );

  const scenicRight = canSeeFirst(treeSize, treesRightOf(row, column, forest));

  const scenicUp = canSeeFirst(
    treeSize,
    treesAbove(row, column, forest).reverse(),
  );

  const scenicDown = canSeeFirst(
    treeSize, treesBelow(row, column, forest)
  );

  return scenicLeft * scenicRight * scenicUp * scenicDown;
}

export function partOne(input: number[][]): number {
  return (
    input.length * 2 + input[0].length * 2 - 4 + interiorVisibleTreeCount(input)
  );
}

export function partTwo(input: number[][]): number {
  let maxScenicScore = 0;

  for (let row = 1; row < input.length - 1; row++) {
    for (let column = 1; column < input[0].length - 1; column++) {
      const currentScenicScore = scenicScore(row, column, input);
      if (currentScenicScore > maxScenicScore) {
        maxScenicScore = currentScenicScore;
      }
    }
  }

  return maxScenicScore;
}

if (runningAsMain()) {
  const input: number[][] = fs
    .readFileSync("inputs/day08.txt", "utf-8")
    .split("\n")
    .filter((s) => s != "")
    .map((s) => s.split("").map((char) => Number.parseInt(char)));

  console.log("The answer to part one is " + partOne(input));
  console.log("The answer to part two is " + partTwo(input));
}
