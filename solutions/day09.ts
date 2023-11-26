import * as fs from "fs";
import runningAsMain from "../utils/runningAsMain";

type Point = { x: number; y: number };

function pointsAdjacent(point1: Point, point2: Point): boolean {
  return Math.abs(point1.x - point2.x) < 2 && Math.abs(point1.y - point2.y) < 2;
}

function visitedLocations(movements: string[]): Set<string> {
  const movementRegex = /^(L|R|U|D) ([0-9]+)$/;

  const head: Point = { x: 0, y: 0 };
  const tail: Point = { x: 0, y: 0 };
  const visitedLocations = new Set<string>([JSON.stringify(tail)]);

  for (const movement of movements) {
    const match = movement.match(movementRegex);
    const distance = Number.parseInt(match![2]);

    switch (match![1]) {
      case "L": {
        for (let i = 0; i < distance; i++) {
          head.x -= 1;
          if (!pointsAdjacent(head, tail)) {
            tail.x = head.x + 1;
            tail.y = head.y;
          }
          visitedLocations.add(JSON.stringify(tail));
        }
        break;
      }
      case "R": {
        for (let i = 0; i < distance; i++) {
          head.x += 1;
          if (!pointsAdjacent(head, tail)) {
            tail.x = head.x - 1;
            tail.y = head.y;
          }
          visitedLocations.add(JSON.stringify(tail));
        }
        break;
      }
      case "U": {
        for (let i = 0; i < distance; i++) {
          head.y -= 1;
          if (!pointsAdjacent(head, tail)) {
            tail.x = head.x;
            tail.y = head.y + 1;
          }
          visitedLocations.add(JSON.stringify(tail));
        }
        break;
      }
      case "D": {
        for (let i = 0; i < distance; i++) {
          head.y += 1;
          if (!pointsAdjacent(head, tail)) {
            tail.x = head.x;
            tail.y = head.y - 1;
          }
          visitedLocations.add(JSON.stringify(tail));
        }
        break;
      }

      visitedLocations.add(JSON.stringify(tail));
    }
  }

  return visitedLocations;
}

export function partOne(input: string[]): number {
  return visitedLocations(input).size;
}

if (runningAsMain()) {
  const input: string[] = fs
    .readFileSync("inputs/day09.txt", "utf-8")
    .split("\n")
    .filter((s) => s != "");

  console.log("The answer to part one is " + partOne(input));
}
