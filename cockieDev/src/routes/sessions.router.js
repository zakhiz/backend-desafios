import { Router } from "express";
import passport from "passport";

const router = Router();
router.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/failedregister'}),async(req,res)=>{
    const user = req.user;
    res.send({status:"success",payload:user._id})
})

router.get('/failedregister',(req,res)=>{
    res.status(500).send({status:"error",error:"Error de registro"})
});

router.get('/failedlogin',(req,res)=>{
    res.status(500).send({status:"error",error:"Error de login"})
});

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/failedlogin'}),async (req,res)=>{
    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        role: req.user.role
    }
    res.send({status:"success", message:"Logueado!"})
});

router.get('/github',passport.authenticate('github'),(req,res)=>{
    //! este primer punto, Abre la aplicacion de github para solicitar los datos.
})
router.get('/githubcallback',passport.authenticate('github'),(req,res)=>{
    //! este segundo , Toma los datos que haya dado github con passport
    req.session.user = {
        name: `${req.user.first_name}`,
        email: req.user.email,
        role: req.user.role
    }
    res.send({status:"success", message:"Logueado!"})
})

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