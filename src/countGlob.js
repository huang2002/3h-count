// @ts-check
import fastGlob from 'fast-glob';
import path from 'node:path';
import { countFile } from './countFile.js';

/**
 * @typedef {'file' | 'project'} CountGlobMode
 */

/**
 * @typedef CountGlobOptions
 * @property {string[] | string} pattern
 * @property {CountGlobMode} [mode='project']
 * @property {string} [cwd]
 * @property {boolean} [noDisplay=false]
 * @property {boolean} [noSummary=false]
 * @property {boolean} [includeDotFiles=false]
 */

/**
 * @typedef CountGlobResult
 * @property {import('./countFile.js').CountFileResult[]} results
 * @property {number} fileCount
 * @property {number} totalLineCount
 * @property {number} emptyLineCount
 * @property {number} nonemptyLineCount
 */

/**
 * @param {CountGlobOptions} options
 * @returns {Promise<CountGlobResult>}
 */
export const countGlob = async (options) => {

    const filePaths = await fastGlob(options.pattern, {
        cwd: options.cwd,
        dot: options.includeDotFiles,
    });

    const noFileDisplay = (options.mode === 'project') || options.noDisplay;

    /**
     * @type {import('./countFile.js').CountFileResult[]}
     */
    const results = [];
    let fileCount = 0;
    let totalLineCount = 0;
    let emptyLineCount = 0;
    let nonemptyLineCount = 0;
    for await (const rawFilePath of filePaths) {

        const filePath = (
            options.cwd
                ? path.join(options.cwd, rawFilePath)
                : rawFilePath
        );
        const result = await countFile({
            filePath,
            noDisplay: noFileDisplay,
        });

        fileCount += 1;
        totalLineCount += result.totalLineCount;
        emptyLineCount += result.emptyLineCount;
        nonemptyLineCount += result.nonemptyLineCount;

        results.push(result);

        if (!noFileDisplay && (results.length < filePaths.length)) {
            console.log();
        }

    }

    if ((options.mode === 'project') || !options.noSummary) {
        if (!noFileDisplay && filePaths.length) {
            console.log();
        }
        console.log('[summary]');
        console.log(`fileCount: ${fileCount}`);
        console.log(`totalLineCount: ${totalLineCount}`);
        console.log(`emptyLineCount: ${emptyLineCount}`);
        console.log(`nonemptyLineCount: ${nonemptyLineCount}`);
    }

    return {
        results,
        fileCount,
        totalLineCount,
        emptyLineCount,
        nonemptyLineCount,
    };

};
