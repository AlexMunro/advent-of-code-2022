import * as fs from 'fs';

const file = fs.readFileSync("inputs/day03.txt", "utf-8");

const input: String[] = file.split("\n").filter((s) => s != "");

function priorityOfDupedItem(rucksack: String): number {
    const firstCompartment = rucksack.slice(0, rucksack.length / 2);
    const secondCompartment = rucksack.slice(rucksack.length / 2);
    const dupedItem = findDupe(firstCompartment, secondCompartment)!;
    return itemPriority(dupedItem)
}

function findDupe(firstCompartment: String, secondCompartment: String): String | undefined {
    for (const char of firstCompartment.split("")) {
        if (secondCompartment.includes(char)) {
            return char;
        }
    }
}

function itemPriority(item: String): number {
    // They've reversed the orders of lower/upper case chars! Fiendish!
    if (item >= "a") {
        return item.charCodeAt(0) - "a".charCodeAt(0) + 1;
    } else {
        return item.charCodeAt(0) - "A".charCodeAt(0) + 27;
    }
}

function partOne(input: String[]): number {
    return input.reduce((sum, rucksack) => sum + priorityOfDupedItem(rucksack), 0);
}

console.log("The answer to part one is " + partOne(input));
// console.log("The answer to part two is " + partTwo());
