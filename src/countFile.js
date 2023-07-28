// @ts-check
import { createInterface } from 'node:readline/promises';
import fs from 'node:fs';

/**
 * @typedef CountFileOptions
 * @property {string} filePath
 * @property {boolean} [noDisplay=false]
 */

/**
 * @typedef CountFileResult
 * @property {number} totalLineCount
 * @property {number} emptyLineCount
 * @property {number} nonemptyLineCount
 */

/**
 * @param {CountFileOptions} options
 * @returns {Promise<CountFileResult>}
 */
export const countFile = async (options) => {

    const fileStream = fs.createReadStream(options.filePath);
    const readlineInterface = createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let totalLineCount = 0;
    let nonemptyLineCount = 0;
    for await (const line of readlineInterface) {
        totalLineCount += 1;
        if (line) {
            nonemptyLineCount += 1;
        }
    }

    const emptyLineCount = totalLineCount - nonemptyLineCount;

    if (!options.noDisplay) {
        console.log(`[${options.filePath}]`);
        console.log(`totalLineCount: ${totalLineCount}`);
        console.log(`emptyLineCount: ${emptyLineCount}`);
        console.log(`nonemptyLineCount: ${nonemptyLineCount}`);
    }

    return {
        totalLineCount,
        emptyLineCount,
        nonemptyLineCount,
    };

};
