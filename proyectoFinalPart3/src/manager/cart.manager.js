import cartModel from "../models/cartModel.js";
import Jwt from "jsonwebtoken";
import config from "../config/config.js";
import userModel from "../models/userModel.js";
class CartProd {
  constructor() {
    this.model = cartModel;
  }

  //! obtienes todos los carrito
  getAll = async () => {
    return await this.model.find({});
  };

  //! obtenes un carrito por su id
  getById = async (id) => {
    const cart = await this.model.find({ _id: id });
    if (!cart) return "Cart not found";
    return cart;
  };

  //! crear un carrito
  create = async () => {
    try {
      const newCart = await this.model.create({
        products: [],
      });
      return newCart._id.valueOf;
    } catch (error) {
      return { error: "cart not stored" };
    }
  };

  //! agregar un producto en el array de carrito
  addProductInCart = async (product) => {
    let tokenized = req.cookies.itZ2zXYh6X;
    const decoded = Jwt.verify(tokenized, config.jwt.SECRET);
    let cid = await userModel.find({ idCart: decoded.idCart });
    cid = cid[0].idCart
        
    };
  //! actualizar carrito
  updateByID = async (id, cartUpdate) => {
    const updateData = await this.model.findByIdAndUpdate(id, cartUpdate);
    return `upgraded product ${updateData}`;
  };

  //! eliminar un producto segun su id
  deleteById = async (id) => {
    const arrayclean = {
      products: [],
    };
    await this.model.findByIdAndUpdate(id, arrayclean);
    return `cart clean ${id}`;
  };
}

export default CartProd;
