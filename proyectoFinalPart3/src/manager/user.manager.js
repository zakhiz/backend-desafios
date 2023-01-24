import userModel from "../models/userModel.js";

class UserManager {
  constructor() {
    this.model = userModel;
  }

  getAll = async () => {
    return await this.model.find({});
  };

  getById = async (id) => {
    return await this.model.findById(id);
  };
  
  deleteById = async (id) => {
    await this.model.deleteById(id);
  };

  updateById = async (id, userUpdate) => {
    await this.model.findByIdAndUpdate(id, productUp);
  };
}

export default UserManager;
