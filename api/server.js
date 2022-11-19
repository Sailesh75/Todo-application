const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
require('./models/conn');
const Todo=require('./models/Todo');

const app = express();
const port = process.env.PORT||3000;

app.use(express.json());
app.use(cors());      

//read todos
app.get('/todos',async(req,res)=>{
    const todos = await Todo.find();
    res.json(todos);
})

//create todo
app.post('/todos',async(req,res)=>{
    const todo=await Todo.create(req.body)
    res.status(200).json({
        sucess:true,
        todo
    })
})

//delete todo
app.delete('/todos/:id',async(req,res)=>{
    const todo=await Todo.findByIdAndDelete(req.params.id)
    res.status(200).json({
        Sucess:true,
        message:"Todo deleted"
    })
})

//update todo
app.put('/todos/:id',async(req,res)=>{
    let todo=await Todo.findById(req.params.id)
    todos=await Todo.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({
        Sucess:true,
        message:"Todo deleted",
        todo
    })
})

app.listen(port, ()=> console.log(`Server started on port ${port}`));






