import { partOne } from "../solutions/day08";

describe("Day08", () => {
  describe("partOne", () => {
    const input = [
      [3, 0, 3, 7, 3],
      [2, 5, 5, 1, 2],
      [6, 5, 3, 3, 2],
      [3, 3, 5, 4, 9],
      [3, 5, 3, 9, 0],
    ];

    it("counts the visible trees", () => {
      expect(partOne(input)).toBe(21);
    });
  });
});
