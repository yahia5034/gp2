// var member=require('./counter');
// console.log(member.counter([1,2.3]))
// console.log(member.add(5,10));
// _______________________________________________________________
// var events=require('events')
// var myeventemitter=new events.EventEmitter();
// myeventemitter.on('someevent',function(msg){
//  console.log(msg)
// })

// myeventemitter.emit('someevent','hello')
// _______________________________________________________________
// const { log } = require('console')
// var event=require('events')
// var util=require('util')
// var person=function(name){
//     this.name=name
// }
// util.inherits(person,event.EventEmitter)
// var name=new person('james');
// var name2=new person('mary');
// var people=[name,name2]
// people.forEach(function(person){
//     person.on('speak',function(mssg){
//         console.log(person.name +"said : " + mssg);
//     })
// })
// name.emit('speak','hello world')
// _____________________________________________________________________
// const { log } = require('console')
// var fs=require('fs')
// var readme=fs.readFileSync('written.txt','utf-8')
// // fs.writeFileSync('written.txt',readme)
// console.log(readme);
//_____________________________________________________________________
//mkdir --=> create directory
//rmdir --=> remove directory
//unlink --=> remove file
//______________________________________________________________________
// var http = require('http');
// var server=http.createServer(function(req,res){
//     console.log(req.url);
//     res.writeHead(200,{'Content-type':'text/html'})
//     res.end('hey nanja');
// })
// server.listen(3000,'192.168.89.132',function() {
//     console.log('Server running at http://192.168.89.132:3000/');
// });

// ________________________________
// const { log } = require('console')
const express = require("express");
var server = express();
const cors = require("cors");
server.use(express.json());
var mongoose = require("mongoose");
var user = require("./models/email");
server.use(cors()); 
mongoose
  .connect(
    "mongodb+srv://abdoshaban482:12345@cluster0.jysbb4v.mongodb.net/User_emails"
  )
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
server.post("/user", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  user
    .findOne({ email: email })
    .then((user) => {
      console.log(user);
      res.send(user); // Send the user data back to the client
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

server.listen(3002, function () {
  console.log("connected");
});
