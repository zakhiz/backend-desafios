import express from 'express';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.use('/api/products',productRouter);
app.use('/api/cart',cartRouter);

const server = app.listen(PORT ,console.log(`listening in ${PORT}`));