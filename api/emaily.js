var fs = require('fs')
var axios = require("axios").default;
var options = {
    method: 'GET',
    url: 'https://bank.hackclub.com/api/v3/organizations/hq/transactions',
    headers: {
        'Content-Type': 'application/json'
    }
};

const mailgun = require("mailgun-js");
const mg = mailgun({
    apiKey: process.env.API_KEY,
    domain: 'hackclub.com'
});

export default (req, res) => {
    if(req.query.date) {
    axios.request(options).then(data => {
        var txs = data.data;
        txs = txs.filter(tx => (
            tx.date ===
            (new Date(req.query.date)).toLocaleString('en-us', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2').toString()
        ));
        // var txt = txs.map(transaction => {
        //     if (transaction.amount_cents >= 100 * 10) {
        //         return `Donor Name: ${transaction.donor.name}, Amount: $${transaction.amount_cents/100}, Date: ${transaction.date}`
        //     }
        // });

        res.send(txs);
        sendEmail('abby@hackclub.com', 'abby@hackclub.com', `fresh money: ${Date.now()}`, txs)
        // sendEmail('max@hackclub.com', 'abby@hackclub.com', sub, txt)
    })
} else {
    res.status(400).send("nope didn't work")
}
    // res.send("sent email")
}

function sendEmail(to, from, subject, text) {
    const data = {
        from: from,
        to: to,
        subject: subject,
        text: text
    };

   

    mg.messages().send(data, function (error, body) {
        console.log(error, body);
    })

    console.log("sent!")
}