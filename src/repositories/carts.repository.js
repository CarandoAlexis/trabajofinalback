import CartModel from "../dao/models/carts.model.js";

class CartRepository {
  async findCartByCartId(cartId) {
    return CartModel.findById(cartId).populate("products.productId");
  }
  async findCartByUserId(userId) {
    console.log("Buscando carrito para el usuario con ID:", userId);
    return CartModel.findOne({ name: userId }).populate("products.productId");
  }
}

export default new CartRepository();
