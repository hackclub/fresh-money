//configures enviorment variables
require('dotenv').config()
// console.log(process.env) 

//configure the domain / DNS
// figure out the trascation ID value endpoint ASK CALEB!!!!!!

// mail gun stuff
const API_KEY = process.env.API_KEY;
const DOMAIN = '@hackclub.com';

const mailgun = require("mailgun-js");
const mg = mailgun({apiKey: API_KEY, domain: DOMAIN});
const data = {
	from: 'Excited User <abby@hackclub.com>',
	to: 'abby@hackclub.com',
	subject: 'Hello',
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

