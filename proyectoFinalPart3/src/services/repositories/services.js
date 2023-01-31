import UserRepository from "./UserRepository.js";
import ProductRepository from "./ProductRepository.js";
import Dao from '../../DAO/dao.js';

const dao = new Dao();

export const userService = new UserRepository(dao);

export const productService = new ProductRepository(dao);
