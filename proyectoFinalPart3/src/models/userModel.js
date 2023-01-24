import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  age: Number,
  phone_number: Number,
  address: String,
  avatar: String,
  role: {
    type: String,
    default: "user",
  },
  idCart: Number,
});
const userModel = mongoose.model(collection, schema);

export default userModel;
