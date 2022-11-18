import express from 'express';
import __dirname from './utils.js'
const app = express()
app.set('views', __dirname+'/views');
app.set('view engine','pug');
app.get('/',(req,res)=>{
    res.render('hello.pug');
    message : "esta es mi primera pagina con pug :D"
})
const server = app.listen(8080, ()=> console.log('listen'))