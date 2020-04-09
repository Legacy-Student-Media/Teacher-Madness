const request = require('request');
const moment = require('moment');

let interval = Math.round(Math.random() * (200 - 20) + 20) * 1000;

setInterval(function() {
    let time = moment(Date.now()).local().format('MM-DD HH:mm:ss');
    let t = time.substring(0, 2);
    let z = time.substring(3, time.length);
    time = t + "/" + z;

    request('https://teacher-madness.glitch.me/test', {json: true}, (err, res, body) => {
        if (err) return console.log(err);
        console.log(`${time} - ${res.statusCode}`);
    })
}, interval);