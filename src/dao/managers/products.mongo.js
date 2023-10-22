import ProductModel from "../models/products.model.js";
import logger from "../../config/logger.js";

class MongoProductManager {
  static instance;

  constructor() {
    if (!MongoProductManager.instance) {
      MongoProductManager.instance = this;
    }

    return MongoProductManager.instance;
  }

  async addProduct(productData) {
    try {
      const product = new ProductModel(productData);
      await product.save();
    } catch (error) {
      logger.error("Error al agregar el producto:", error);
      throw error;
    }
  }

  async getProducts() {
    try {
      logger.info("Obteniendo productos");
      const products = await ProductModel.find();
      logger.info(`Productos: ${(products)}`);
      return products;
    } catch (error) {
      logger.error("Error al obtener los productos", error);
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const product = await ProductModel.findById(productId);
      return product;
    } catch (error) {
      logger.error("Error al obtener el producto por ID:", error);
      throw error;
    }
  }

  async editProduct(productId, updatedProductData) {
    try {
      await ProductModel.findByIdAndUpdate(productId, updatedProductData);
    } catch (error) {
      logger.error("Error al editar el producto:", error);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      await ProductModel.findByIdAndDelete(productId);
    } catch (error) {
      logger.error("Error al eliminar el producto:", error);
      throw error;
    }
  }
}

export default MongoProductManager;
