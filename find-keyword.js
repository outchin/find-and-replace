const fs = require('fs');
const path = require('path');

/**
 * This function searches for a specific keyword in all files within a given directory (including subdirectories).
 * If the keyword is found in a file, the file's path is appended to an output file.
 *
 * @param {string} dir - The directory to search in.
 * @param {string} keyword - The keyword to search for.
 * @param {string} outputFile - The file to append the paths of the files where the keyword was found.
 */
function searchKeywordInFiles(dir, keyword, outputFile) {
    // Read all files and directories within the given directory
    fs.readdirSync(dir).forEach(file => {
        // Construct the full path of the file or directory
        let fullPath = path.join(dir, file);

        // Check if the path is a directory
        if (fs.lstatSync(fullPath).isDirectory()) {
            // If it's a directory, recursively search within this directory
            searchKeywordInFiles(fullPath, keyword, outputFile);
        } else {
            // If it's a file, read its content
            let content = fs.readFileSync(fullPath, 'utf8');

            // Check if the content includes the keyword
            if (content.includes(keyword)) {
                // If the keyword is found, append the file's path to the output file
                fs.appendFileSync(outputFile, `${fullPath}\n`);
            }
        }
    });
}

// Usage
// This will search for 'yourKeyword' in all files within '/path/to/your/directory' and append the paths of the files where the keyword was found to 'output.txt'.
searchKeywordInFiles('/path/to/your/directory', 'yourKeyword', 'output.txt');
searchKeywordInFiles(dirPath, findKeyword, output_file);