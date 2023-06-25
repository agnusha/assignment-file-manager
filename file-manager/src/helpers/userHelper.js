
function getUserName(args) {
    const username = args.find(arg => arg.startsWith('--username='))?.split('=')[1];

    if (username) {
        return username;
    }
    else throw new Error('Invalid input');
}

function welcome(username) {
    console.log(`Welcome to the File Manager, ${username}!`);
}

function goodbye(username) {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
}


export { getUserName, welcome, goodbye };