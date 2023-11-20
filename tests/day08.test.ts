import { partOne, partTwo } from "../solutions/day08";

describe("Day08", () => {
  const input = [
    [3, 0, 3, 7, 3],
    [2, 5, 5, 1, 2],
    [6, 5, 3, 3, 2],
    [3, 3, 5, 4, 9],
    [3, 5, 3, 9, 0],
  ];

  describe("partOne", () => {
    it("counts the visible trees", () => {
      expect(partOne(input)).toBe(21);
    });
  });

  describe("partTwo", () => {
    it("finds the highest scenic score", () => {
      expect(partTwo(input)).toBe(8);
    });
  });
});
