const express = require('express');
const router = express.Router();
const Person = require('./model_person');
const  {jwtsuthmiddleware , generatetoken} = require('./../lec_11_jwt');

// lecture 11 .. change the routes name signupa and create the login.
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);

        // save the newPerson dat into the database..
        const SavePerson = await newPerson.save();
        console.log('data is saved');
        
        //  pass the token use for the payload

        // pass many of information for the security purpose
        const payload = {
            id : SavePerson.id,
            username : SavePerson.username,
            password : SavePerson.password
        }
        console.log(payload);
        const token = generatetoken(payload);
        console.log(`token is ${token}`);
        
        res.status(200).json({saveperson : SavePerson , token : token});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: 'inernal server error' });
    }

});

// login router.
router.post('/login' , async(req , res)=>{

    try {
        // extract the username and password in req.body
        const {username , password} = req.body;

        // find the user by the username 
        const user = await Person.findOne({username: username});

        // check the username and password .. if username is correct but the password is not mathch
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error : 'invalid username and password'});
        }
  // now all of it's complete, the generate the token
  const payload ={
    id: user.id,
    username : user.username
  }

  const token = generatetoken(payload);
  res.json({token});

    } catch (error) {
        console.log(error);
        res.status(500).json({ err: 'inernal server error' });
    }
});

router.get('/',jwtsuthmiddleware, async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data is fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'inernal server error' });
    }
});
// profile route(token profile show it).
router.get('/profile' ,jwtsuthmiddleware, async(req , res)=>
{
    try {
        const userdata = req.user; // payload information show it
        console.log("user data : " , userdata);
        
        // id through accesss
        const userid = userdata.id;
        const user = await Person.findById(userid);
        
        res.status(200).json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: 'inernal server error' });
    
    }

});

router.get('/:worktype', async (req, res) => {
    const worktype = req.params.worktype; // fetch the work of data.. (params is parmeter)..

    // now the any of type work is write to check the worktype is valid or not 
    try {
        if (worktype === 'chef' || worktype === 'manager') {
            const response = await Person.find({ work: worktype });
            res.status(200).json(response);
        } else {
            res.status(400).json({ err: 'invalid work type ' });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'inernal server error' });
    }

});

// update method
router.put('/:id' , async(req , res)=>
{
    try {
        const personId = req.params.id; // fetch the record
        const updateData = req.body; // je dataa avse a body ni andr hse okayy.. and te bodypparser use it bcoz data is json format

        // db function is use 
        const response = await Person.findByIdAndUpdate(personId , updateData, {
            new: true, // return the update document..
            runValidators: true, // mongoose check krse model file na validations...
        });

        // koi evi objID je exist j naa hoy...
        if(!response)
            {
                res.status(404).json("page will not found");
            }

        console.log('data updated');
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ err: 'inernal server error' });
    
    }
});

// delete method
router.delete('/:id' , async(req , res)=>
    {
        try {
            const personId = req.params.id; // fetch the record
        
            // db function is use 
            const response = await Person.findByIdAndDelete(personId);
    
            // koi evi objID je exist j naa hoy...
            if(!response)
                {
                    res.status(404).json("page will not found");
                }
    
    
            console.log('data deleted');
            res.status(200).json({massage : "person data will be deleted"});
    
        } catch (error) {
            console.log(error);
            res.status(500).json({ err: 'inernal server error' });
        
        }
    });

module.exports = router;