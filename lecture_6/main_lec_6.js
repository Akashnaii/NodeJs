const express = require('express');
const app = express();
const db = require('./db_connection');
const bodyparser = require('body-parser');
require('dotenv').config();

const routes = require('./personroutes');
const passport = require('./lec_9_auth');


// all of it's the database operation is performed
const person = require('./model_person');

app.use(passport.initialize());
// the lecture 9 middleware function..
const logRequest = (req , res , next)=>
{
    // print the date and time.
    console.log(`${new Date().toLocaleString()} request made to : ${req.originalUrl}`);
    next(); // move to the next phase ..
}

    
// all routes can use the middleware
app.use(logRequest);
// use the middleware in the routes...
app.get('/start' ,  function(req,res){

    // console.log('hello guys start your lecture 6');
    res.send('hello guys start your lecture 6');
    });


// note : data levaa hoy to GET and aapva hoy to POST..

// body parser is .. the client can sent the data in the JSON format ..
// so the bodyparser is convert the JOSN data into the OBJECT automatic and store into
// req.body..
app.use(bodyparser.json()); // store in req.body..

// POST method
// app.post('/person' , (req , res)=>
// {
//     const data = req.body; // data je aave e store .. req.body pr thaay che 

//     // evo data banaie ke je personn type no hoy..
//     const newPerson = new Person(data);
//     // it's very complex method.. so direct inside the variable pass..new Person(data).
//     // newPerson.name = data.name;
//     // newPerson.age = data.age;
//     // newPerson.mobile = data.mobile;
//     // newPerson.address = data.address;

// // data ne save pn krvo pde ..
// newPerson.save((error , SavePerson)=>
// {
//     if(error)
//         {
//             console('the error is ' , error);
//             res.status(500).json({error : "show the error"});
//         }
//         else
//         {
//             console.log('succes the data response');
//             res.status(200).json(SavePerson);
//         }
        
// })
// });
// show me error .. the callback function is not used.. 

// use the async-await ..


// get method


// CRUD operations

 /* DB operations   HTTP Methods
 C -> Create ->     POST
 R -> Read ->       GET
 U -> Update ->     PUT/PATCH
 D -> Delete ->     DELETE */

 // all the person api in personroutes.js file..
 //  import the router file..


// use the routes..
// use the variable in the .env file..
const port = process.env.PORT || 3002
app.use('/person',passport.authenticate('local' , {session : false}), routes);

    app.listen(port , ()=>{
        console.log('port is the complete ');
    });