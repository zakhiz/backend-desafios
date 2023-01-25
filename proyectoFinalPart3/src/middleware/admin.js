import  Jwt  from "jsonwebtoken";
import config from "../config/config.js";
import userModel from "../DAO/models/userModel.js";
export const viewAdmin = async (req, res, next) => {
    let token = req.headers['cookie']
    if(!token){
        return res.render('notlogin')
    }
    let tokenized = req.cookies.itZ2zXYh6X
    const decoded = Jwt.verify(tokenized,config.jwt.SECRET)
    const isadmin = await userModel.find({role : decoded.role})
    if(isadmin[0].role === "admin"){
        next()
    }else{
        res.render('accessdenegate')
    }
    
};
