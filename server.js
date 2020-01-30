const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.static(__dirname));

app.post('/', function (req, res) {
    console.log('index');
    res.send("test");
});

app.get('/vote', (req, res) => {
    console.log(req.body)
    vote(req.query[0], req.query[1])
    res.send('success');
});

function vote(iD, opt) {
    //console.log(iD);
    if (iD == null || opt == null) return;
    let raw = fs.readFileSync('votes.json');
    let votes = JSON.parse(raw);
    let id = parseInt(iD);

    console.log(votes.votes[id]);
    console.log(raw);
    //console.log(JSON.stringify(votes, null, 2));
    //fs.writeFileSync("./votes.json", votes);
}

app.listen(8080, () => console.log('Listening'));
