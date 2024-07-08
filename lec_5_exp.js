// JSON data.. (Javascript Object Notation)
// const jsonstr = '{"name": "john" , "age":23, "city":"new york"}';
// const jsonobj = JSON.parse(jsonstr); // convert the json to object..

// console.log(jsonobj.age);

// const objtoconvert = {
//     name : "alice", 
//      age:22
//     };
// const jsonn = JSON.stringify(objtoconvert); // convert the object to json

// console.log(jsonn);

// json is the typeof is String..

// now create the server .. 
const express = require('express');
const app = express();

// this function is menu card for 
app.get('/emo', function (req, res) { 
  res.send('welcome to the express js ');
})
app.get('/hair-cut', function (req, res) { 
  var info = {
 name  : "shanti",
 age : 23,
 email : "shantinai@gmail.com"
  }
  res.send(info);
})

// now i have check .. the port is live or not 
app.listen(3000 , ()=> // this is ask to say it .. 3000 is my execute number
{
console.log('listing the port 3000');
})

// nodemon not use... (node --watch filename)