import { Router } from "express";
import { getProductList, addProduct, editProduct, deleteProduct } from "../controllers/products.controller.js";
import { checkUserRole , checkPremiumRole } from "../middleware/role.middleware.js";
import { generateMockProducts } from "../controllers/simulacionDatos.js";
import authMdw from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMdw, checkPremiumRole, checkUserRole, getProductList);
router.post("/", authMdw ,checkUserRole, addProduct);
router.put('/edit/:id', authMdw , checkUserRole, editProduct);
router.delete('/delete/:id', authMdw , checkUserRole, deleteProduct);
router.get('/mockingproducts', (req, res) => {
    const simulatedProducts = generateMockProducts();
    res.json(simulatedProducts);
});

export default router;