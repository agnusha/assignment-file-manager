async function readFile(pathToFile) {
    const readStream = createReadStream(pathToFile);
    readStream.pipe(stdout);
    return await finished(readStream);
}

async function createEmptyFile(fileName) {
    const fd = await open(fileName, 'w');
    await fd.close();
}

