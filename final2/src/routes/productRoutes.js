import { Router } from "express";
import { admin } from "../middlewares/admin.js";
import {containerProd} from '../managers/daos.js';
const router = Router();

const containerProduct = new containerProd();

router.get('/', async (req,res) => {
    const result = await containerProduct.getAll();
    res.send({status : 'success',payload : result});
});

router.get('/:pid',async (req,res)=>{
    const { pid } = req.params;
    const result = await containerProduct.getById(pid);
    res.send({status : 'success', payload : result});
});

router.post('/',admin, async (req,res)=>{
    const {title,price,thumbnail,stock} = req.body;
    if(!title || !price || !thumbnail || !stock) return res.status(400).send({status : 'error',error : 'Imcompleted values'});
    const productToInsert = {
        title,
        price,
        thumbnail,
        stock
    };
    const result = await containerProduct.save(productToInsert)
    res.send({status : 'success', messagge : 'Product Added'});
});

router.put('/:pid',admin ,async (req,res)=>{

    const { pid }= req.params;

    const {title,price,thumbnail,stock} = req.body;

    const productToUpdate = {
        title,
        price,
        thumbnail,
        stock
    };
        await containerProduct.updateByID(pid,productToUpdate);
        res.send({status : 'success',messagge : `Product id : ${pid} Update`});
});

router.delete('/:pid',admin, async (req,res)=>{
    const { pid } = req.params;
        await containerProduct.deleteById(pid);
        res.send({status : 'success',messagge : `Product id : ${pid} Delete`});
})

export default router;
