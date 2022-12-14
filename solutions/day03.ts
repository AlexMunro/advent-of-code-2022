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
    return firstCompartment.split("").find((s) => secondCompartment.includes(s));
}

function findAllDupes(firstRucksack: String, secondRucksack: String): String[] {
    return firstRucksack.split("").filter((s) => secondRucksack.includes(s));
}

function sumBadgePriorities(rucksacks: String[]): number {
    let sum = 0;
    let indexesAccountedFor: Set<number> = new Set();

    outerloop:
    for (let firstElfIdx = 0; firstElfIdx < rucksacks.length; firstElfIdx++) {
        if (indexesAccountedFor.has(firstElfIdx)) {
            continue;
        }

        for (let secondElfIdx = firstElfIdx + 1; secondElfIdx < rucksacks.length; secondElfIdx++) {
            if (indexesAccountedFor.has(secondElfIdx)) {
                continue;
            }

            const dupes = findAllDupes(rucksacks[firstElfIdx], rucksacks[secondElfIdx]);

            for (let thirdElfIdx = secondElfIdx + 1; thirdElfIdx < rucksacks.length; thirdElfIdx++) {
                if (indexesAccountedFor.has(thirdElfIdx)) {
                    continue;
                }

                const potentialDupe = findDupe(dupes.join(), rucksacks[thirdElfIdx]);

                if (potentialDupe) {
                    sum += itemPriority(potentialDupe)
                    indexesAccountedFor.add(firstElfIdx)
                    indexesAccountedFor.add(secondElfIdx)
                    indexesAccountedFor.add(thirdElfIdx)
                    continue outerloop;
                }
            }
        }
    }

    return sum;
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

function partTwo(input: String[]) {
    return sumBadgePriorities(input);
}

console.log("The answer to part one is " + partOne(input));
console.log("The answer to part two is " + partTwo(input));
