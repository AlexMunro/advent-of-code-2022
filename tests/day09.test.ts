import { partOne } from "../solutions/day09";

describe("Day09", () => {
  // eslint-disable-next-line prettier/prettier
  const input = [
    "R 4",
    "U 4",
    "L 3",
    "D 1",
    "R 4",
    "D 1",
    "L 5",
    "R 2",
  ];

  describe("partOne", () => {
    it("finds the number of different positions the tail of the rope visits", () => {
      expect(partOne(input)).toBe(13);
    });
  });
});
