import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

async function compressFile(pathToFile, pathToDestination) {
    const source = createReadStream(pathToFile);
    const destination = createWriteStream(pathToDestination);
    const brotliCompress = createBrotliCompress();

    await pipeline(source, brotliCompress, destination);
}

async function decompressFile(pathToFile, pathToDestination) {
    const source = createReadStream(pathToFile);
    const destination = createWriteStream(pathToDestination);
    const brotliDecompress = createBrotliDecompress();

    await pipeline(source, brotliDecompress, destination);
}

export { compressFile, decompressFile };
