import * as fs from 'fs';

const file = fs.readFileSync("inputs/day01.txt", "utf-8")

function parseElfFoods(rawInput: string): number[][] {
    return rawInput
        .split("\n\n")
        .filter((s) => s != "")
        .map((elfInput) => elfInput.split("\n").map((elfStr) => parseInt(elfStr)));
}

function caloriesPerElf(elfFoods: number[][]): number[] {
    return elfFoods.map((elf) => sum(elf));
}

function mostCaloriesOnAnyElf(caloriesPerElf: number[]): number {
    return Math.max(...caloriesPerElf);
}

function topThree(caloriesPerElf: number[]): number[] {
    return caloriesPerElf.sort((a, b) => a - b).slice(-3);
}

function sum(numbers: number[]): number {
    return numbers.reduce((sum, n) => sum + n);
}

function partOne(): string {
    return mostCaloriesOnAnyElf(caloriesPerElf(parseElfFoods(file))).toString();
}

function partTwo(): string {
    return sum(topThree(caloriesPerElf(parseElfFoods(file)))).toString();
}

console.log("The answer to part one is " + partOne());
console.log("The answer to part two is " + partTwo());
