import mongoose from "mongoose";

const collection = "Products";

const schema = new mongoose.Schema({
  model : String,
  characteristics : String,
  stock : Number,
  price : Number,
  image : String,
  patent : String


});
const productModel = mongoose.model(collection, schema);

export default productModel;
