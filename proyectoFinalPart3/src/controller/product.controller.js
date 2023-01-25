import ProductManager from "../DAO/manager/product.manager.js";

const prodManager = new ProductManager();

const getAll = async (req, res) => {
  const prods = await prodManager.getAll();
  res.send({status : 'success',payload : prods})
};

const getById = async (req, res) => {
  const { pid } = req.params;
  const result = await prodManager.getById(pid);
  res.send({ status: "success", payload: result });
};

const add = async (req, res) => {
  const { model, characteristics, stock, price, image } = req.body;
  if (!model || !characteristics || !stock || !price || !image)
    return res
      .status(400)
      .send({ status: "error", error: "incomplete values" });

  const newProduct = {
    model,
    characteristics,
    stock,
    price,
    image,
  };
  const result = await prodManager.add(newProduct);
  res.send({ status: "success", payload: result });
};

const update = async (req, res) => {
  const { pid } = req.params;
  const products = await prodManager.getAll();

  const { model, characteristics, stock, price, image } = req.body;

  if (!model || !characteristics || !stock || !price || !image)
    res.status(400).send({ status: "error", error: "incomplete values" });

  const productUpdate = {
    model,
    characteristics,
    stock,
    price,
    image,
  };
  productUpdate.Date.now();

  if (products.some((obj) => obj.id == pid)) {
    const result = await prodManager.updateById(pid, productUpdate);
    res.send({ status: "success", payload: result._id });
  }
};

const deleteById = async (req, res) => {
  const { pid } = req.params;
  const productDel = await prodManager.getAll();
  if (productDel.some((obj) => obj.id == pid)) {
    const result = await prodManager.deleteById(pid);
    res.send({ status: "success", payload: result._id });
  }
};

export default {
  getAll,
  getById,
  add,
  update,
  deleteById,
};
