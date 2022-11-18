import {Router} from 'express';

const router = Router();

router.get('/api/users',(req,res)=>{
    res.send("aqui el router")
});

router.post('/api/users',(req,res)=>{
    
});

router.put('/api/users',(req,res)=>{
    
});

router.delete('/api/users',(req,res)=>{
    
});
export default router;