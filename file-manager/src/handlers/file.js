import { createReadStream, createWriteStream } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { stdout } from 'node:process';
import { open, rename, unlink } from 'node:fs/promises';
import { finished, pipeline } from 'node:stream/promises';

//TODO: add line at the end, use async pipe instead
async function readFile(pathToFile) {
    const readStream = createReadStream(pathToFile);
    readStream.pipe(stdout);
    return await finished(readStream);
}

async function createEmptyFile(fileName) {
    const fileHandle = await open(fileName, 'w');
    await fileHandle.close();
}

async function renameFile(pathToFile, newFileName) {
    const directory = dirname(pathToFile);
    const newPathToFile = join(directory, newFileName);
    await rename(pathToFile, newPathToFile);
}

async function copyFile(pathToFile, targetDirectory) {
    const fileName = join(targetDirectory, basename(pathToFile));

    const readStream = createReadStream(pathToFile);
    const writeStream = createWriteStream(fileName);

    await pipeline(readStream, writeStream);
}

async function moveFile(pathToFile, targetDirectory) {
    await copyFile(pathToFile, targetDirectory);
    deleteFile(pathToFile);
}

async function deleteFile(pathToFile) {
    unlink(pathToFile);
}

export { readFile, createEmptyFile, renameFile, copyFile, moveFile, deleteFile };
