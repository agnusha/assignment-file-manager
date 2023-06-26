async function readFile(pathToFile) {
    const readStream = createReadStream(pathToFile);
    readStream.pipe(stdout);
    return await finished(readStream);
}
