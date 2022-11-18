import express from 'express';
import userRouter from './routes/users.router.js';
import petRouter from './routes/pets.router.js';
import __dirname from './utils.js'
const app = express();

const server = app.listen(8080, () => console.log('Ready'));

// app.use((req,res,next)=>{
//     console.log('peticion recibida');
//     if(!req.query.name) return res.send("error") 
//     next();
// })

app.use(express.json());
app.use(express.static(__dirname+'/public'));

app.use('/api/users',userRouter);
app.use('/api/pets',petRouter);

app.get('/',(req,res)=>{
     res.send({message : "ok"});
});

//! Middleware



