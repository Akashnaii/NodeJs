const express = require('express');
const router = express.Router();
const Person = require('./model_person');


router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);

        // save the newPerson dat into the database..
        const SavePerson = await newPerson.save();
        console.log('data is saved');
        res.status(200).json(SavePerson);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: 'inernal server error' });
    }

});

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data is fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
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