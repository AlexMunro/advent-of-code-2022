import { partOne, partTwo } from "../solutions/day02";

describe("Day 02", () => {
  const guide: string[] = ["A Y", "B X", "C Z"];

  describe("partOne", () => {
    it("returns the predicted score according to the standard guide", () => {
      expect(partOne(guide)).toEqual(15);
    });
  });

  describe("partTwo", () => {
    it("returns predicted score according to the corrected guide", () => {
      expect(partTwo(guide)).toEqual(12);
    });
  });
});
