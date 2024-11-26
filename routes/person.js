const express = require('express');
const router = express.Router();
const Person = require('../models/personModel');  

router.post('/Addperson', async (req, res) => {
    try {
        const peopleArray = req.body;
        if (Array.isArray(peopleArray) && peopleArray.length > 0) {

            const newPeople = await Person.insertMany(peopleArray);
            res.send({ msg: 'New people created', newPeople });
        } 

        else if (typeof peopleArray === 'object' && peopleArray !== null) {
            const newPerson = new Person(peopleArray); 
            await newPerson.save();  
            res.send({ msg: 'New person created', newPerson });
        } else {
            res.status(400).send({ msg: 'You must send a single person or an array of people.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Error creating people', error: error.message });
    }
});

router.delete('/deletePerson/:id', async (req, res) => {
    try {
        const  personId  = req.params.id;

        const removedPerson = await Person.findOneAndDelete({_id:personId});

        if (!removedPerson) {
            return res.status(404).send({ msg: 'Person not found' });
        }

        res.send({ msg: 'Person deleted ', removedPerson });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'Error deleting ', error: error.message });
    }
});


router.get('/getAllpeople' , async (req,res) =>{
    try {
        const result = await Person.find();
        res.send(result)
    } catch (error) {
        console.log(error)
        
    }
})

router.get('/getId/:id' , async (req,res) =>{
    try {
        const result = await Person.findById(req.params.id)
        res.send(result)
    } catch (error) {
        console.log(error)   
    }
})

router.get('/getByName' , async (req,res) =>{
    try {
        const result = await Person.find({Name : "Amine" })
        res.send(result)
    } catch (error) {
        console.log(error)   
    }
})

router.put('/PersonAge/:Name', async (req, res) => {
    try {
        const Name  = req.params.Name; 
      

        const updatedPerson = await Person.findOneAndUpdate(
            { Name: Name },   
            { Age: 20 }, 
            { new: true }           
        );

        if (!updatedPerson) {
            return res.status(404).send({ msg: 'Person not found' });
        }

        res.send({ msg: 'Person updated ', updatedPerson });
    } catch (error) {
        console.error(error);
    }
});




router.delete('/deleteName/:Name', async (req, res) => {
    try {
        const  personName = req.params.Name;

        const removedPerson = await Person.findOneAndDelete({_Name:personName});

        res.send({ msg: 'Person deleted ', removedPerson });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'Error deleting ', error: error.message });
    }
});

router.get('/getfood' , async (req,res) =>{
    try {
        const result = await Person.find({Favouritefoods : "burritos" })
        res.send(result)
    } catch (error) {
        console.log(error)   
    }
})



module.exports = router;

