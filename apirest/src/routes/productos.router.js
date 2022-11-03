import { Router } from "express"; 
import Container from "../Container.js";
import uploader from "../services/upload.js";

const router = Router(); 

const container = new Container("products");

router.get("/", async (req, res) => {
    const result = await container.getAll()
    res.send({ result })
})

router.get("/:idP", async (req, res) => { 
    const { idP } = req.params;
    const result = await container.getById(parseInt(idP));
    if (result === null) {
        res.send({ error: "product not found"});
    } else {
        res.send({ result });
    }   
})

router.post("/", uploader.single("image"), async (req, res) => {
    const product = req.body;
    if (req.file) {
        product.image = `${req.protocol}://${req.hostname}:8080/images/${req.file.filename}`;
        const result = await container.save(product);
        res.send({ status: "sucess", message: "product added", result });

    } else if (product.image) { 
        const result = await container.save(product);
        res.send({ status: "sucess", message: "product added", result });
    } else {
        res.send({ error: "data entered incorrectly"});
    }
})
router.put("/:idP", uploader.single("image"), async (req, res) => {
    const { idP } = req.params;
    const product = req.body;
    
    const data = await container.getAll();

    if (data.some(obj => obj.id == idP)) {
        if (req.file) {
            product.image = `${req.protocol}://${req.hostname}:8080/images/${req.file.filename}`
            const objUp = {
                title: product.title,
                price: product.price,
                image: product.image,
                id: parseInt(idP)
            }
            await container.update(objUp, idP)
            res.send({ status: "sucess", message: `product con id ${idP} 
            updated`})
        
        } else if (product.image) { 
            await container.update(product, idP)
            res.send({ status: "sucess", message: `product con id ${idP} updated`});
        
        } else {
            res.send({ error: "data entered incorrectly"});
        }
    } else {
        res.send({ error: "product not found"});
    }
})

router.delete("/:idP", async (req, res) => { 
    const { idP } = req.params;
    const data = await container.getAll();
    if (data.some(obj => obj.id == idP)) { 
        await container.deleteById(parseInt(idP));
        res.send({ status: "sucess", message: `product with id ${idP} removed` });
    } else {
        res.send({ error: "product not found"});
    }
})

export default router;
