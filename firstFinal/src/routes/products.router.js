import { Router } from "express";
import ProductManager from '../managers/productsManager.js'
const router = Router();
const productsService = new ProductManager();

let admin = true; //todo valor booleano define si tiene o no permisos
let numeros = "0123456789";
let letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
let simbolos = ".?%·&'´çÇ:_[{}]><!&/)=¡¿";
let all = numeros + letras + simbolos;

const codeAlt = (long)=>{
    let password = "";  
    for(let i = 0 ; i<long; i++){
        let aleatorio = Math.floor(Math.random()* all.length);
        password += all.charAt(aleatorio);  
    }
    return password
}
//! todos los productos
router.get('/',async(req,res)=>{
    let products = await productsService.getProducts();
    res.send({status : 'success',payload : products});
});
//! producto segun su id
router.get('/:pid',async(req,res)=>{
    const {pid} = req.params;
    const id = parseInt(pid);
    let product = await productsService.getProductsById(id)
    res.send({status: 'success',payload : product});
});
//! guarda el producto filtrando los datos a interes
router.post('/',async(req,res)=>{

    if (!admin) {
        return res.send({ error: -1, description: "'/api/products/1',unauthorized method" })
    }

    const {title,description,imageUrl,price,stock} = req.body;
    if( !title || !description || !imageUrl || !price || !stock) return res.status(400).send({status: 'error', error : 'Imcompleted values '});
    const productToInsert = {
        title,
        description,
        price,
        stock,
        imageUrl
    };
    productToInsert.code = codeAlt(12);
    const result = await productsService.saveProduct(productToInsert);
    res.send({status : 'success',message : 'Product added'});
});

//! actualiza un producto seleccionandolo por su id
router.put('/:pid',async(req,res)=>{
    const {pid} = req.params;
    const id = parseInt(pid);
    if (!admin) {
        return res.send({ error: -1, description: `Ruta '/api/products/${pid}', unauthorized method` })
    }
    let data = await productsService.getProducts();
    const {title,description,imageUrl,price,stock} = req.body;
    if( !title || !description || !imageUrl || !price || !stock) return res.status(400).send({status: 'error', error : 'Imcompleted values '});
    const productUpdate = {
        title,
        description,
        price,
        stock,
        imageUrl
    };
    if(data.some(obj => obj.id == id)){
        productUpdate.code = data.find(object => object.id == id).code;
        await productsService.updateProduct(id,productUpdate);
        res.send({status : 'success',message : `Product id : ${pid} Updated`});
    }
});

//! elimina un producto seleccionandolo por su id
router.delete('/:pid',async(req,res)=>{
    const {pid} = req.params;
    if (!admin) {
        return res.send({ error: -1, description: `'/api/products/${pid}', unauthorized method` })
    }
    const id = parseInt(pid);
    const products = await productsService.getProducts();
    if(products.some(prod => prod.id === id)){
        await productsService.deleteId(id);
        res.send({status : 'success',message : `Product id : ${id} 
        removed`});
    }
})

export default router;