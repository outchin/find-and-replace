const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, findKeyword, replaceKeyword) {
    const data = fs.readFileSync(filePath, 'utf8');
    const result = data.replace(new RegExp(findKeyword, 'g'), replaceKeyword);
    fs.writeFileSync(filePath, result, 'utf8');
}

function replaceInDir(dirPath, findKeyword, replaceKeyword) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            replaceInDir(filePath, findKeyword, replaceKeyword);
        } else if (stats.isFile()) {
            replaceInFile(filePath, findKeyword, replaceKeyword);
        }
    });
}

const dirPath = process.argv[2];
const findKeyword = process.argv[3];
const replaceKeyword = process.argv[4];

replaceInDir(dirPath, findKeyword, replaceKeyword);