import express from 'express';
import userRouters from './routes/users.router.js'
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const server = app.listen(8080,()=> console.log('listen'));

app.use('/api/users', userRouters);