import ProductService from '../services/products.service.js';

const productService = new ProductService();

export const getProductList = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req.query);
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ status: "error", message: "Error al obtener los productos" });
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { title, description, price, code, category } = req.body;
    if (!title || !description || !price || !code || !category) {
      const error = new Error('Los campos son inválidos o faltan.');
      error.name = 'InvalidFieldsError';
      throw error;
    }
    await productService.addProduct({ title, description, price, code, category });
    res.status(201).json({ status: "success", message: "Producto agregado exitosamente" });
  } catch (error) {
    next(error);
  }
};

export const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { title, description, price, code, category } = req.body;

    
    const updatedProduct = await productService.editProduct(productId, { title, description, price, code, category });

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error al editar el producto:", error);
    res.status(500).json({ status: "error", message: "Error al editar el producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    res.json({ status: "success", message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ status: "error", message: "Error al eliminar el producto" });
  }
};