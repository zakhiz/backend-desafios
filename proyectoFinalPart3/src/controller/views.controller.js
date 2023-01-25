import ProductManager from "../DAO/manager/product.manager.js";
import Jwt from "jsonwebtoken";
import config from "../config/config.js";
import userModel from "../DAO/models/userModel.js";

const prodManager = new ProductManager();
const login = (req, res) => {
  res.render("login");
};
const register = (req, res) => {
  res.render("register");
};
const products = async (req, res) => {
  const product = await prodManager.getAll();
  let newProducts = [];
  for (let i = 0; i < product.length; i++) {
    newProducts.push({
      _id: product[i]._id,
      model: product[i].model,
      characteristics: product[i].characteristics,
      stock: product[i].stock,
      price: product[i].price,
      patent: product[i].patent,
      image: product[i].image,
    });
  }
  res.render("products", { newProducts });
};

const addproducts = (req, res) => {
  res.render("addproduct");
};

const cartShopping = async (req, res) => {
  let tokenized = req.cookies.itZ2zXYh6X;
  const decoded = Jwt.verify(tokenized, config.jwt.SECRET);
  const user = await userModel.findById(decoded.id);
  const iduser = JSON.stringify(user._id);
  const cartuser = await userModel.findById(JSON.parse(iduser));
  const infoUser =[]
  infoUser.push({
    _id : cartuser._id
  })
  let cart = cartuser.cart;
  let newCart = [];
  for (let i = 0; i < cart.length; i++) {
    newCart.push({
      model: cart[i].model,
      price: cart[i].price,
      image: cart[i].image,
    });
  }
  res.render("cartShopping", { newCart ,infoUser });
};
const profile = async (req, res) => {
  let tokenized = req.cookies.itZ2zXYh6X;
  const decoded = Jwt.verify(tokenized, config.jwt.SECRET);
  const user = await userModel.findById(decoded.id);
  const newUser =[]
  newUser.push({
    first_name : user.first_name,
    last_name : user.last_name,
    avatar : user.avatar,
    age : user.age,
    phone_number : user.phone_number
  })
  res.render("profile", { newUser });
};
export default {
  login,
  register,
  products,
  addproducts,
  cartShopping,
  profile,
};
