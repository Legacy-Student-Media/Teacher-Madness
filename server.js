const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const fs = require("fs");
const sqlite = require("sqlite3").verbose();

let sql = new sqlite.Database('./votes.db', (err) => {
    if (err) return console.error(`${err} \n${err.stack}`);
    console.log("Connected to the votes database");
});

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

app.put('/votes', (req, res) => {
    parseVotes(id, opt);
});

function vote(iD, opt) {
    console.log(iD);
    if (iD == null || opt == null) return;
    let raw = fs.readFileSync('votes.json');
    let data = JSON.parse(raw);
    let id = parseInt(iD);

    console.log(data.votes[id]);

    sql.run(`SELECT * FROM vote WHERE voteId ="${id}"`, function (err, row) {
        if (err) {
            console.error(`myErr ${err} \n${err.stack}`);
            sql.run('CREATE TABLE IF NOT EXISTS vote (voteId INTEGER, votes1 INTEGER, votes2 INTEGER', function () {
                sql.run('INSERT INTO vote (voteId, votes1, votes2) VALUES (?, ?, ?)', [id, 0]);
            });
        }
        if (row) {
            let curVotes;
            let newVotes;
            if (opt == 0) {
                curVotes = parseInt(row.votes1);
                newVotes = curVotes++;
                sql.run(`UPDATE vote SET votes1 = ${newVotes} WHERE voteId = ${id}`);
            } else if (opt == 1) {
                curVotes = parseInt(row.votes2);
                newVotes = curVotes++;
                sql.run(`UPDATE vote SET votes2 = ${newVotes} WHERE voteId = ${id}`);
            }

            console.log()
        } else {
            sql.run('INSERT INTO vote (voteId, votes1, votes2) VALUES (?, ?, ?)', [id, opt]);
        }
    });


    /*let nNum = `n${id}`;
    let cNum = `c${opt}`;

    data.votes[id].choices[opt]++;

    let upData = JSON.stringify(data, null, 2);
    fs.writeFileSync("./votes.json", upData);*/
}

app.listen(8080, () => console.log('Listening'));
