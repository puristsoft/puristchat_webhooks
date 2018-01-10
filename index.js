const express = require('express');
const app = express();
var morgan = require('morgan')
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs')
var request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(morgan('combined'));

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'webhooks.log'), {flags: 'a'});

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

app.use('/', express.static('../public'));

app.get('/', function (req, res) {
  res.status(200).send('index.html');
})

app.get('/chat', function (req, res) {
  res.status(200).send('Hello PuristChat Webhook Listener !');
})
var i=0;
app.post('/puristchat/receive', function (req, res) {

  // PuristChat will send the following JSON
  // {"event":"join","conversation_id":18,"support_catagory_id":1,"support_catagory_name":"General","operator_id":4,"operator_name":"zak","end_customer_id":7,"end_customer_name":"nancy","body":null,"file_url":null}
  // event  = join, with join a welcome message can be send 
  // event =  message, means some data typed by end customer and need to take action 
  // event = leave , user sign-out and some event may occur in backend. 

console.log(JSON.stringify(req.body));
// get message body 
var webhook = req.body.body;
var eventname = req.body.event;

// reply with APIs
// save conversation ID for send API to work as per the API format. 

var conv_id=req.body.conversation_id;
var sendAPI = 'http://api.puristchat.com/admin/v1/conversations/' + conv_id + '/messages/'

// reply with chatbot message , HTML formating is not yet done.  

var msg = { "body" : "hello from auomated agent , you said " + webhook };

//console.log("sending.. :" + sendAPI);
//i++;


var ret;
if(eventname==='join') {
  msg = { "body" : "Welcome,  " + req.body.end_customer_name + " how can I help you today?" };  
  ret = replymsg(msg,sendAPI , function(data) {
      console.log(data);
  });
}

if(eventname==='leave') {
  // do somehting with your backend app

}

if(eventname==='message') {


if(req.body.body=="hello" || req.body.body=="Hello")
   msg.body = "Thanks , how are you?"

   
    ret = replymsg(msg,sendAPI , function(data) {
        console.log(data);
    });
}

res.status(200).send();
// end post
}); 


app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})

function replymsg(msg,url,cb) {



  var opt = {
    url:url,
    method: 'POST',               
    headers: {     
          'Content-Type': 'application/json',
          'Authorization':'Bearer <your admin API token>'
    },  
    useQuerystring : true,
    json: true,
    sendImmediately:  false,      
    body:msg
  };
  
  request(opt,function(error,httpResponse,retdata){


    if (httpResponse.statusCode === 202) {
      // this message has been queued for delivery on the Teams-side
      // Awkward that it does not return the normal message object
      // this prevents use of message updating for messages that get queued
      if (cb) { return cb(null, {}); } else return;
  }

  if (!retdata) {
      if (cb) { return cb('Error parsing json response'); }
  }

  if (retdata.error) {
      if (cb) { return cb(retdata.error); }
  }

  if (cb) { cb(null, retdata); }

   }); 

}

