import { partOne } from "../solutions/day06";

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
});
