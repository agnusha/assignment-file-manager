import { argv, cwd } from 'node:process';
import { createInterface } from 'node:readline/promises'
import { getUserName, welcome, goodbye } from './helpers/userHelper.js'
import { printWorkingDirectory } from './helpers/fileHelper.js'
import { goUp, goToDirectory, list } from './handlers/navigation.js'



let __dirname = cwd();
const args = argv.slice(2);


try {

    const username = getUserName(args);
    welcome(username);

    const readerLine = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    printWorkingDirectory(__dirname);
    readerLine.prompt();

    readerLine
        .on('line', async (line) => {
            const [command, ...args] = line.trim().split(' ');
            __dirname = cwd();

            switch (command) {
                case 'up':
                    goUp(__dirname)
                    break
                case 'cd':
                    goToDirectory(args[0])
                    break
                case 'ls':
                    await list(__dirname)
                    break

                default: console.log('Invalid input')
                    break
            }

            printWorkingDirectory(cwd());
            readerLine.prompt();
        })
        .on('SIGINT', () => readerLine.close())
        .on('close', () => goodbye(username));

}
catch (error) {
    console.error(error.message);
}