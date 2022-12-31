import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import registerRouter from './routes/sessions.router.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import config from "./config/config.js";
import {fork} from 'child_process';
const app = express();


const connection = mongoose.connect(`mongodb+srv://CodeTest:${config.mongo.password}@codercluster.4kgfcft.mongodb.net/${config.mongo.db}?retryWrites=true&w=majority`);


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine' , 'handlebars');



app.use(session({
    store : MongoStore.create({
        mongoUrl : `mongodb+srv://CodeTest:${config.mongo.password}@codercluster.4kgfcft.mongodb.net/${config.mongo.db}?retryWrites=true&w=majority`,
        ttl : 3600
    }),
    secret : 'coderArts',
    saveUninitialized : false,
    resave : false
}));

app.get("/info", async (req, res) => {
    const info = {
        argInit: process.argv.slice(2),
        System: process.platform,
        Version: process.version,
        MemoryTotal: process.memoryUsage(),
        pathEjec: __dirname,
        processId: process.pid,
        carpeta: process.cwd()
    }
    res.render("info", { info })
})

app.get("/api/randoms",(req,res) => {
    const {cant} = req.query
    let childCant = fork(__dirname+'/fork/calculo.pesadito.js')
    childCant.send({cant})
    childCant.on('message',e =>{
        let newObj = e
        res.send({status : 'success', payload : newObj})
    })
})




initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.static(__dirname+'/public'))

app.use('/',viewsRouter);
app.use('/api/sessions',registerRouter);

app.listen(8080, () => console.log('listening'));