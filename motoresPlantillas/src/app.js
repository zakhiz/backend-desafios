import express from 'express';
import handlebars from 'express-handlebars';
import userRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import __dirname  from './utils.js';

const app = express();

//! motor de pantillas

//!registro del motor
app.engine('handlebars', handlebars.engine());
//!conectar con la carpeta de vistas
app.set('views',__dirname+'/views')
//! activo el motor registrado
app.set('view engine','handlebars');

app.use(express.json());

app.use('/', viewsRouter);
app.use('/api/users',userRouter);













const server = app.listen(8080 , () => console.log('listen'));

