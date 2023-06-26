import { cwd, stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
import UserPrintService from './services/UserPrintService.js';
import { printWorkingDirectory } from './helpers/fileHelper.js';
import { executeLine } from './services/executer.js';

try {
    const userService = new UserPrintService();
    userService.welcome();

    const readerLine = createInterface(stdin, stdout);
    let __dirname = updateDirname(readerLine);

    readerLine
        .on('line', async (line) => {
            await executeLine(line, __dirname, readerLine)
            __dirname = updateDirname(readerLine);
        })
        .on('SIGINT', () => readerLine.close())
        .on('close', () => userService.goodbye());

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
