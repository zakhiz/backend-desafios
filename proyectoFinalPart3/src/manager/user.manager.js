import userModel from "../models/userModel.js";

class UserManager {
  constructor() {
    this.model = userModel;
  }

  getAll = async () => {
    return await this.model.find({});
  };

  getById = async (id) => {
    return await this.model.findById({_id : id});
  };
  
  deleteById = async (id) => {
    await this.model.deleteById(id);
  };

  updateById = async (id,cartUp) => {
     await this.model.updateOne({_id: id}, {$set: { cart : cartUp}})
  };
}

export default UserManager;
