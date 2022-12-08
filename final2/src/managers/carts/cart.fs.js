import fs from 'fs';
import __dirname from '../../utils.js';

export default class containerCartfs{
    constructor(){
        this.path = `${__dirname}/files/cart.json`;
        this.init(); 
    };

    init = async () =>{
        if(!fs.existsSync(this.path)){ 
            await fs.promises.writeFile(this.path,JSON.stringify([]));
        }
    };

    readFile = async () =>{
        const data = await fs.promises.readFile(this.path,'utf-8');
        return JSON.parse(data);
    };

    getAll = () =>{
        return this.readFile();
    };

    getById = async(id)=>{
        const carts = await this.readFile();
        const cart = carts.find(ct => ct.id === id);
        return cart;
    };

    exists = async (id)=>{
        const carts = await this.readFile();
        return carts.some(ct => ct.id === id);
    };
    existsCart =  () =>{
         fs.existsSync(this.path);
    }

    create = async()=>{
        const carts = await this.getAll();
        const newCart = {
            timestamp : Date.now(),
            id : carts.length=== 0 ? 1 : carts[carts.length - 1].id + 1,
            products : []
        };
        carts.push(newCart);
        await fs.promises.writeFile(this.path,JSON.stringify(carts,null,'\t'));
        return newCart;
    };

    //! agregar un producto al carrito
    addProductInCart = async(cid,pid)=>{
        const carts = await this.getAll();
        let products = carts.find(elem => elem.id == cid).products
        if(products.some(prod => prod.id == pid)){
            products = products.map(p => {
                if(p.id === pid){
                    p.quantity++;
                }
                return p
            })
        }else{
            products.push({
                id:pid,
                quantity : 1
            })
        }
        await fs.promises.writeFile(this.path,JSON.stringify(carts, null, '\t'));
        return 'added product'
    };
    
    deleteById  = async (id) =>{
        let carts = await this.getCarts();
        let newCart = carts.map(obj => {
            if(obj.id === id){
                obj.products = []
            };
            return obj
        });
        newCart = JSON.stringify(newCart,null,'\t')
        await fs.promises.writeFile(this.path,newCart);
        return `Cart clean ${newCart.id}`
    };
    
    

}