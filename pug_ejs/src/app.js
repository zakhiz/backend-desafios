import express from 'express';
import  __dirname from './utils.js';
const app = express();
//! no se necesita registrar el motor de plantilla para pug

//* colocar donde se va a buscar las plantillas cuidando las rutas absolutas y 
app.set('views',__dirname+'/views');

//* determinar que motor de plantillas vamos a seleccionar para nuestro renderizado
app.set('view engine','pug');

app.get('/',(req,res)=>{
    res.render('hello.pug',{
        message : "Esta es mi primera pagina con Pug :D"
    })
});

const users = [
    {name : "leandro",  edad: 26},
    {name : "Panchito", edad: 26},
    {name : "yesenia",  edad: 15},
];

app.get('/datos',(req,res) =>{
    const {min, nivel,max,titulo} = req.query; 
    res.render('data.pug',{
        min,
        max,
        nivel,
        titulo,
        users
    });
})
const server = app.listen(8080, () => console.log('listen'));