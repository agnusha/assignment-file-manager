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
    console.log('Folders and files');
    directories.forEach((directory, i) => {
        console.log(`${i} - ${directory} - folder`);
    });

    files.forEach((file, i) => {
        console.log(`${directories.length + i} - ${file} - file`);
    });
}

export { goUp, goToDirectory, list };