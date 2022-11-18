import {Router} from 'express';
import UsersManager from '../managers/users.manager.js';
const router = Router();
const userservice = new UsersManager();

router.get('/' ,(req,res) =>{
    res.render('home')
})

router.get('/users',async(req,res) =>{
    const users = await userservice.getUsers();
    res.render('users',{
        name : "sol",
        users
    });
})

export default router;