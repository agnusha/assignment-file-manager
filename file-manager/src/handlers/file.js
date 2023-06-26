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

}

