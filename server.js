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

function vote(id, opt) {
    if (id == null || opt == null) return;
    console.log(getRow);

    getRow(id).then(row => {
        let newVotes;

        if (opt == 0) {
            newVotes = row.votes1++;
            updateDB(id, "votes1", newVotes);
        } else if (opt == 1) {
            newVotes = row.votes2++;
            updateDB(id, "votes2", newVotes);
        }
    });
}


/*let nNum = `n${id}`;
let cNum = `c${opt}`;

data.votes[id].choices[opt]++;

let upData = JSON.stringify(data, null, 2);
fs.writeFileSync("./votes.json", upData);*/

//Get row from sql 
const getRow = (id) => {
    return new Promise((resolve, reject) => {
        let row;
        sql.get(`SELECT * FROM vote WHERE voteId ="${id}"`, function (err, r) {
            if (err) {
                console.error(`myErr ${err} \n${err.stack}`);
            }

            if (!r) {
                console.log("no row");
                sql.run('INSERT INTO vote (voteId, votes1, votes2) VALUES (?, ?, ?)', [id, 0, 0]);
            }
            console.log(`r = ${r.votes2}`);
            row = r
        });
        resolve(row);
    });
}

//Update value in sql database
function updateDB(id, field, val) {
    sql.run(`UPDATE vote SET ${field} = ${val} WHERE voteId = ${id}`, function (err) {
        if (err) {
            console.error(`myErr ${err} \n${err.stack}`);
        }
        console.log('updateDB ran');
    })
}

app.listen(8080, () => console.log('Listening'));

//Standard exception handler
process.on('unhandledRejection', err => {
    console.error('Uncaught Promise Error: \n' + err.stack);
});
