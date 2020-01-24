const express = require("express");
const app = express();
const fs = require("fs");

app.get('/vote', (req, res) => {
    vote(req.query[0], req.query[1])
    res.send('success');
});

function vote(id, opt) {
    if (id == null || opt == null) retrn;
    let raw = fs.readFileSync('votes.json');
    let votes = JSON.parse(raw);

    votes.id[opt]++;
    console.log(votes);
}

app.listen(3000, () => console.log('Listening on 3000'));
