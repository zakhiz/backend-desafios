import {Router} from 'express';
const router = Router();

let products = [];

router.get('/',(req,res)=> res.render('products',{products}));

router.get('/products',(req,res)=> res.render('FormProduct'));

router.post('/products',(req,res)=>{
    const {name, price, image} = req.body
    products.push({
        name,
        price,
        image
    });
    res.render('FormProduct');
});

export default router;