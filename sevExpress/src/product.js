const Container = require('./app');
const express = require('express');

 
const app = express();
const server = app.listen(8080,()=>{
    console.log('ready');
})

const productos = new Container('./src/products.json');

app.get('/product',async(req,res)=>{
     const mostrarP = await productos.getAll();
     res.send(mostrarP);
});


app.get('/productrandom',async(req,res)=>{
    const products = await productos.getAll();
    const numeroRandom = Math.floor(Math.random() * products.length);
    res.send(products[numeroRandom]);
})


