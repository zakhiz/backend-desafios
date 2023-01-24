import CartProd from "../manager/cart.manager.js";

const cartserv = new CartProd();

const createCart = async (req, res) => {
  const {added} = req.body;
  console.log(added);
  if (added === true) {
    const newCart = {
      price: 0,
      quantity: 0,
    };
    const result = await cartserv.create(newCart)
    res.send({status : "succes", payload : result._id})
  }
};

export default {
    createCart
}