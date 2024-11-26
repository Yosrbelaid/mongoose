const express=require('express')
const app=express();
require('dotenv').config();
const connectdb=require('./config/connectdb')
app.use(express.json())
const personRouter=require('./routes/person')
app.use('/person',personRouter)

connectdb()

//console.log(process.env.MONGO_URI)



app.listen(5000,(err)=>err ? console.log(err) : console.log('server is running'))