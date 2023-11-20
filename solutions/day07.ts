import * as fs from "fs";
import runningAsMain from "../utils/runningAsMain";
import sum from "../utils/sum";

export class Directory {
  fileSizes: Map<string, number>;
  subdirectories: Directory[];
  readonly name: string;

  constructor(params: {
    name: string;
    fileSizes?: Map<string, number>;
    subdirectories?: Directory[];
  }) {
    this.name = params.name;
    this.fileSizes = params.fileSizes || new Map();
    this.subdirectories = params.subdirectories || [];
  }

  size(): number {
    if (this.memoizedSize === undefined) {
      this.memoizedSize =
        sum([...this.fileSizes.values()]) +
        sum(this.subdirectories.map((directory) => directory.size()));
    }

    return this.memoizedSize;
  }
  private memoizedSize: number | undefined;

  findOrRetrieveChildDir(name: string): Directory {
    const existingChildDir = this.subdirectories.find(
      (directory) => directory.name === name,
    );

    if (existingChildDir) {
      return existingChildDir;
    }

    const newDir = new Directory({ name: name });
    this.subdirectories.unshift(newDir);
    return newDir;
  }

  *recursivelyEnumerateSubdirectories(): Generator<Directory> {
    yield this;
    for (const directory of this.subdirectories) {
      yield* directory.recursivelyEnumerateSubdirectories();
    }
  }
}

type TerminalLine = CD | LS | FileSize | Dir;
type CD = { kind: "cd"; directory: string };
type LS = { kind: "ls" };
type FileSize = { kind: "fileSize"; size: number; filename: string };
type Dir = { kind: "dir"; directory: string };

// It's not very efficient to separately parse and then check against
// these terminal lines, but I want an excuse to play with the type system
function parseTerminalLines(terminalLines: string[]): TerminalLine[] {
  const cd = /^\$ cd (.+)$/;
  const ls = /^\$ ls$/;
  const fileSize = /^([0-9]+) (.+)$/;
  const dir = /^dir (\w+)$/;

  let matches;

  return terminalLines.map((terminalLine) => {
    if ((matches = cd.exec(terminalLine))) {
      return { kind: "cd", directory: matches[1] };
    } else if ((matches = ls.exec(terminalLine))) {
      return { kind: "ls" };
    } else if ((matches = fileSize.exec(terminalLine))) {
      return {
        kind: "fileSize",
        size: Number.parseInt(matches[1]),
        filename: matches![2],
      } as FileSize;
    } else if ((matches = dir.exec(terminalLine))) {
      return { kind: "dir", directory: matches[1] };
    } else {
      throw new Error(
        `Terminal line type does not match any known format: ${terminalLine}`,
      );
    }
  });
}

function processTerminalLines(terminalLines: TerminalLine[]): Directory {
  const root = new Directory({ name: "/" });
  let workingDirectoryStack = [root];

  for (const line of terminalLines) {
    switch (line.kind) {
      case "cd": {
        const cdLine = line as CD;
        switch (cdLine.directory) {
          case "/": {
            workingDirectoryStack = [root];
            break;
          }
          case "..": {
            workingDirectoryStack.shift();
            break;
          }
          default: {
            workingDirectoryStack.unshift(
              workingDirectoryStack[0]!.findOrRetrieveChildDir(
                cdLine.directory,
              ),
            );
            break;
          }
        }
        break;
      }
      case "fileSize": {
        const fileSizeLine = line as FileSize;
        workingDirectoryStack[0]!.fileSizes.set(
          fileSizeLine.filename,
          fileSizeLine.size,
        );
        break;
      }
    }
  }

  return root;
}

export function partOne(rawTerminalLines: string[]): number {
  const terminalLines = parseTerminalLines(rawTerminalLines);
  const fileSystem = processTerminalLines(terminalLines);

  return sum(
    [...fileSystem.recursivelyEnumerateSubdirectories()]
      .map((dir) => dir.size())
      .filter((size) => size <= 100000),
  );
}

// Assumes that we do require more space and that we can get
// enough by deleting one directory
export function partTwo(rawTerminalLines: string[]): number {
  const terminalLines = parseTerminalLines(rawTerminalLines);
  const fileSystem = processTerminalLines(terminalLines);

  const totalCapacity = 70000000;
  const requiredCapacity = 30000000;
  const amountToDelete = Math.abs(
    totalCapacity - requiredCapacity - fileSystem.size(),
  );

  const dirsWithSizes = [
    ...fileSystem.recursivelyEnumerateSubdirectories(),
  ].map((dir) => ({
    size: dir.size(),
    dirname: dir.name,
  }));

  return Math.min(
    ...[...fileSystem.recursivelyEnumerateSubdirectories()]
      .map((dir) => dir.size())
      .filter((size) => size >= amountToDelete),
  );
}

if (runningAsMain()) {
  const input: string[] = fs
    .readFileSync("inputs/day07.txt", "utf-8")
    .split("\n")
    .filter((s) => s != "");
  console.log("The answer to part one is " + partOne(input));
  console.log("The answer to part two is " + partTwo(input));
}
