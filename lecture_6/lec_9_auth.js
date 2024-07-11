
const passport = require('passport');
// in this passport the uname and pwd is stretergy..
const LocalStratergy = require('passport-local').Strategy;

//  first the person add the username and password
const person = require('./model_person');


// create the passport function.. this function is check the username and password is valid or not .
passport.use(new LocalStratergy(async(UserName , Password , done)=>
{
try {
    console.log(`username : ${UserName} and password : ${Password}`);
    // now find the usernmae and password and check it's valid or not 
const user = await person.findOne({username : UserName});

if(!user)
    return done(null , false , {massage : 'Incorrect username ...'});

// this line is change for the hash password
// const ispswdmatch =  user.password === Password ? true : false;
 const ispswdmatch =  await user.comparePassword(Password);
 // this functionn can build it in model person....
if(ispswdmatch){
    return done(null , user);
    
}else
{
    return done(null , false , {massage : 'Incorrect password ...'});

}

// done();
} catch (error) {
    return done(error);
}
}));

module.exports = passport;

// now the done() is use the 3 parameter done(error , user , info).
 /*
 1. authenticate is success
 done(null , user , {massage : 'msg'});
 
 2. authenticate is fail
 done(null , false , {massage : 'msg'});

 3. authenticate is error
 done(err);
  */

 // now which route can authenticate 