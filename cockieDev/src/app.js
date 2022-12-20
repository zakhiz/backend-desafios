import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import registerRouter from './routes/sessions.router.js';
const app = express();

const connection = mongoose.connect('mongodb+srv://CodeTest:123@codercluster.4kgfcft.mongodb.net/galeriaDeArte?retryWrites=true&w=majority');


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine' , 'handlebars');

app.use(session({
    store : MongoStore.create({
        mongoUrl : 'mongodb+srv://CodeTest:123@codercluster.4kgfcft.mongodb.net/galeriaDeArte?retryWrites=true&w=majority',
        ttl : 3600
    }),
    secret : 'coderArts',
    saveUninitialized : false,
    resave : false
}));

app.use(express.json());
app.use(express.static(__dirname+'/public'))

app.use('/',viewsRouter);
app.use('/api/sessions',registerRouter);

app.listen(8080, () => console.log('listening'));