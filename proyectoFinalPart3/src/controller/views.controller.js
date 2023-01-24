import ProductManager from "../manager/product.manager.js";
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
export default {
  login,
  register,
  products,
  addproducts,
};
