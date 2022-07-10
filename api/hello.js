const API_KEY = 'pubkey-72e3c478701ec798d8b51297766c5021';
const DOMAIN = '@hackclub.com';

const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const client = mailgun.client({username: 'api', key: API_KEY});

const messageData = {
  from: 'Abby Fischler <abby@hackclub.com>',
  to: 'abby@hackclub.com',
  subject: 'Donation@',
  text: 'Hack Club has recived a donation!'
};

client.messages.create(DOMAIN, messageData)
 .then((res) => {
   console.log(res);
 })
 .catch((err) => {
   console.error(err);
 });


var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://bank.hackclub.com/api/v3/donations/donation_id',
  headers: {'Content-Type': 'application/json'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
export default function handler(request, response) {
    const { name } = request.query;
    response.status(200).send(`Hello ${name}!`);
  }

