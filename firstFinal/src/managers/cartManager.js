import { json } from 'express';
import fs, { existsSync } from 'fs';
import __dirname from "../utils.js";

export default class CartManager{
    constructor(){
        this.path = `${__dirname}/files/cart.json`;
        this.init(); 
    };

    init = async () =>{
        if(!existsSync(this.path)) await fs.promises.writeFile(this.path,JSON.stringify([]));
    };

    readFile = async () =>{
        const data = await fs.promises.readFile(this.path,'utf-8');
        return JSON.parse(data);
    };

    getCarts = () =>{
        return this.readFile();
    };

    getCartsById = async(id)=>{
        const carts = await this.readFile();
        const cart = carts.find(ct => ct.id === id);
        return cart;
    };

    exists = async (id)=>{
        const carts = await this.readFile();
        return carts.some(ct => ct.id === id);
    };

    addCart = async()=>{
        const carts = await this.readFile();
        const newCart = {
            timestamp : Date.now(),
            id : carts.length=== 0 ? 1 : carts[carts.length - 1].id + 1,
            products : []
        };
        carts.push(newCart);
        await fs.promises.writeFile(this.path,JSON.stringify(carts,null,'\t'));
        return newCart;
    };

    saveProductInContainer = async(cid,pid)=>{
        const carts = await this.readFile();
        const newCarts = carts.map(contCarrito =>{
            if (contCarrito.id === cid) {

                if (!contCarrito.products.some(p => p.id === pid)) { // Si el id (el pid) no está en products
                    contCarrito.products.push({ // Lo agregas por primera vez
                        id : pid,
                        quantity : 1
                    });
                } else {
                    const newProducts = contCarrito.products.map(elemento => {
                        if (elemento.id == pid) {
                            elemento.quantity++;
                        };
                        return elemento;
                    });

                    contCarrito.products = newProducts;
                };
            };
            return contCarrito;
        });
        await fs.promises.writeFile(this.path,JSON.stringify(newCarts, null, '\t'));
    };
    
    deleteCartById = async (id) =>{
        let carts = await this.getCarts();
        console.log(carts);

        let newCart = carts.map(obj => {
            if(obj.id === id){
                obj.products = []
            };
            return obj
        });
        newCart = JSON.stringify(newCart,null,'\t')
        console.log(newCart);
        await fs.promises.writeFile(this.path,newCart);
    };
    
    deleteProductById = async(cid,pid)=>{
        let contremove = false;
        let carts  = await this.getCarts();
        let newCart = carts.map(obj =>{
            if(obj.id === cid){
                if(obj.products.some(prod => prod.id === pid)){
                    const indexCont = obj.products.findIndex(prodt => prodt.id === pid);
                    obj.products.splice(indexCont,1);
                    
                    contremove = true;
                }
                return obj;
            }
        });
        newCart = JSON.stringify(newCart,null,'\t')
        await fs.promises.writeFile(this.path,newCart);
        return contremove;
    } 


}