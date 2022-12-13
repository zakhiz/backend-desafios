import { Router } from "express";
import { generateProduct } from "../utils/mocks.js";
const router = Router();

router.get('/test',(req,res)=>{
    let products = [];
    for (let i = 0; i < 5; i++) {
        products.push(generateProduct());
    }
    res.send({status : 'success' , payload : products});        
});

export default router;
