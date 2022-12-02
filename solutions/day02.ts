import * as fs from 'fs';

const file = fs.readFileSync("inputs/day02.txt", "utf-8")

enum Move {
  Rock = 0,
  Paper = 1,
  Scissors = 2
}

function parseMovePairs(input: String): Move[][] {
  return input.split("\n").map((pair) => {
    const [opponent, player] = pair.split(" ");
    return [opponent.codePointAt() - "A".codePointAt(), player.codePointAt() - "X".codePointAt()]
  })
}
