var fs = require('fs')
var axios = require("axios").default;
var options = {
    method: 'GET',
    url: 'https://bank.hackclub.com/api/v3/organizations/hq/donations',
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
    axios.request(options).then(data => {
        var txs = data.data;
        var txt = txs.map(transaction => {
            if (transaction.amount_cents >= 100 * 10) {
                return `Donor Name: ${transaction.donor.name}, Amount: $${transaction.amount_cents/100}, Date: ${transaction.date}`
            }
        });

        var sub = `fresh money: ${Date.now()}`
        sendEmail('abby@hackclub.com', 'abby@hackclub.com', sub, txt)
       // sendEmail('max@hackclub.com', 'abby@hackclub.com', sub, txt)
    })
    res.send("sent email")
}

function sendEmail(to, from, subject, text) {
    const data = {
        from: from,
        to: to,
        subject: subject,
        text: text
    };

    mg.messages().send(data, function(error, body) {
        console.log(error, body);
    })
}
