import * as fs from "fs";
import runningAsMain from "../utils/runningAsMain";

type SectionRange = { beginning: number; end: number };
type SectionRangePair = [SectionRange, SectionRange];

function parseRanges(input: string[]): SectionRangePair[] {
  const regex = /^(\d+)\-(\d+),(\d+)\-(\d+)$/;

  return input.map((rangeStr) => {
    const captures = rangeStr.match(regex)!.slice(1);
    const [beginning1, end1, beginning2, end2] = captures.map(
      (s) => parseInt(s)!,
    );
    return [
      { beginning: beginning1, end: end1 },
      { beginning: beginning2, end: end2 },
    ];
  });
}

function overlappedRangeCount(
  rangePairs: SectionRangePair[],
  overlapCheck: (rangePair: SectionRangePair) => boolean,
): number {
  return rangePairs.filter((rangePair) => overlapCheck(rangePair)).length;
}

function rangesFullyOverlap(pair: SectionRangePair): boolean {
  return (
    rangeIsFullyContainedBy(pair[0], pair[1]) ||
    rangeIsFullyContainedBy(pair[1], pair[0])
  );
}

function rangeIsFullyContainedBy(
  smallerRange: SectionRange,
  largerRange: SectionRange,
): boolean {
  return (
    smallerRange.beginning >= largerRange.beginning &&
    smallerRange.end <= largerRange.end
  );
}

function rangesPartlyOverlap(pair: SectionRangePair): boolean {
  return (
    numberInRange(pair[0].beginning, pair[1]) ||
    numberInRange(pair[1].beginning, pair[0])
  );
}

function numberInRange(n: number, range: SectionRange) {
  return n >= range.beginning && n <= range.end;
}

export function partOne(input: string[]): number {
  const pairs = parseRanges(input);
  return overlappedRangeCount(pairs, rangesFullyOverlap);
}

export function partTwo(input: string[]): number {
  const pairs = parseRanges(input);
  return overlappedRangeCount(pairs, rangesPartlyOverlap);
}

if (runningAsMain()) {
  const input: string[] = fs
    .readFileSync("inputs/day04.txt", "utf-8")
    .split("\n")
    .filter((s) => s != "");

  console.log("The answer to part one is " + partOne(input));
  console.log("The answer to part two is " + partTwo(input));
}
