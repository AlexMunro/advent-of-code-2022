import { sum } from "../utils/sum";

type File = { name: string; size: number };

export class Directory {
  readonly files: File[];
  readonly subdirectories: Directory[];

  constructor(params: { files?: File[]; subdirectories?: Directory[] }) {
    this.files = params.files || [];
    this.subdirectories = params.subdirectories || [];
  }

  size(): number {
    if (this.memoizedSize == undefined) {
      this.memoizedSize =
        sum(this.files.map((file) => file.size)) +
        sum(this.subdirectories.map((directory) => directory.size()));
    }

    return this.memoizedSize;
  }
  private memoizedSize: number | undefined;
}

export function partOne(commands: string[]): number {
  return commands.length;
}
