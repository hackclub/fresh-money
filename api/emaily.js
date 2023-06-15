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
  if (req.query.date) {
    axios.request(options).then(async data => {
      var txs = data.data;
      txs = txs.filter(tx => (
        tx.date ===
        (new Date(req.query.date)).toLocaleString('en-us', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).toString()
      ));
      var welcomeMessage = `Hi Christina! Here is your daily update! -Abby \n`;
      var txs2 = txs.map(transaction => {
        return `Transaction Name: ${transaction.memo}, Amount: $${transaction.amount_cents / 100}, Date: ${transaction.date}`;
      }).join("\n");

      var currentDate = new Date().toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).toString();

      var subject = getSubjectForDay(currentDate);

      await sendEmail('abby@hackclub.com', 'abby@hackclub.com', subject, welcomeMessage + txs2);
      await sendEmail('christina@hackclub.com', 'abby@hackclub.com', subject, welcomeMessage + txs2);
      await sendEmail('max@hackclub.com', 'abby@hackclub.com', subject, welcomeMessage + txs2);
      res.status(200).send("it sent!!!! WOOOHOOOO");
    })
  } else {
    res.status(400).send("nope didn't work");
  }
}

function sendEmail(to, from, subject, text) {
  const data = {
    from: from,
    to: to,
    subject: subject,
    text: text
  };

  return new Promise((resolve, reject) => {
    mg.messages().send(data, (error, body) => {
      if (error) {
        reject(error);
      }
      console.log("sent!");
      resolve(body);
    });
  })
}

function getSubjectForDay(date) {
  const day = new Date(date).getDay();
  const month = new Date(date).toLocaleDateString('en-us', {
    month: 'long'
  }).toString();
  const dayOfMonth = new Date(date).getDate();

  switch (day) {
    case 0: // Sunday
    case 6: // Saturday
      return `No work day but the $ is moving - ${getFormattedDate(dayOfMonth, month)}`;
    case 1: // Monday
      return `Cha-Ching! Money Madness: ${getFormattedDate(dayOfMonth, month)}`;
    case 2: // Tuesday
      return `Treasure Tuesday ${getFormattedDate(dayOfMonth, month)} Trove Alert`;
    case 3: // Wednesday
      return `${getFormattedDate(dayOfMonth, month)} Bank Update`;
    case 5: // Friday
        return `Fri-Yay Finances: ${getFormattedDate(dayOfMonth, month)}`;
    default: // Thursday and Friday
      return `${getFormattedDate(dayOfMonth, month)}`;
  }
}

function getFormattedDate(day, month) {
  return `${month} ${day}`;
}
