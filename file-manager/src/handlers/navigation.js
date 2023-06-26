import { readdir, stat } from 'fs/promises';
import { chdir } from 'node:process';
import { resolve, join } from 'path';

function goUp() {
    chdir('..');
}

function goToDirectory(directory) {
    chdir(resolve(directory));
}

async function list(directory) {
    const files = await readdir(directory);
    const directoriesPrinted = [];
    const filesPrinted = [];

    for (const file of files) {
        const fileStats = await stat(join(directory, file));

        if (fileStats.isDirectory()) {
            directoriesPrinted.push(file);
        }
        else if (fileStats.isFile()) {
            filesPrinted.push(file);
        }
    }

    directoriesPrinted.sort();
    filesPrinted.sort();

    printList(directoriesPrinted, filesPrinted);
}

function printList(directories, files) {
    const dataPrinted = [];
    directories.forEach((d) => dataPrinted.push({ Name: d, Type: 'Folder' }));
    files.forEach((f) => dataPrinted.push({ Name: f, Type: 'File' }));

    console.table(dataPrinted);
}

export { goUp, goToDirectory, list };