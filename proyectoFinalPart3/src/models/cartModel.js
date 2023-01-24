import mongoose from "mongoose";

const collection = "Carts";

const schema = new mongoose.Schema({
  products: Array,
  price: Number,
  quantity: Number,
});
const cartModel = mongoose.model(collection, schema);

export default cartModel;
