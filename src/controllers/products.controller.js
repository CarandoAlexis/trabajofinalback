import ProductService from '../services/products.service.js';
import { sendEmail } from './email.controller.js';

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
    let owner;
    if (req.session?.user) {
      if (req.session.user.role === "premium") {
        owner = req.session.user.email;
      } else if (req.session.user.role === "admin") {
        owner = "admin";
      }
    }
    console.log("Owner antes de agregar producto:", owner);
    await productService.addProduct({ title, description, price, code, category }, owner);
    res.status(201).json({ status: "success", message: "Producto agregado exitosamente" });
  } catch (error) {
    next(error);
  }
};


export const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { title, description, price, code, category } = req.body;
    const user = req.session.user;

    const product = await productService.getProductById(productId);

    if (!product) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }

    if (user.role === 'admin' || user.email === product.owner) {
      const updatedProduct = await productService.editProduct(productId, { title, description, price, code, category });
      return res.json(updatedProduct);
    } else {
      return res.status(403).json({ status: "error", message: "No tienes permisos para editar este producto" });
    }
  } catch (error) {
    console.error("Error al editar el producto:", error);
    res.status(500).json({ status: "error", message: "Error al editar el producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.session;

    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }

    if (user.role === 'admin' || (user.role === 'premium' && user.email === product.owner)) {
      const userEmail = product.owner;
      await productService.deleteProduct(id);
      const subject = 'Eliminación de producto';
      const text = 'Tu producto ha sido eliminado.';
      sendEmail(userEmail, subject, text);
      res.json({ status: "success", message: "Producto eliminado" });
    } else {
      res.status(403).json({ status: "error", message: "No tienes permisos para eliminar este producto" });
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ status: "error", message: "Error al eliminar el producto" });
  }
};