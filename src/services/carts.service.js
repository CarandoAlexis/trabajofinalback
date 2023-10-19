import CartRepository from '../repositories/carts.repository.js';
import CartModel from "../dao/models/carts.model.js";

class CartService {
  async createCartForUser(userId) {
    try {
      const newCart = new CartModel({
        name: userId,
        products: [],
      });
      await newCart.save();
      return newCart;
    } catch (error) {
      throw new Error("Error al crear el carrito para el usuario");
    }
  }
  
  async addProductToCart(cartId, userId, productId, quantity) {
    try {
      const userCart = await CartRepository.findCartByUserId(userId);
  
      if (!userCart) {
        throw new Error('Carrito no encontrado');
      }
  
      console.log("Productos en el carrito:", userCart.products);
  
      const existingProduct = userCart.products.find((product) => {
        return product.productId._id.toString() === productId;
      });
  
      console.log("Producto existente:", existingProduct);
  
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        userCart.products.push({ productId, quantity: quantity });
      }
  
      console.log("Productos en el carrito:", userCart.products);
      console.log("Producto existente:", existingProduct);
  
      await userCart.save();
    } catch (error) {
      throw new Error('Error al agregar producto al carrito');
    }
  }


}

export default new CartService();