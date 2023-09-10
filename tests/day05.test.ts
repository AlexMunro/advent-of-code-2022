import { parseInstructions, partOne } from "../solutions/day05";

describe("Day 05", () => {
  const craneInstructions: string[] = [
    "    [D]    ",
    "[N] [C]    ",
    "[Z] [M] [P]",
    " 1   2   3",
    "",
    "move 1 from 2 to 1",
    "move 3 from 1 to 3",
    "move 2 from 2 to 1",
    "move 1 from 1 to 2",
  ];

  describe("parseInstructions", () => {
    it("extracts the relevant information from the raw input", () => {
      expect(parseInstructions(craneInstructions)).toEqual({
        stacks: [["N", "Z"], ["D", "C", "M"], ["P"]],
        moves: [
          { quantity: 1, fromStack: 2, toStack: 1 },
          { quantity: 3, fromStack: 1, toStack: 3 },
          { quantity: 2, fromStack: 2, toStack: 1 },
          { quantity: 1, fromStack: 1, toStack: 2 },
        ],
      });
    });
  });

  describe("partOne", () => {
    it("returns which crate ends up on top of each stack", () => {
      expect(partOne(craneInstructions)).toEqual("CMZ");
    });
  });
});
