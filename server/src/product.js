import express from 'express';
import moment from 'moment';

const app = express();

const server = app.listen(8080,()=>{
    console.log("listening on express");
})

//! endpoints

let contador = 0 ;

app.get('/', (req,res) => {
    res.send('<h1 style = "color : blueviolet;" >Bienvenido al servidor backend</h1>') 
})


app.get('/visitas', (req,res) => {
    contador++;
    res.send(`la pagina tiene esta cantidad de visitas ${contador}`); 
});

app.get('/fyh', (req,res) => {
    res.send({fyh : moment().format('DD/MM/YYYY hh:mm:ss')}); 
});

//! req.query SOLO se utiliza con el signo de ? 
app.get('/saludar', (req,res)=>{
    const {nombre = "usuario" , edad} = req.query;
    console.log(req.query);
    res.send(`hola ${nombre} tienes ${edad} años`)
})

const users = [
    {id:1,nombre: "julieta", edad : 26},
    {id:2,nombre: "seba", edad : 26},
    {id:3,nombre: "matias", edad : 26},
]


app.get('/users',(req,res)=>{
    res.send({users});
});
//! req.params
app.get('/users/:userId',(req,res)=>{
    const id = parseInt(req.params.userId);
    console.log(typeof id);
    const filter = users.filter(u => u.id==id);
    if(filter[0]){
        res.send({user:filter[0]});
    }else{
        res.send({status : "error",message : "no encontre el usuriario"});
    }
})

//! el req.query lo vamos a utilizar para mas datos ,y segundo para datos mas opciones 

//! req.params es para poner una caracter mas estricto a la ruta

