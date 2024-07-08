// models are like a blueprint of our databases..
// represent the collection...
// define the data in the database

const mongoose = require('mongoose');

// in the database inside the collection create...
const Personschema = new mongoose.Schema({
    name:
    {
        type : String,
        required : true
    },
    age:
    {
        type: Number,

    },
    work:
    {
        type: String,
        required: true
    },

    mobile:
    {
        type: Number,
        required: true
    },
    email:
    {
        type : String,
        unique : true,
        required:true
    },
    address :
    {
        type: String,
        default : false

    },
    salary:
    {
        type: Number,
        required: true
    }
});

// create the model and use the model
const Person = mongoose.model('person' , Personschema);
module.exports = Person;