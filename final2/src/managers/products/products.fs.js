import fs from 'fs';
import __dirname from '../../utils.js';

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

    getAll = () =>{
        return this.readProducts();
    };

    getById = async(id) =>{
        const products = await this.readProducts();
        const product = products.find(p => p.id === id);
        return product;
    };

    exists = async(id) =>{ 
        let products = await this.readProducts();
        return products.some(prod => prod.id === id);
    };

    existsFile = () =>  fs.existsSync(this.path);  
    
    save = async({title,thumbnail,stock,price})=>{
        if(  this.existsFile()){
            try {
                let products = await this.getAll();
                let lastId,newId,newProduct;
                lastId = !products.length ? 0 : products[products.length - 1].id;
                newId = lastId + 1;
                newProduct = {
                    id : newId,
                    title,
                    price,
                    thumbnail,
                    stock
                };
                newProduct.timestamp = Date.now();
                newProduct.code = codeAlt(10);
                products.push(newProduct)
                await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'));
                return newProduct.id
            } catch (error) {
                console.log('error save :',error);
            }
        }else{
            console.log('file not found');
        }
     
    };

    updateByID = async(id,data)=>{
        let products = await this.getAll();
        let productUpdate = products.findIndex(p => p.id == id);
        products[productUpdate] = data
        await fs.promises.writeFile(this.path, JSON.stringify(products,null,'\t'));
        return `upgraded product ${products}`
    }

    deleteById = async (id)=>{
        let products = await this.getAll();
        id = parseInt(id)
        let deleteProduct = products.findIndex(p => p.id === id);
        if(deleteProduct === -1) return deleteProduct;
        products.splice(deleteProduct,1)
        await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'));
        return `Product Remove ${deleteProduct}`
    };
};