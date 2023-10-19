class MemoryProductManager {
    constructor() {
      this.products = [];
    }
  
    async addProduct(productData) {
      try {
        this.products.push(productData);
      } catch (error) {
        console.error("Error al agregar el producto:", error);
        throw error;
      }
    }
  
    async getProducts({ query = "" }) {
      try {
        if (query) {
          return this.products.filter(product => product.category.includes(query));
        } else {
          return this.products;
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
      }
    
    }
  }
  
  export default MemoryProductManager;