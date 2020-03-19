const port = 8080;
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const fs = require("fs");
const sqlite = require("sqlite3").verbose();

let sql = new sqlite.Database('./vote.db', (err) => {
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
    let id = req.body.id;
    sql.get(`SELECT * FROM vote WHERE voteId=${id}`, function (err, row) {
        let opt1 = row.votes1;
        let opt2 = row.votes2;
        res.send(`{vote1: ${opt1}, vote2: ${opt2}}`);
    });
});

function vote(id, opt) {
    if (id == null || opt == null) return;

    sql.get(`SELECT * FROM vote WHERE voteId=${id}`, function (err, row) {
        let curr, name;

        if (opt == 0) {
            curr = row.votes1;
            name = "votes1";
        } else {
            curr = row.votes2;
            name = "votes2";
        }
        let up = parseInt(curr) + 1;
        up = parseInt(up);

        console.log(`curr = ${curr}`)
        console.log(`up = ${up}`)
        sql.run(`UPDATE vote SET ${name} = "${up}" WHERE voteId = ${id}`, function (err) {
            if (err) {
                console.error(`myErr ${err} \n${err.stack}`);
            }
            console.log('updateDB ran');
        })
    })
}

app.listen(port, () => console.log(`Listening on port ${port}`));

//Standard exception handler
process.on('unhandledRejection', err => {
    console.error('Uncaught Promise Error: \n' + err.stack);
});
