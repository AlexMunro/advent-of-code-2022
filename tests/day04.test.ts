import {partOne, partTwo} from "../solutions/day04";

describe("Day 04", () => {
    const rangePairs: string[] = [
        "2-4,6-8",
        "2-3,4-5",
        "5-7,7-9",
        "2-8,3-7",
        "6-6,4-6",
        "2-6,4-8",
    ];

    describe("partOne", () => {
        it("returns the number of fully overlapping ranges", () => {
            expect(partOne(rangePairs)).toEqual(2);
        });
    });

    describe("partTwo", () => {
        it("returns the number of partially overlapping ranges", () => {
            expect(partTwo(rangePairs)).toEqual(4);
        });
    });
});
