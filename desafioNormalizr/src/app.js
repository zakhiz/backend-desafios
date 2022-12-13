import express from "express";
import productsRouterGenerator from './routes/products.router.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import "./mongoconect.js";
import ContainerChat from "./manager/managerChat.js";
import { normalize, schema } from "normalizr";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({extended : true}));

const serviceChat = new ContainerChat()

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use('/api/products',productsRouterGenerator);

const server = app.listen(PORT , () => console.log(`Listening in ${PORT}`));
const io = new Server(server);


const normalizate = async () =>{

    const msn = await serviceChat.getAll();

    const author = new schema.Entity('author');

    const mensaje = new schema.Entity('mensaje',{
        author : author
    },
    {
        idAttribute : "_id"
    }
    );
    
    const mensajesEntity = new schema.Entity('msg',{
        mensajes : [mensaje]
    });
    
    let ContMsn = {
        id : "msj",
        mensaje : msn
    }

    let normalizeData = normalize(ContMsn,mensajesEntity);


    return normalizeData
}

app.get('/api/mensajes/normalizr', async (req,res)=>{
    res.send(await normalizate());
})

app.get('/',(req,res)=>{
    res.render('chatForm')
});
io.on('connection', async (socket)=>{
    socket.on('message',async messages => {
        serviceChat.save(messages)
    })
})
