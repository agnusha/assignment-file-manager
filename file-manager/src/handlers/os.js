import { EOL, cpus, userInfo, arch } from 'os';

async function os(option) {
    switch (option) {
        case '--EOL':
            console.log(JSON.stringify(EOL));
            break;
        case '--cpus':
            const cpusPrinted = cpus().map(({ model, speed }) => {
                return { model, clockRate: `${(speed / 1000).toFixed(2)} GHz` };
            });
            console.table(cpusPrinted);
            break;
        case '--homedir':
            console.log(userInfo().homedir);
            break;
        case '--username':
            console.log(userInfo().username);
            break
        case '--architecture':
            console.log(arch());
            break;
        default:
            console.log('Invalid option in os command');
    }
}

export { os };