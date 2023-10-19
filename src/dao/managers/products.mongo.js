import ProductModel from "../models/products.model.js";

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
      console.error("Error al agregar el producto:", error);
      throw error;
    }
  }

  async getProducts() {
    try {
      console.log("Getting products");
      const products = await ProductModel.find();
      console.log("Products:", products);
      return products;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      throw error;
    }
  }

  async editProduct(productId, updatedProductData) {
    try {
      await ProductModel.findByIdAndUpdate(productId, updatedProductData);
    } catch (error) {
      console.error("Error al editar el producto:", error);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      await ProductModel.findByIdAndDelete(productId);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw error;
    }
  }

}

export default MongoProductManager;