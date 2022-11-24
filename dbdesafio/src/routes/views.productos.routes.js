import { Router } from "express";
import uploader from "../services/upload.js";
import ContenedorSQL from "../Managers/ContenedorSQL.js";
import sqliteOptions from "../dbs/knew.js";

const router = Router();

router.get('/',(req,res)=>{
    res.render('home');
});

const contenedorSQL = new ContenedorSQL(sqliteOptions, "products")

router.post("/", uploader.single("image"), async (req, res) => { 
    const producto = req.body;
    producto.image = `${req.protocol}://${req.hostname}:8080/images/${req.file.filename}`
    await contenedorSQL.save(producto)
    res.redirect("/") 
})

export default router;