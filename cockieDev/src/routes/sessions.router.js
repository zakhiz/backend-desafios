import { Router } from "express";
import userModel from '../models/User.js';
const router = Router();
router.post('/register',async(req,res)=>{
    const {first_name,last_name,email,password} = req.body;
    if(!first_name || !last_name || !email || !password) return res.status(400).send({status : 'error', error : 'incomplete values'});
    const exists = await userModel.findOne({email});
    if(exists) return res.status(400).send({status : 'error', error : 'user exists'});
    const user = {
        first_name,
        last_name,
        email,
        password
    };
    const result = await userModel.create(user);
    res.send({status : 'success', payload : result._id});
})

router.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password) return res.status(400).send({status : 'error', error : 'incomplete values'});
    const user = await userModel.findOne({email,password});
    if(!user) return res.status(400).send({status : 'error' , error : 'user o contraseña incorrecto'});
    req.session.user = {
        first_name : user.first_name,
        last_name : user.last_name,
        email : user.email,
        role : user.role
    }
    res.send({status :'success',message: 'logueado'});

});

router.get('/user', (req,res) =>{
    return res.send(req.session.user)
});

router.get("/logout", async (req, res) => {
    req.session.destroy(err=>{
        if(err) return res.status(500).send("logout error")
    });
    res.send('logout');
});


export default router;