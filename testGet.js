const sqlite = require('sqlite3').verbose();
let sql = new sqlite.Database('./votes.db', (err) => {
    if (err) return console.error(`${err} \n${err.stack}`);
    console.log("Connected to the votes database");
});

sql.run(`UPDATE vote SET votes1 = 2 WHERE voteId = 1`, function (err) {
    if (err) {
        console.error(`myErr ${err} \n${err.stack}`);
    }
    console.log('updateDB ran');
})

sql.all('SELECT * FROM vote', [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(row);
    });
});
