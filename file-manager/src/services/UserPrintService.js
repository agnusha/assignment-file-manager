import { validateIsSet } from '../validation/argValidator.js';

class UserPrintService {
    constructor(args) {
        this.username = validateIsSet(UserPrintService.getUserName(args));
    }

    welcome() {
        console.log(`Welcome to the File Manager, ${this.username}!`);
    }

    goodbye() {
        console.log(`Thank you for using File Manager, ${this.username}, goodbye!`);
    }

    static getUserName(args) {
        return args.find(arg => arg.startsWith('--username='))?.split('=')[1];
    }
}

export default UserPrintService;
