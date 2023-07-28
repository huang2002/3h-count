#!/usr/bin/env node
// @ts-check
import { Program } from '3h-cli';
import { countGlob } from './countGlob.js';

const program = new Program('3h-count', {
    title: 'A utility program that displays some information about the given file(s).',
});

program
    .action({
        name: '<globs...>',
        help: 'File(s) to include.',
    })
    .rest({
        value: '[globs...]',
        help: 'Additional file(s) to include.',
    })
    .option({
        name: '--help',
        alias: '-h',
        help: 'Show help info.',
    })
    .option({
        name: '--mode',
        value: '<file|project>',
        alias: '-m',
        help: 'Display mode. (default: project)',
    })
    .option({
        name: '--file',
        alias: '-f',
        help: 'Shortcut for "--mode file".',
    })
    .option({
        name: '--project',
        alias: '-p',
        help: 'Shortcut for "--mode project".',
    })
    .option({
        name: '--root',
        alias: '-r',
        help: 'The root directory in which to search.',
    })
    .option({
        name: '--include-dot-files',
        alias: '-d',
        help: 'Include files whose name begin with a period.',
    })
    .option({
        name: '--no-summary',
        alias: '-S',
        help: 'Omit summary section in file mode.',
    });

program.parse(process.argv)
    .then((args) => {

        const { options } = args;
        if (options.has('--help')) {
            return program.help();
        }

        countGlob({
            pattern: [
                ...args.actions,
                ...args.rest,
            ],
            mode: /** @type {import('./countGlob.js').CountGlobMode} */(
                args.getOption('--mode')[0]
                || (options.has('--file') ? 'file' : 'project')
            ),
            cwd: args.getOption('--root')[0],
            noSummary: options.has('--no-summary'),
        });

    });
