//configures enviorment variables
require('dotenv').config()
// console.log(process.env) 

// STEP 1:



// if there is a new transcation at bank TRIGGER
// if new transcation run, if not nothing chill

// node api hello.js
// node file that checks if new
// use the api and index to the first array element 
//output:
// 1) if file doesn't exsist create it last transaction.txt
// 2) compare transaction time (c) to file 
// 3) compare c to 1 to the newest the Element]
// 4) if its the same send an Email if its different don't 
// 5) update file

//Step 2:

// figure out the trascation ID value endpoint ASK CALEB!!!!!!

// mail gun stuff
const API_KEY = process.env.API_KEY;
const DOMAIN = 'hackclub.com';

const mailgun = require("mailgun-js");
const mg = mailgun({apiKey: API_KEY, domain: DOMAIN});
const data = {
	from: 'Abby Fischler (the money queen) <abby@hackclub.com>',
	to: 'abby@hackclub.com',
	subject: 'Fre$h moneyyy',
	text: 'Testing some Mailgun awesomness!'
};


const messageData = {
  from: 'Abby Fischler <abby@hackclub.com>',
  to: 'abigail.fischler@gmail.com',
  subject: 'Donation@',
  text: 'Hack Club has recived a donation!'
};


export default function handler(request, response) {
  const { name } = request.query;
 mg.messages().send(data, function (error, body) {
	console.log(error, body);
  response.status(200).send(`Hello ${body}!`);
}

)

console.log("HIII THIS CODE HAS RUN!");
}


//hack club bank API STUFF
// var axios = require("axios").default;

// var options = {
//   method: 'GET',
//   url: 'https://bank.hackclub.com/api/v3/donations/donation_id',
//   headers: {'Content-Type': 'application/json'}
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });
// module.exports = {
//   handler: (request, response) => {
//     const { name } = request.query;
//     response.status(200).send(`Hello ${name}!`);
//   }
//   }

