import express from 'express';
import __dirname from './utils.js';
import productRouter from './routes/products.router.js';
import handlebars from 'express-handlebars';

//! express
const app = express();
//! archivo css
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(`${__dirname}/public`));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

//! HandleBars 
app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine', 'handlebars');

//! router
app.use('/',productRouter);
//! express
const server = app.listen(8080,()=> console.log('Ready'));