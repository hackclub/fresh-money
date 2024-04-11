import fetch from 'node-fetch'
import mailgun from 'mailgun-js'

const mg = mailgun({
  apiKey: process.env.API_KEY,
  domain: 'hackclub.com'
});

// TODO: Split into .JSON file and parsed
const emails = [
  "christina@hackclub.com",
  "cody@hackclub.com",
  "zach@hackclub.com",
  "hackclub-leeks-aaaak5xlf3x2gnrkutysmrdp4a@hackclub.slack.com"
]

export default (req, res) => {
  if (req.query.date) {
    fetch('https://hcb.hackclub.com/api/v3/organizations/hq/transactions')
      .then(response => response.json())
      .then(async data => {
        var txs = data;
        txs = txs.filter(tx => (
          tx.date ===
          (new Date(req.query.date)).toLocaleString('en-us', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2').toString()
        ))
        txs = txs.filter(tx => (
          tx.amount_cents >= 400
        ))
        var welcomeMessage = `Hi!! Here is your daily update: <br />`;
        var endingMessage = `Best, Abby`;
        var txs2 = txs.map(transaction => {
          return `
          <tr style="background-color: ${
            transaction.amount_cents > 0 ? "rgba(51,214,166,0.125)" : "rgba(236,55,80,0.125)"
          }; color: black; border-bottom: 1px solid rgba(0,0,0,0.0625)">
            <td style="padding: 3px 10px;">${transaction.memo}</td>
            <td style="padding: 3px 10px;">${(transaction.amount_cents / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}</td>
          </tr>
        `;
        }).join("\n");

        var currentDate = new Date().toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).toString();

        var subject = getSubjectForDay(currentDate);

        var html = `${welcomeMessage}<br /><table style="border-collapse: collapse;">
      <tr style="text-align: left;">
        <th style="padding: 3px 0px;">Description</th>
        <th style="padding: 3px 0px;">Amount</th>
      </tr>${txs2}</table><br />${endingMessage}`;

        const emailPromises = emails.map((address) => sendEmail(address, 'abby@hackclub.com', subject, html))

        const sent = await Promise.allSettled(emailPromises)

        sent.forEach((val,i) => val.status == "rejected" ? console.error(`Unable to send digest to ${emails[i]}`) : null)

        res.status(200).send("it sent!!!! WOOOHOOOO");
      })
      .catch(error => {
        console.error(error);
        res.status(500).send("An error occurred while fetching the data.");
      });
  } else {
    res.status(400).send("nope didn't work");
  }
}

function sendEmail(to, from, subject, html) {
  const data = {
    from: from,
    to: to,
    subject: subject,
    html: html
  };

  return new Promise((resolve, reject) => {
    mg.messages().send(data, (error, body) => {
      if (error) {
        reject(error);
      } else {
        console.log("sent!");
        resolve(body);
      }
    });
  });
}

function getSubjectForDay(date) {
  const day = new Date(date).getDay();
  const month = new Date(date).toLocaleDateString('en-us', {
    month: 'long'
  }).toString();
  const dayOfMonth = new Date(date).getDate();

  switch (day) {
    case 0: // Sunday
      return `Sunday funday money day- ${getFormattedDate(dayOfMonth, month)}`;
    case 6: // Saturday
      return `Not a work day but the $ is moving - ${getFormattedDate(dayOfMonth, month)}`;
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
