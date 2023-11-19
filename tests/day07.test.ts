import { Directory, partOne } from "../solutions/day07";

describe("Directory", () => {
  const leafDirectory1 = new Directory({
    name: "leaf1",
    fileSizes: new Map([
      ["aoc.rs", 17],
      ["aoc.go", 30],
    ]),
  });
  const innerDirectory = new Directory({
    name: "inner",
    fileSizes: new Map([
      ["foo", 5],
      ["bar", 7],
    ]),
    subdirectories: [leafDirectory1],
  });
  const leafDirectory2 = new Directory({
    name: "leaf2",
    fileSizes: new Map([
      ["aoc.rb", 20],
      ["aoc.hs", 5],
    ]),
  });

  const outerDirectory = new Directory({
    name: "outer",
    subdirectories: [innerDirectory, leafDirectory2],
  });

  describe("#size", () => {
    it("sums the size of its immediate contents and the sizes of its subdirectories", () => {
      expect(leafDirectory1.size()).toBe(17 + 30);
      expect(innerDirectory.size()).toBe(12 + leafDirectory1.size());
      expect(leafDirectory2.size()).toBe(20 + 5);
      expect(outerDirectory.size()).toBe(
        innerDirectory.size() + leafDirectory2.size(),
      );
    });
  });

  describe("#recursivelyEnumerateSubdirectories", () => {
    it("returns the directory itself and all nested directories", () => {
      expect([
        ...leafDirectory1.recursivelyEnumerateSubdirectories(),
      ]).toStrictEqual([leafDirectory1]);

      expect([
        ...outerDirectory.recursivelyEnumerateSubdirectories(),
      ]).toStrictEqual([
        outerDirectory,
        innerDirectory,
        leafDirectory1,
        leafDirectory2,
      ]);
    });
  });
});

describe("Day 07", () => {
  const input = [
    "$ cd /",
    "$ ls",
    "dir a",
    "14848514 b.txt",
    "8504156 c.dat",
    "dir d",
    "$ cd a",
    "$ ls",
    "dir e",
    "29116 f",
    "2557 g",
    "62596 h.lst",
    "$ cd e",
    "$ ls",
    "584 i",
    "$ cd ..",
    "$ cd ..",
    "$ cd d",
    "$ ls",
    "4060174 j",
    "8033020 d.log",
    "5626152 d.ext",
    "7214296 k",
  ];

  describe("partOne", () => {
    it("sums the size of directories up to size 100000", () => {
      expect(partOne(input)).toBe(95437);
    });
  });
});
