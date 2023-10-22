import { Router } from "express";
import { addProductToCart, createCartForUser , getCartContents , purchaseCart , editCartItemQuantity, removeProductFromCart } from '../controllers/carts.controller.js';
import { checkAdminRole } from "../middleware/role.middleware.js";
import authMdw from "../middleware/auth.middleware.js";

const router = Router();

router.get('/:cartId', authMdw, checkAdminRole, getCartContents);
router.post('/create', authMdw, checkAdminRole, createCartForUser);
router.put('/:cartId/add/:productId', authMdw, checkAdminRole, addProductToCart);
router.put('/:cartId/edit/:productId', authMdw, checkAdminRole ,editCartItemQuantity);
router.post('/:cartId/purchase', authMdw, checkAdminRole, purchaseCart);
router.delete('/:cartId/remove/:productId', authMdw, checkAdminRole ,removeProductFromCart);

export default router;