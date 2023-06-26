import { argv, cwd, stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';

import { getUserName, welcome, goodbye } from './helpers/userHelper.js';
import { printWorkingDirectory } from './helpers/fileHelper.js';
import { validateIsSet, validateIsPathExist } from './validation/argValidator.js';

import { goUp, goToDirectory, list } from './handlers/navigation.js';
import { readFile, createEmptyFile, renameFile, copyFile, moveFile, deleteFile } from './handlers/file.js';
import { os } from './handlers/os.js'
import { hashFile } from './handlers/hash.js'
import { compressFile, decompressFile } from './handlers/compression.js'

try {
    const args = argv.slice(2);
    const username = getUserName(args);

    validateIsSet(username);
    welcome(username);

    const readerLine = createInterface(stdin, stdout);
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
                    goToDirectory(await validateIsPathExist(args[0]));
                    break;
                case 'ls':
                    await list(__dirname);
                    break;

                case 'cat':
                    await readFile(await validateIsPathExist(args[0]));
                    break;
                case 'add':
                    await createEmptyFile(await validateIsPathExist(args[0], false))
                    break;
                case 'rn':
                    await renameFile(await validateIsPathExist(args[0]), validateIsSet(args[1]))
                    break;
                case 'cp':
                    await copyFile(await validateIsPathExist(args[0]), await validateIsPathExist(args[1]));
                    break;
                case 'mv':
                    await moveFile(await validateIsPathExist(args[0]), await validateIsPathExist(args[1]));
                    break;
                case 'rm':
                    await deleteFile(await validateIsPathExist(args[0]));
                    break;

                case 'os':
                    os(validateIsSet(args[0]));
                    break;

                case 'hash':
                    await hashFile(await validateIsPathExist(args[0]));
                    break
                case 'compress':
                    await compressFile(await validateIsPathExist(args[0]), validateIsSet(args[1]));
                    break;
                case 'decompress':
                    await decompressFile(await validateIsPathExist(args[0]), validateIsSet(args[1]));
                    break;
                case '.exit':
                    readerLine.close();
                    return;
                default:
                    console.log('Invalid input: command is not a valid');
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
