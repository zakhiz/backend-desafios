import express from 'express';
import __dirname  from './utils.js';

const app = express();

app.set('views',`${__dirname}/views`);

app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const users = [];

app.get('/',(req,res)=>{
    res.render('formulario',{
        users
    });
})

app.post('/users',(req,res)=>{
    const user = req.body;
    users.push(user);
    res.redirect('/')    
})

app.get('/ejemplo',(req,res)=>{
    const users = [
        {name : "leandro",  edad: 26},
        {name : "Panchito", edad: 26},
        {name : "yesenia",  edad: 15},
    ];
    res.render('home',{
        papa : "quesito",
        users
    });
});

const server = app.listen(8080,()=> console.log('listen'));

//! buscar mas para que sirve <%= <% <%-