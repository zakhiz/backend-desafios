//Todo Managers Products
//! fs
import ProductManager from "./products/products.fs.js";
//! mongo
import containerProduct from "./products/products.mongo.js";

//todo Managers Carts
//!fs
import containerCartfs from "./carts/cart.fs.js";
//! mongo
import ContainerCart from "./carts/cart.mongo.js";
//! mongoose
import mongoose from "mongoose";

const persistenceSwitch = 2

let persistence
 
if(persistenceSwitch == 1){
   persistence = 'filesystem';
} else if (persistenceSwitch == 2){
   persistence = 'mongo';
}
let containerProd 
let containerCartProd

if(persistence == 'filesystem'){
    containerProd = ProductManager;
    containerCartProd = containerCartfs;   
} else if(persistence == 'mongo'){
    containerProd = containerProduct;
    containerCartProd = ContainerCart;
    const nameDB = 'CartsAndProducts'
    const connection = mongoose.connect(`mongodb+srv://CodeTest:123@codercluster.4kgfcft.mongodb.net/${nameDB}?retryWrites=true&w=majority`);
};

export {containerProd,containerCartProd};