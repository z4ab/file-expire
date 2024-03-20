const fs = require('node:fs');
const prompt = require('prompt-sync')();

const PATH = './test-dir';
const EXPIRY = daysToMs(2);

function daysToMs(days) {
    return days * 24 * 60 * 60 * 1000;
}
function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ' hours ' + mins + ' minutes and ' + secs + ' seconds';
}

function promptDelete(name, timeSinceAccess) {
    const msg = name + ' has not been accessed for ' + msToTime(timeSinceAccess) + '. Delete? (Y/n): ';
    const inp = prompt(msg);
    if (inp.toLowerCase() === 'y') {
        fs.unlink(PATH + '/' + name, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })
    }
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
                    promptDelete(name, timeSinceAccess);
                }
            })
        })
    })
}
checkExpiry()