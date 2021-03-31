const fs = require('fs');

const ADMIN_ROLE = 'admin'
const CUSTOMER_ROLE = 'customer'
const PUBLIC_PATHS =    ['POST /users', 'POST /auth/login']

module.exports = {
    writeInFile(content) {
        return new Promise((resolve) => {
            fs.writeFile('content.txt', content, {encoding: 'utf-8'}, () => {
                resolve();
            });
        })
    },

    readFromFile() {
        return new Promise((resolve, reject) => {
            fs.readFile('content.txt', (err, data) => {
                if(err) {
                    return reject(err);
                }

                resolve(data);
            });
        });
    },

    isPublicPath(method, path){
        query = method + " " + path
        if(PUBLIC_PATHS.includes(query)){
            return true
        }
        return false
    },

    ADMIN_ROLE,
    CUSTOMER_ROLE,
}