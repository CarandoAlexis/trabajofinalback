import { Router } from "express";
import Product from "../dao/models/products.model.js";
import authMdw from "../middleware/auth.middleware.js";
import ViewController from "../controllers/views.controller.js";
import loged from '../middleware/loged.middleware.js';

const router = Router();
const viewController = new ViewController();

router.get("/products", viewController.renderProductList);

router.get("/login", loged, viewController.renderLogin);

router.get("/register", viewController.renderRegister);

router.get("/profile", authMdw, viewController.renderProfile);

export default router;
