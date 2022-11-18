import { Router } from "express";
import CartManager from "../managers/cartManager.js";
import ProductManager from "../managers/productsManager.js";

const router = Router();

const cartService = new CartManager();
const productsService = new ProductManager();

//todo trae todos los carritos
router.get('/',async(req,res)=>{
    const carts = await cartService.getCarts();
    res.send({status : 'success',payload: carts});
});

//todo trae un carrito en especial
router.get('/:cid',async(req,res)=>{
    const {cid} = req.params;
    const id = parseInt(cid);
    const cart = await cartService.getCartsById(id)
    res.send({status : 'success',payload : cart});
});
//todo crea un carrito con una id y una coleccion de productos
router.post('/',async(req,res)=>{
    const result = await cartService.addCart();
    res.send({status: 'success', message : 'cart added'});
});

//todo Agrega un producto particular en un carrito en particular
router.post('/:cid/products/:pid',async(req,res)=>{
    const {cid,pid} = req.params;
    const cartId = parseInt(cid);
    const productId = parseInt(pid);
    const existsCart = await cartService.exists(cartId);
    const existsProduct = await productsService.exists(productId);
    if(!existsCart) return res.status(404).send({status : 'error',error : `cart id :${cartId} not found`});
    if(!existsProduct) return res.status(404).send({status : 'error', error : `Product id : ${productId} not found`});
    const result = await cartService.saveProductInContainer(cartId,productId);
    res.send({status : 'success',payload : result});
});

//todo elimina un carrito segun su id
router.delete('/:cid',async(req,res)=>{
    let {cid} = req.params;
    cid = parseInt(cid);
    const carts = await cartService.getCarts();
    if(carts.some(ct => ct.id === cid )){
        await cartService.deleteCartById(cid)
        res.send({status : 'success',message : `cart id : ${cid} removed`});
    }; 
});

//todo vacia el array de productos segun su id

router.delete("/:cid/products/:pid", async (req, res) => { // Vacía un carrito según su id
    let { cid, pid } = req.params;
    cid = parseInt(cid)
    pid = parseInt(pid)

    const carritoId = await cartService.getCartsById(cid)
    
    if (carritoId === null) {
        res.status(404).send({ status: "error", error: "Cart not found" })
    
    } else {
        const borrado = await cartService.deleteProductById(cid, pid)
        if (borrado) {
            res.send({ status: "success" })
        } else {
            res.status(404).send({ status: "error", error: "Product not found in cart" })
        }
        
    }
})



export default router;