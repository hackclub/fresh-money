//configures enviorment variables
require('dotenv').config()
// console.log(process.env) 



//ack club bank API STUFF
var axios = require("axios").default;

var options = {
    method: 'GET',
    url: 'https://bank.hackclub.com/api/v3/organizations/hq/donations',
    headers: {
        'Content-Type': 'application/json'
    }
};


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
const mg = mailgun({
    apiKey: API_KEY,
    domain: DOMAIN
});
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


export default async function hello(req, res) {
   
    // mg.messages().send(data, function(error, body) {
    //         console.log(error, body);
    //         response.status(200).send(`Hello ${body}!`);
    //     }

    //)
    var data = await axios.request(options); 
    var txs = data.data;
    
    data.forEach((tx) => {
      console.log(tx);
  });

    //bank API output storing as data


    console.log("HIII THIS CODE HAS RUN!");
    res.send(data.data);
}


 

// // goal: index through the first API array element

// how do i link so it goes through the API index?
// function first(arr) {
//     if(!Array.isArray(arr)) return;
//     return arr[0];
//  }

//  // 2 attempt
//  File yourFile = new File("transaction.txt");
// yourFile.createNewFile(); // if file already exists will do nothing 
// FileOutputStream oFile = new FileOutputStream(yourFile, false); 