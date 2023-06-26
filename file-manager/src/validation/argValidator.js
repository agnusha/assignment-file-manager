import { access } from 'node:fs/promises';
import { InvalidInputException } from '../exceptions/InvalidInputException.js';

function validateIsSet(arg) {
    if (isEmpty(arg)) {
        throw new InvalidInputException('value must be set');
    }
    return arg;
}

async function validateIsPathExist(arg, shouldExist = true) {
    validateIsSet(arg);
    if (shouldExist && !await isExists(arg)) {
        throw new InvalidInputException(`file ${arg} should exist`);
    }
    if (!shouldExist && await isExists(arg)) {
        throw new InvalidInputException(`file ${arg} shouldn't exist`);
    }
    return arg;
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