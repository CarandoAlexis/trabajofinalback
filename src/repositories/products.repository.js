import DAOFactory from "../dao/factory/dao.factory.js";
import { selectedDAO } from "../config/config.js";
import logger from "../config/logger.js";

class ProductRepository {
  constructor() {
    this.dao = DAOFactory.createDAO(selectedDAO);
    logger.info(`Dao Actual: ${selectedDAO}`);
  }

  async addProduct(productData) {
    await this.dao.addProduct(productData);
  }

  async getAllProducts() {
    return await this.dao.getProducts({});
  }

  async editProduct(productId, updatedProductData) {
    await this.dao.editProduct(productId, updatedProductData);
  }

  async deleteProduct(productId) {
    await this.dao.deleteProduct(productId);
  }

  async getProductById(productId) {
    return await this.dao.getProductById(productId);
  }
}

export default ProductRepository;
