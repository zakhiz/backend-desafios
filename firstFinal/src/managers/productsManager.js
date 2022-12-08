import fs from 'fs';
import __dirname from '../utils.js';

export default class ProductManager{
    constructor(){
        this.path = `${__dirname}/files/products.json`;
        this.init();
    };

    init = async() =>{
        if(!fs.existsSync(this.path)) await fs.promises.writeFile(this.path,JSON.stringify([]));
    };

    readProducts = async () => {
        let data = await fs.promises.readFile(this.path,'utf-8');
        return JSON.parse(data);
    };

    getProducts = () =>{
        return this.readProducts();
    };

    getProductsById = async(id) =>{
        const products = await this.readProducts();
        const product = products.find(p => p.id === id);
        return product;
    };

    exists = async(id) =>{ 
        let products = await this.readProducts();
        return products.some(prod => prod.id === id);
    };    
    
    saveProduct = async(product)=>{
        let products = await this.readProducts();
        if(products.length === 0) product.id = 1;
        else product.id = products[products.length - 1].id + 1;
        products.push({...product,"timeStamp" : Date.now()});
        await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'));
    };

    updateProduct = async(id,data)=>{
        const products = await this.readProducts();
        let productUpdate = products.findIndex(p => p.id === id);
        products[productUpdate] = {...products[productUpdate],...data};
        await fs.promises.writeFile(this.path, JSON.stringify(products,null,'\t'));
    }

    deleteId = async (id)=>{
        let products = await this.readProducts();
        let deleteProduct = products.findIndex(p => p.id === id);
        if(deleteProduct === -1) return deleteProduct;
        products.splice(deleteProduct,1)
        await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'));
    };
};