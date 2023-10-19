import MongoProductManager from "../managers/products.mongo.js";
import MemoryProductManager from "../managers/products.memory.js";

class DAOFactory {
    static createDAO(daoType) {
      switch (daoType) {
        case 'mongo':
          return new MongoProductManager();
        case 'memory':
          return new MemoryProductManager();
        default:
          throw new Error(`Unsupported DAO type: ${daoType}`);
      }
    }
  }
  
  export default DAOFactory;