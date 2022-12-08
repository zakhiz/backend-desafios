import mongoose from "mongoose";

const collection = 'Products';

const schema = new mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    thumbnail : {
        type : String,
        require : true
    },
    stock : {
        type : Number,
        require : true
    },
    price : {
        type : Number,
        require : true
    }
});

const productModel = mongoose.model(collection,schema);

export default productModel;