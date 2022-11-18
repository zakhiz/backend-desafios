import express from "express";
import usersRouter from './routes/users.router.js'

const app = express();
const server = app.listen(8000,()=> console.log("escuchando"));
app.use('/api/users' ,usersRouter);
app.get('/',(req,res)=>{
   res.send({message: "hola"})

})
//! user




//!pets
app.get('/api/pets',(req,res)=>{
});

app.post('/api/pets',(req,res)=>{
    
});

app.put('/api/pets',(req,res)=>{
    
});

app.delete('/api/pets',(req,res)=>{
    
});