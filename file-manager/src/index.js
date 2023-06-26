import { argv, cwd } from 'node:process';
import { createInterface } from 'node:readline/promises';

import { getUserName, welcome, goodbye } from './helpers/userHelper.js';
import { printWorkingDirectory } from './helpers/fileHelper.js';
import { validateIsSet } from './validation/argValidator.js';

import { goUp, goToDirectory, list } from './handlers/navigation.js';
import { readFile, createEmptyFile, renameFile, copyFile, moveFile, deleteFile } from './handlers/file.js';
import { os } from './handlers/os.js'
import { hashFile } from './handlers/hash.js'
import { compressFile, decompressFile } from './handlers/compression.js'



const args = argv.slice(2);

try {

    const username = getUserName(args);
    validateIsSet(username);
    welcome(username);

    const readerLine = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    let __dirname = updateDirname(readerLine);

    readerLine
        .on('line', async (line) => {
            const [command, ...args] = line.trim().split(' ');
            validateIsSet(command);

            switch (command) {
                case 'up':
                    goUp(__dirname);
                    break;
                case 'cd':
                    goToDirectory(args[0]);
                    break;
                case 'ls':
                    await list(__dirname);
                    break;

                case 'cat':
                    await readFile(args[0]);
                    break;
                case 'add':
                    await createEmptyFile(args[0])
                    break;
                case 'rn':
                    await renameFile(args[0], args[1])
                    break;
                case 'cp':
                    await copyFile(args[0], args[1]);
                    break;
                case 'mv':
                    await moveFile(args[0], args[1]);
                    break;
                case 'rm':
                    await deleteFile(args[0]);
                    break;

                case 'os':
                    os(args[0]);
                    break;

                case 'hash':
                    await hashFile(args[0]);
                    break
                case 'compress':
                    await compressFile(args[0], args[1]);
                    break;
                case 'decompress':
                    await decompressFile(args[0], args[1]);
                    break;
                case '.exit':
                    readerLine.close();
                    return;
                default:
                    console.log('Invalid input');
            }

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
