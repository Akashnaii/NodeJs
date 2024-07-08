const mongoose = require('mongoose');
require('dotenv').config();


// define the url.
// const url = 'mongodb://localhost:27017/sec_hotel'; // automatic db is create.
const newURL =  process.env.MONGODB_URL;

console.log('MongoDB URL:', process.env.MONGODB_URL);
// console.log('Port:', process.env.PORT);
//establish the connection
mongoose.connect(newURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
    
});

// mongoose maintain the default connection represent the connection
const db = mongoose.connection;

// the db object to use it the event listner..
db.on('connected' , ()=>
{
    console.log('connected the database connection');
});
db.on('error' , (err)=>
{
    console.log('error the database connection' , err);
});
db.on('disconnected' , (error)=>
{
    console.log('disconnected the database connection' , error);
});

// export the database connection..
module.exports = db;