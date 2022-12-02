import * as fs from 'fs';

const file = fs.readFileSync("inputs/day01.txt", "utf-8")

function parseElfFoods(rawInput: string): number[][] {
    return rawInput
        .split("\n\n")
        .filter((s) => s != "")
        .map((elfInput) => elfInput.split("\n").map((elfStr) => parseInt(elfStr)));
}

function caloriesPerElf(elfFoods: number[][]): number[] {
    return elfFoods.map((elf) => {
        return elf.reduce((sum, nextFood) => sum + nextFood, 0)
    });
}

function mostCaloriesOnAnyElf(caloriesPerElf: number[]): number {
    return Math.max(...caloriesPerElf);
}


function partOne(): string {
    return mostCaloriesOnAnyElf(caloriesPerElf(parseElfFoods(file))).toString();
}

console.log("The answer to part one is " + partOne());
