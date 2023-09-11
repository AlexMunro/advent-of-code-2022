import * as fs from "fs";
import sum from "../utils/sum";

function caloriesPerElf(elfFoods: number[][]): number[] {
  return elfFoods.map((elf) => sum(elf));
}

function mostCaloriesOnAnyElf(caloriesPerElf: number[]): number {
  return Math.max(...caloriesPerElf);
}

function topThree(caloriesPerElf: number[]): number[] {
  return caloriesPerElf.sort((a, b) => a - b).slice(-3);
}

export function partOne(elfFoods: number[][]): number {
  return mostCaloriesOnAnyElf(caloriesPerElf(elfFoods));
}

export function partTwo(elfFoods: number[][]): number {
  return sum(topThree(caloriesPerElf(elfFoods)));
}

// Workaround because Bun Jest does not yet correctly set require/module
function runningAsMain(): boolean {
  if (typeof self === "undefined") {
    // node
    return require.main === module;
  } else {
    // bun
    return !self.process.argv[1].includes("test.ts");
  }
}

if (runningAsMain()) {
  const input: number[][] = fs
    .readFileSync("inputs/day01.txt", "utf-8")
    .split("\n\n")
    .filter((s) => s != "")
    .map((elfInput) => elfInput.split("\n").map((elfStr) => parseInt(elfStr)));

  console.log("The answer to part one is " + partOne(input));
  console.log("The answer to part two is " + partTwo(input));
}
