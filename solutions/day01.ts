import * as fs from 'fs';

const input: () => number[][] = () => fs.readFileSync("inputs/day01.txt", "utf-8")
    .split("\n\n")
    .filter((s) => s != "")
    .map(elfInput => elfInput.split("\n")
        .map(elfStr => parseInt(elfStr)
    ));

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

export function partOne(elfFoods: number[][]): number {
    return mostCaloriesOnAnyElf(caloriesPerElf(elfFoods));
}

export function partTwo(elfFoods: number[][]): number {
    return sum(topThree(caloriesPerElf(elfFoods)));
}

if (require.main === module) {
    console.log("The answer to part one is " + partOne(input()));
    console.log("The answer to part two is " + partTwo(input()));
}
