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
- cd data
- ls

### Basic operations with files
- cat data/test.md
- add test_new.md
- rn data/test.md newTest.md
- cp data/test.md src/handlers
- mv data/test.md src/handlers
- rm data/test.md or rm src/handlers/test.md (after prev command)

### Operating system info
- os --EOL
- os --cpus
- os --homedir
- os --username
- os --architecture

### Hash calculation
- hash data/test.md
- compress data/test.md data/test1.md
- decompress data/test1.md data/test.md
