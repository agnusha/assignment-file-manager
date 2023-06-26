import { createHash } from 'crypto';
import { readFile } from 'node:fs/promises';

async function hashFile(pathToFile) {
    const fileData = await readFile(pathToFile);
    const hash = createHash('sha256').update(fileData).digest('hex')
    console.log(hash);
}

export { hashFile };
