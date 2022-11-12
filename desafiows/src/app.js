import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import __dirname from "./utils.js";
import viewProducts from './routes/products.router.js';
import Container from './managers/container.js';
import Chatcontainer from "./managers/chat.container.js";

const app = express();

//! MIDDLEWARES
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/',viewProducts);
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

//TODO Contructors
let arrproducts = new Container('productos');
let chatcontainer = new Chatcontainer('chat');

io.on('connection', async (socket) =>{
    console.log('User Connected');
    const arrayProduct = await arrproducts.getAll().then(res => res);   
    const arrayMessages = await chatcontainer.getMessages().then(res => res);
    
    socket.emit('products', arrayProduct);
    socket.emit('messages', arrayMessages);

    socket.on('new-product',async (data)=>{
        await arrproducts.save(data).then(res => res);
        const arrayProduct = await arrproducts.getAll().then(res => res);
        io.emit('products', arrayProduct);
    });
    
    socket.on('new-message',async(data)=>{
        await chatcontainer.saveMessages(data).then(res => res);
        const messages = await chatcontainer.getMessages().then(res=>res);
                                             
        io.emit('messages',messages);
    })
})