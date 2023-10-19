import ProductDTO from '../dto/products.dto.js';
import ProductRepository from '../repositories/products.repository.js';

class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }

  async getAllProducts({ limit = 10, sort = 1, category = "" }) {
    const products = await this.repository.getAllProducts();

    const filteredProducts = products
      .filter(product => product.category.toLowerCase().includes(category.toLowerCase()))
      .sort((a, b) => a.price - b.price)
      .slice(0, limit);

    return filteredProducts;
  }

  async addProduct({ title, description, price, code, category }) {
    const productDTO = new ProductDTO({ title, description, price, code, category });
    await this.repository.addProduct(productDTO);
  }

  async editProduct(productId, updatedProductData) {
    await this.repository.editProduct(productId, updatedProductData);
  }

  async deleteProduct(productId) {
    await this.repository.deleteProduct(productId);
  }
}

export default ProductService;

