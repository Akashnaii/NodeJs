// models are like a blueprint of our databases..
// represent the collection...
// define the data in the database

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { throttle } = require('lodash');
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
    },
// the lec_9 use the passport.js
    username:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
});
Personschema.pre('save' , async function(next)
{
    const person = this; // aa variable ma person j chee.

    // jyare koi potaano password change krvaa naa aave teni maateni condition
    // hash the password only if it has been modified (or a new).
    if(!person.isModified('password')) return next();

  try {

   // hash password generation
   // first in password add the salt
   const salt = await bcrypt.genSalt(10);
   
   // second is hash password
   const hashedpassword = await bcrypt.hash(person.password , salt);

   // now your plain password is hashed password save it 
   person.password = hashedpassword;
   
    next(); // in middleware is the next can talk about now you cna save the data

  } catch (error) {
    return next(error);
  }

});
// now in the uth file u can change the compare password..

// build the compare function
Personschema.methods.comparePassword = async function(candidatepwd)
{
    try {
        // compare the provided password with the person
        const ismatch = await bcrypt.compare(candidatepwd , this.password); // in compare method use the 2 parameter
    return ismatch;
    } catch (error) {
       return error; 
    }
}
// create the model and use the model
const Person = mongoose.model('Person' , Personschema);
module.exports = Person;