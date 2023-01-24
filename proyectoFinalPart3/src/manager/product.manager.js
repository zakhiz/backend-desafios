import productModel from "../models/productModel.js";
import { codeAlt } from "../functions/code.js";

class ProductManager {
  constructor() {
    this.model = productModel;
  }

  getAll = async () => {
    return await this.model.find({});
  };

  getById = async (id) => {
    return await this.model.findById({_id : id});
  };
  add = async (product) => {
      product.patent = codeAlt(6);
      const result = await this.model.create(product);
      return {status : 'succes',payload : result}
  };

  deleteById = async (id) => {
    await this.model.deleteById(id);
  };

  updateById = async (id, productUp) => {
    await this.model.findByIdAndUpdate(id, productUp);
  };
}

export default ProductManager;
