import express from "express";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import ContenedorSQL from "./Managers/ContenedorSQL.js";
import sqliteOptions from "./dbs/knew.js";
import handlebars from 'express-handlebars';
import viewProducts from './routes/views.productos.routes.js';



const app = express();

const PORT = process.env.PORT || 8080; 
const server = app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${server.address().port}`));

const io = new Server(server) 

server.on("error", error => console.log(error)); 

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.json()); 
app.use(express.urlencoded({ extended:true })); 

app.use(express.static(__dirname + "/public")); 

app.use('/',viewProducts);

const productsSQL = new ContenedorSQL(sqliteOptions, "products")

let mensajes = [];

const messagesSQL = new ContenedorSQL(sqliteOptions, "messages")

messagesSQL.getAll().then(response => mensajes = response) 


io.on("connection", async socket => {

    io.emit("enviarProducts", await productsSQL.getAll())

    socket.emit("enviarMensajes", mensajes) 

    socket.on("message", data => { 
        mensajes.push(data)
        io.emit("enviarMensajes", mensajes) 
        messagesSQL.save( data ).then(res => res) 
    })

    socket.on("autenticado", data => {
        socket.broadcast.emit("newUserConnected", data) 
    })
})
