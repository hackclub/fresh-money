//configures enviorment variables
require('dotenv').config()

console.log('script running...')
fs = require('fs')
lastRunTime = fs.readFileSync('yo.txt', 'utf8')


//if it was run before the 24 hours
//turn lastRunTime into a timestampe
console.log(lastRunTime, Date.parse(lastRunTime), Date.now())
if (Date.parse(lastRunTime) <= Date.now() - 5000) {

  // grab transcation details
  var axios = require("axios").default;

  var options = {
    method: 'GET',
    url: 'https://bank.hackclub.com/api/v3/organizations/hq/donations',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // ASYNC VS SYNC EXAMPLES
  // // sync
  // var data = asyncThing()
  // console.log(data)
  // // async
  // asyncThing().then(data => {
  //   console.log(data)
  // })

  axios.request(options).then(data => {
    var txs = data.data;
    // write some code...
    var listOfTxs = txs
    var sub = `fresh money: ${Date.now()}`
    var txt = 'transaction number'
    sendEmail('abby@hackclub.com', 'abby@hackclub.com', sub, txt)
    sendEmail('max@hackclub.com', 'abby@hackclub.com', sub, txt)

    // var latest = txs.slice().sort((a, b) => new Date(b.date) - new Date(a.date))[0];

    // console.log(latest)
    // if (latest.date >= lastRunTime){
    //   //res.send({latest, mostMoney});
    // }

  })
  // data isn't valid anymore


  //var data = axios.request(options);
  //var txs = data.data;

  // console.log(data, txs);

  fs.writeFileSync('yo.txt', String(new Date()), function (err) {
    if (err) return console.log(err);
  });
} else {
  console.log("It has been less than a day")
}


function sendEmail(to, from, subject, text) {
  const API_KEY = process.env.API_KEY;
  const DOMAIN = 'hackclub.com';

  const mailgun = require("mailgun-js");
  const mg = mailgun({
    apiKey: API_KEY,
    domain: DOMAIN
  });
  const data = {
    from:from,
    to: to,
    subject: subject,
    text: text
  };

  mg.messages().send(data, function (error, body) {
    console.log(error, body);
  })
}

// process.exit(0)

//ack club bank API STUFF
// var axios = require("axios").default;

// var options = {
//     method: 'GET',
//     url: 'https://bank.hackclub.com/api/v3/organizations/hq/donations',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// };

// /*
// // STEP 1:



// // if there is a new transcation at bank TRIGGER
// // if new transcation run, if not nothing chill

// // node api hello.js
// // node file that checks if new
// // use the api and index to the first array element 
// //output:
// // 1) if file doesn't exsist create it last transaction.txt
// // 2) compare transaction time (c) to file 
// // 3) compare c to 1 to the newest the Element]
// // 4) if its the same send an Email if its different don't 
// // 5) update file

// //Step 2:

// // figure out the trascation ID value endpoint ASK CALEB!!!!!!
// */
// // mail gun stuff
// const API_KEY = process.env.API_KEY;
// const DOMAIN = 'hackclub.com';

// const mailgun = require("mailgun-js");
// const mg = mailgun({
//     apiKey: API_KEY,
//     domain: DOMAIN
// });
// const data = {
//     from: 'Abby Fischler (the money queen) <abby@hackclub.com>',
//     to: 'abby@hackclub.com',
//     subject: 'Fre$h moneyyy',
//     text: 'Testing some Mailgun awesomness!'
// };


// const messageData = {
//     from: 'Abby Fischler <abby@hackclub.com>',
//     to: 'abigail.fischler@gmail.com',
//     subject: 'Donation@',
//     text: 'Hack Club has recived a donation!'
// };


// // export default async function hello(req, res) {
//    /*
//     mg.messages().send(data, function(error, body) {
//             console.log(error, body);
//             response.status(200).send(`Hello ${body}!`);
//         }

//     )
//  */
// //this creates a new textfile called lastrun.txt
//     fs = require('fs');
//     fs.writeFile('lastrun.txt', 'Hello World! We are getting money!', function (err) {
//       if (err) return console.log(err);
//     });



// var data = await axios.request(options); 
// var txs = data.data;

//     //sorts transcations by date
// var latest = txs.slice().sort((a, b) => new Date(b.date) - new Date(a.date))[0];
// if (latest.date >= new Date()){
//   //res.send({latest, mostMoney});
// }

//     console.log("HIII THIS CODE HAS RUN!");
//    // res.send({latest, mostMoney});
// }
/* checks everyday if there are any transactions with the the date and if there were send a summary email*/


/**
 1) compare last transaction date to last transaction that was made and cached
 2)if last transaction is greater than the last transacation cached SEND AN EMAIL
  */