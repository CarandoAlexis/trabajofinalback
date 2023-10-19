
import { Router } from 'express';
import Product from '../dao/models/products.model.js';
import authMdw from '../middleware/auth.middleware.js';
import ViewController from '../controllers/views.controller.js';

const router = Router();
const viewController = new ViewController();

router.get('/products', viewController.renderProductList);

router.get("/login", viewController.renderLogin);

router.get("/register", viewController.renderRegister);

router.get("/profile", authMdw, viewController.renderProfile);

export default router;
