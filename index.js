const fs = require('node:fs');

const PATH = './test-dir';
const EXPIRY = 5*60*1000;

function daysToMs(days) {
    return days*24*60*60*1000;
}

function promptDelete(name) {

}
function checkExpiry() {
    fs.readdir(PATH, (err, files) => {
        if (err) {
            console.error(err);
        }
        files.forEach((name) => {
            fs.stat(PATH + '/' + name, (err, stats) => {
                if (err) {
                    console.error(err);
                }
                const timeSinceAccess = Date.now() - stats.atimeMs;
                if (timeSinceAccess >= EXPIRY) {
                    promptDelete(name)
                }
            })
        })
    })
}
checkExpiry()