# Assignment: File Manager
https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md

## Description
File Manager using Node.js APIs

## How to use
The program is started by npm-script `start` in following way:
```bash
npm run start -- --username=your_username
```

## Commands

### Navigation & working directory (nwd)
- up
- cd path_to_directory
- ls

### Basic operations with files
- cat path_to_file
- add new_file_name
- rn src/data/test.md newTest.md
- cp src/data/test.md src/handlers
- mv src/data/test.md src/handlers
- rm src/data/test.md or rm src/handlers/test.md (after prev command)

### Operating system info
- os --EOL
- os --cpus
- os --homedir
- os --username
- os --architecture

### Hash calculation
- hash src/data/test.md
- compress src/data/test.md src/data/test1.md
- decompress src/data/test1.md src/data/test.md
