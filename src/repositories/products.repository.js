import DAOFactory from '../dao/factory/dao.factory.js';
import { selectedDAO } from '../config/config.js';

class ProductRepository {
  constructor() {
    this.dao = DAOFactory.createDAO(selectedDAO);
    console.log(`Dao Actual: ${selectedDAO}`);
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
}

export default ProductRepository;