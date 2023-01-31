import  Jwt  from "jsonwebtoken";
import config from "../config/config.js";
import { userService } from "../services/repositories/services.js";
// import userModel from "../DAO/models/userModel.js";
export const loginMd = async (req, res, next) => {
    try {
        let token = req.headers['cookie']
        if(!token){
        return res.render('notlogin')
        }
        let tokenized = req.cookies.itZ2zXYh6X
        const decoded = Jwt.verify(tokenized,config.jwt.SECRET)
        const user = await userService.getById(decoded.id);
        if(user.id === decoded.id){
            next()
         }
    } catch (error) {
        res.redirect('/')
    }
   
};
