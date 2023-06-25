import { cwd } from 'node:process';

function printWorkingDirectory() {
    console.log(`You are currently in ${cwd()}`);
}


export { printWorkingDirectory };