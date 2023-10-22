import CartRepository from '../repositories/carts.repository.js';
import CartModel from "../dao/models/carts.model.js";
import ProductModel from "../dao/models/products.model.js"
import UserModel from '../dao/models/user.model.js';

class CartService {
  async createCartForUser(userId, userEmail) {
    try {
      const newCart = new CartModel({
        owner: userEmail,
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

      const existingProduct = userCart.products.find((product) => {
        return product.productId._id.toString() === productId;
      });
      const product = await ProductModel.findById(productId);

      if (product.owner === userCart.owner) {
        throw new Error('No puedes agregar tu propio producto al carrito');
      }

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        userCart.products.push({ productId, quantity: quantity });
      }
      await userCart.save();
    } catch (error) {
      throw new Error('Error al agregar producto al carrito: ' + error.message);
    }
  }


}

export default new CartService();