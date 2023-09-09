import {partOne, partTwo} from "../solutions/day03";

describe("Day 03", () => {
    const rucksacks: string[] = [
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        "PmmdzqPrVvPwwTWBwg",
        "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
        "ttgJtRGJQctTZtZT",
        "CrZsJsPPZsGzwwsLwLmpwMDw",
    ];

    describe("partOne", () => {
        it("returns the sum of priorities of items appearing in both compartments", () => {
            expect(partOne(rucksacks)).toEqual(157);
        });
    });

    describe("partTwo", () => {
        it("returns predicted score according to the corrected guide", () => {
            expect(partTwo(rucksacks)).toEqual(70);
        });
    });
});
