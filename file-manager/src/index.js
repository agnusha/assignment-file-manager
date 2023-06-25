import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { argv } from 'node:process';
import { createInterface } from 'node:readline/promises'
import { getUserName, welcome, goodbye } from './helpers/userHelper.js'
import { printWorkingDirectory } from './helpers/fileHelper.js'



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const args = argv.slice(2);


try {

    const username = getUserName(args);
    welcome(username);
    printWorkingDirectory();

    const readerLine = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    readerLine.prompt();
    readerLine
        .on('SIGINT', () => readerLine.close())
        .on('close', () => goodbye(username));

}
catch (error) {
    console.error(error.message);
}