import {Router} from 'express';
import UsersManager from '../managers/users.manager.js'; 

const router = Router();
const userService = new UsersManager();


router.get('/' ,async(req,res)=>{
    const users = await userService.getUsers();
    res.send({users});
});

router.post('/', async (req,res)=>{
    const {name,email,age} = req.body;
    if(!name||!email||!age)return res.status(400).send({status : "error" ,error : "incomplete value"});
    const user = {
        name,
        email,
        age
    };
    let result = await userService.saveUser(user);
    res.send({status : "success" , payload : result});
});

export default router;