const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const fs = require("fs");

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.post('/', function (req, res) {
    console.log('index');
    res.send("test");
});

app.post('/vote', (req, res) => {
    console.log(req.body);
    vote(req.body.id, req.body.value);
    res.send('success');
});

function vote(iD, opt) {
    console.log(iD);
    if (iD == null || opt == null) return;
    let raw = fs.readFileSync('votes.json');
    let data = JSON.parse(raw);
    let id = parseInt(iD);

    console.log(data.votes.n1);

    let nNum = `n${id}`;
    let cNum = `c${opt}`;

    data.votes.nNum.cNum++;

    let upData = JSON.stringify(data, null, 2);
    fs.writeFileSync("./votes.json", upData);
}

app.listen(8080, () => console.log('Listening'));
