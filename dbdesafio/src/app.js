import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import __dirname from "./utils.js";
import ContainerSQL from "./managers/containerSQL.js";
import sqliteOptions from './dbs/knex.js'

const app = express();

//! MIDDLEWARES
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req,res,next)=>{
    next();
});

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).send("something it's wrong!");
});

//TODO Handlebars
app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');


//TODO SERVER
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = new Server(server);

const productsSQL = new ContainerSQL(sqliteOptions, "products")

app.get("/", (req, res) => { 
    res.render("home")
});

const messagesSQL = new ContainerSQL(sqliteOptions, "messages")

io.on('connection', async (socket) =>{

    
    io.emit('products',await productsSQL.getAll());
    
    io.emit("messages", await messagesSQL.getAll());

    socket.on('product',async product =>{
        productsSQL.save(product)
        const dbProducts = await productsSQL.getAll();
        io.emit('products', dbProducts);
    });
    socket.on('message',async messages =>{
        messagesSQL.save(messages);
        const dbMessages = await messagesSQL.getAll();                                            
        io.emit('messages',dbMessages);
    })
})