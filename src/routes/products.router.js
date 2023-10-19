import { Router } from "express";
import { getProductList, addProduct, editProduct, deleteProduct } from "../controllers/products.controller.js";
import { checkUserRole} from "../middleware/role.middleware.js";
import { generateMockProducts } from "../controllers/simulacionDatos.js";

const router = Router();

router.get("/", getProductList);
router.post("/",checkUserRole, addProduct);
router.put('/edit/:id', checkUserRole, editProduct);
router.delete('/delete/:id', checkUserRole, deleteProduct);
router.get('/mockingproducts', (req, res) => {
    const simulatedProducts = generateMockProducts();
    res.json(simulatedProducts);
});

export default router;