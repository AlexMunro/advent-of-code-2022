import { partOne, partTwo } from "../solutions/day06";

describe("Day 06", () => {
  describe("partOne", () => {
    it("returns the position of the first start-of-packet marker", () => {
      expect(partOne("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toEqual(7);
      expect(partOne("bvwbjplbgvbhsrlpgdmjqwftvncz")).toEqual(5);
      expect(partOne("nppdvjthqldpwncqszvftbrmjlhg")).toEqual(6);
      expect(partOne("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toEqual(10);
      expect(partOne("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toEqual(11);
    });
  });

  describe("partTwo", () => {
    it("returns the position of the first start-of-message marker", () => {
      expect(partTwo("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toEqual(19);
      expect(partTwo("bvwbjplbgvbhsrlpgdmjqwftvncz")).toEqual(23);
      expect(partTwo("nppdvjthqldpwncqszvftbrmjlhg")).toEqual(23);
      expect(partTwo("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toEqual(29);
      expect(partTwo("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toEqual(26);
    });
  });
});
