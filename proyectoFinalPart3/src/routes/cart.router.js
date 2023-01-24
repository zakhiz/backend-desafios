import { Router } from "express";
import cartController from "../controller/cart.controller.js";
import {loginMd} from "../middleware/loginMd.middleware.js";
const router = Router();

router.post("/",loginMd,cartController.createCart);


export default router;
