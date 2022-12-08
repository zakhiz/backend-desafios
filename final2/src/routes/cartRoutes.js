import { Router } from "express";
import { containerCartProd } from "../managers/daos.js";
const router = Router();

const containercart = new containerCartProd();

router.get('/',async (req,res) => {
    const result = await containercart.getAll()
    res.send({status : 'success',payload : result}); 
});

router.get('/:cid/products', async (req,res)=>{
    const { cid } = req.params;
    const result = await containercart.getById(cid); //todo cambiar el cid por id  en fs
    res.send({status : 'success', payload : result});
});
 
router.post('/', async (req,res)=>{
    const result = await containercart.create();
    res.send({status : 'success',payload : result});
});

router.post('/:cid/products/:pid', async (req,res)=>{
    let {cid,pid} = req.params;
    await containercart.addProductInCart(cid,pid);
    res.send({status : 'success'});
});

router.delete('/:cid',async (req,res)=>{
    const {cid} = req.params;
        await containercart.deleteById(cid);
        res.send({status : 'success',message : `clean cart id : ${cid}`});
});

export default router;