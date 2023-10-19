import { Router } from "express";
import { addProductToCart, createCartForUser , getCartContents , purchaseCart , editCartItemQuantity, removeProductFromCart } from '../controllers/carts.controller.js';
import { checkAdminRole } from "../middleware/role.middleware.js";

const router = Router();

router.get('/:cartId',checkAdminRole ,getCartContents);
router.post('/create',checkAdminRole ,createCartForUser);
router.put('/:cartId/add/:productId',checkAdminRole, addProductToCart);
router.put('/:cartId/edit/:productId',checkAdminRole ,editCartItemQuantity);
router.post('/:cartId/purchase',checkAdminRole, purchaseCart);
router.delete('/:cartId/remove/:productId',checkAdminRole ,removeProductFromCart);

export default router;