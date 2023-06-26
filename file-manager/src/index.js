import { argv, cwd, stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';

import { getUserName, welcome, goodbye } from './helpers/userHelper.js';
import { printWorkingDirectory } from './helpers/fileHelper.js';
import { validateIsSet } from './validation/argValidator.js';
import { executeLine } from './services/executer.js';

try {
    const args = argv.slice(2);
    const username = getUserName(args);

    validateIsSet(username);
    welcome(username);

    const readerLine = createInterface(stdin, stdout);
    let __dirname = updateDirname(readerLine);

    readerLine
        .on('line', async (line) => {
            await executeLine(line, __dirname, readerLine)
            __dirname = updateDirname(readerLine);
        })
        .on('SIGINT', () => readerLine.close())
        .on('close', () => goodbye(username));

}
catch (error) {
    console.error(`Fatal error: ${error.message}`);
}

function updateDirname(readerLine) {
    const currentDirname = cwd();

    printWorkingDirectory(currentDirname);
    readerLine.prompt();

    return currentDirname;
}
