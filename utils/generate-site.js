const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            // if there is an error, reject the Promise and send the error the the Promise's '.catch()' method
            if (err) {
                reject(err);
                // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
                return;
            }

            // if everything went well, resolve the Promise and send the successful data to the '.then()' method
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise ((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
                if (err) {
                    reject(err);
                    return;
                }
            resolve({
                ok: true,
                message: 'Style sheet copied!'
            });
        });
    });
};

// shorthand property names; if there is a property key name with the same name as the value it is being associated with, we can just use the key name and it will understand that we're using the key name for both the property name and its value
module.exports = { writeFile, copyFile };