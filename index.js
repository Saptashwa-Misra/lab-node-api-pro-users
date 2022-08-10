const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userSchema = require('./schema')

app.use(express.json())
let dbUrl = 'mongodb+srv://Saptashwa-Misra:Database_Password@cluster0.uvlaqqy.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(dbUrl)
.then(()=>console.log('Db connected'))
.catch((err)=>console.log(err))

app.get('/api/users',async function(req,res){

    try{
        const result = await userSchema.find()
        //console.log(result.length==0)
        if (result.length==0)
            res.status(500).json({ errorMessage: "The are no users in the database." })
        else
            res.send(result)
    }
    catch(err){
        console.log(err)
    }

})
app.post('/api/users',async function(req,res){

    try{
        const result = await userSchema.create(req.body)
        res.status(201).send('Data Inserted')
    }
    catch(err){
        console.log(err)
    }

})
app.get('/api/users/:id',async function(req,res){

    try{
        const ID = parseInt(req.params.id)
        const result = await userSchema.findOne({prograd_id:ID})
        if(result==null)
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        //console.log(result)
        else
            res.send(result)
    }
    catch(err){
        console.log(err)
    }

})
app.put('/api/users/:id', async function(req,res){
    
    const ID = parseInt(req.params.id)
    try{
       
        const user = await userSchema.findOne({prograd_id:ID})
        if(user){
            let updatedUser = await userSchema.updateMany({prograd_id:ID},{$set:{name:req.body.name}})
            res.json({
                message: 'Record Updated',
                
            })
        }
        else{
            res.status(404).json({
                message: 'The user with the specified ID does not exist.',
            })
        }
    }
    catch(err)
    {
        console.log(err)
    }
})

app.delete('/api/users/:id', async function(req,res){
    
    const ID = parseInt(req.params.id)
    try{
       
        const user = await userSchema.findOne({prograd_id:ID})
        if(user){
            let updatedUser = await userSchema.deleteOne({prograd_id:ID})
            res.json({
                message: 'Record Deleted',
                
            })
        }
        else{
            res.status(404).json({
                message: 'The user with the specified ID does not exist.',
            })
        }
    }
    catch(err)
    {
        console.log(err)
    }
})

app.listen(5000,()=>console.log('Server Running'))