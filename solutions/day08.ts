import * as fs from "fs";
import runningAsMain from "../utils/runningAsMain";

function treeIsVisible(
  row: number,
  column: number,
  forest: number[][],
): boolean {
  // Visible from the left
  const treesToTheLeft = forest[row].slice(0, column);
  if (forest[row][column] > Math.max(...treesToTheLeft)) {
    return true;
  }

  const treesToTheRight = forest[row].slice(column + 1);
  if (forest[row][column] > Math.max(...treesToTheRight)) {
    return true;
  }

  // Visible from the bottom
  const treesAbove = forest.slice(0, row).map((r) => r[column]);
  if (forest[row][column] > Math.max(...treesAbove)) {
    return true;
  }

  const treesBelow = forest.slice(row + 1).map((r) => r[column]);
  if (forest[row][column] > Math.max(...treesBelow)) {
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

export function partOne(input: number[][]): number {
  return (
    input.length * 2 + input[0].length * 2 - 4 + interiorVisibleTreeCount(input)
  );
}

if (runningAsMain()) {
  const input: number[][] = fs
    .readFileSync("inputs/day08.txt", "utf-8")
    .split("\n")
    .filter((s) => s != "")
    .map((s) => s.split("").map((char) => Number.parseInt(char)));

  console.log("The answer to part one is " + partOne(input));
}
