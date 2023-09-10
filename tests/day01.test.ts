import { partOne, partTwo } from "../solutions/day01";

describe("Day 01", () => {
  const elfCalories = [
    [1000, 2000, 3000],
    [4000],
    [5000, 6000],
    [7000, 8000, 9000],
    [10000],
  ];

  describe("caloriesOnElfWithMostCalories", () => {
    it("returns the single highest number of calories for any elf", () => {
      expect(partOne(elfCalories)).toEqual(24000);
    });
  });

  describe("partTwo", () => {
    it("returns the sum of calories belonging to the three elves with most calories", () => {
      expect(partTwo(elfCalories)).toEqual(45000);
    });
  });
});
