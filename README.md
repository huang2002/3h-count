# 3h-count

> A utility program that displays some information about the given file(s).

## Links

- [Changelog](./CHANGELOG.md)
- [License (ISC)](./LICENSE)

## Example

```bash
$ 3h-count src/**/*.*
[summary]
fileCount: 4
totalLineCount: 228
emptyLineCount: 30
nonemptyLineCount: 198
```

## CLI Usage

```bash
$ 3h-count --help
A utility program that displays some information about the given file(s).

Usage:
  3h-count <action> [options] -- [globs...]

Actions:
  <globs...>                    File(s) to include.

Options:
  --help, -h                    Show help info.
  --mode, -m <file|project>     Display mode. (default: project)
  --file, -f                    Shortcut for "--mode file".
  --project, -p                 Shortcut for "--mode project".
  --root, -r <path>             The root directory in which to search.
  --include-dot-files, -d       Include files whose name begin with a period.
  --no-summary, -S              Omit summary section in file mode.
  -- [globs...]                 Additional file(s) to include.
```

## Progammatical Usage

```typescript
export interface CountFileOptions {
    filePath: string;
    /**
     * @default {false}
     */
    noDisplay?: boolean;
}

export interface CountFileResult {
    totalLineCount: number;
    emptyLineCount: number;
    nonemptyLineCount: number;
}

export declare const countFile: (options: CountFileOptions) => Promise<CountFileResult>;

export type CountGlobMode = 'file' | 'project';

export interface CountGlobOptions {
    pattern: string[] | string;
    /**
     * @default {'project'}
     */
    mode?: CountGlobMode;
    cwd?: string;
    /**
     * @default {false}
     */
    noDisplay?: boolean;
    /**
     * @default {false}
     */
    noSummary?: boolean;
    /**
     * @default {false}
     */
    includeDotFiles?: boolean;
}

export interface CountGlobResult {
    results: CountFileResult[];
    fileCount: number;
    totalLineCount: number;
    emptyLineCount: number;
    nonemptyLineCount: number;
}

export declare const countGlob: (options: CountGlobOptions) => Promise<CountGlobResult>;
```
