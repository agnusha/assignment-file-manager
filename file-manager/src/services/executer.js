import { validateIsSet, validateIsPathExist } from '../validation/argValidator.js';
import { goUp, goToDirectory, list } from '../handlers/navigation.js';
import { readFile, createEmptyFile, renameFile, copyFile, moveFile, deleteFile } from '../handlers/file.js';
import { os } from '../handlers/os.js';
import { hashFile } from '../handlers/hash.js';
import { compressFile, decompressFile } from '../handlers/compression.js';
import { InvalidInputException } from '../exceptions/InvalidInputException.js';


async function executeLine(line, __dirname, readerLine) {
    try {
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
                throw new InvalidInputException(`command ${command} is not supported`);
        }
    }
    catch (error) {
        if (error instanceof InvalidInputException) {
            console.error(error.message);
        } else {
            console.error(`Operation failed: ${error.message}`);
        }

    }
}

export { executeLine };
