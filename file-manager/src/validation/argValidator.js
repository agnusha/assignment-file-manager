import { access } from 'node:fs/promises';

function validateIsSet(arg) {
    if (isEmpty(arg)) {
        throw new Error('Invalid input: value must be set');
    }
}

async function validateIsPathExist(arg, shouldExist = true) {
    validateIsSet(arg);
    if (shouldExist && !await isExists(arg)) {
        throw new Error(`Invalid input: file ${arg} should exist`);
    }
    if (!shouldExist && await isExists(arg)) {
        throw new Error(`Invalid input:  file ${arg} shouldn't exist`);
    }
}

function isEmpty(str) {
    return (!str || str.length === 0);
}

async function isExists(file) {
    try {
        await access(file);
        return true;
    } catch {
        return false;
    }
}

export { validateIsSet, validateIsPathExist };