const mongoose=require('mongoose')
const { type } = require('os')

const personschema = new mongoose.Schema ({
    Name: {
        type:String,
        required: true
    },
    Age:{
        type:Number,
        required: true
    },
    Favouritefoods: {
        type:String,
        required: true
    }
})

const Person=mongoose.model('person', personschema)
module.exports = Person 