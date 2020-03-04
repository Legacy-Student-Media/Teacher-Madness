const sqlite = require('sqlite3').verbose();
let sql = new sqlite.Database('./votes.db', (err) => {
    if (err) return console.error(`${err} \n${err.stack}`);
    console.log("Connected to the votes database");
});

const getRow = (id) => {
    return new Promise((resolve, reject) => {
        let row;
        sql.get(`SELECT * FROM vote WHERE voteId ="${id}"`, function (err, r) {
            if (err) {
                console.error(`myErr ${err} \n${err.stack}`);
            }

            if (!r) {
                console.log("no row");
                sql.run('INSERT INTO vote (voteId, votes1, votes2) VALUES (?, ?, ?)', [id, "0", "0"]);
            }
            console.log(`r = ${r.votes2}`);
            row = r
        });
        setTimeout(function () {
            resolve(row);
        }, 750);
    });
}

/*getRow(1).then(row => {
    let curr = row.votes1;
    let up = parseInt(curr) + 1;
    up = parseInt(up);
    console.log(`curr = ${curr}`)
    console.log(`up = ${up}`)
    console.log(typeof up)
    sql.run(`UPDATE vote SET votes1 = "${up}" WHERE voteId = 1`, function (err) {
        if (err) {
            console.error(`myErr ${err} \n${err.stack}`);
        }
        console.log('updateDB ran');
    })
})*/

sql.get(`SELECT * FROM vote WHERE voteId=1`, function (err, row) {
    let curr = row.votes1;
    let up = parseInt(curr) + 1;
    up = parseInt(up);
    console.log(`curr = ${curr}`)
    console.log(`up = ${up}`)
    sql.run(`UPDATE vote SET votes1 = "${up}" WHERE voteId = 1`, function (err) {
        if (err) {
            console.error(`myErr ${err} \n${err.stack}`);
        }
        console.log('updateDB ran');
    })
})

sql.all('SELECT * FROM vote', [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(row);
    });
});
