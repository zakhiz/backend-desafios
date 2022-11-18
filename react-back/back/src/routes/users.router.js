import {Router} from 'express';

const users= [];

const router = Router();

router.get('/',(req,res)=>{
     res.send({status : 'success',payload: users});

});

router.post('/',(req,res)=>{

})

export default router;