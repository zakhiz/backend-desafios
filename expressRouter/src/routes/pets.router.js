import { Router } from "express";

const router = Router();

const pets = []

router.get('/',(req,res)=>{
    res.send({pets})
});


router.post('/',(req,res)=>{
   
});

router.put('/',(req,res)=>{
    
});

router.delete('/',(req,res)=>{
    
});
export default router;