import CartService from "../services/carts.service.js";
import CartRepository from "../repositories/carts.repository.js"
import ticketModel from "../dao/models/ticket.model.js";
import crypto from "crypto"
import Product from "../dao/models/products.model.js"

function generateUniqueCode() {
  const currentTimestamp = new Date().getTime().toString();
  const randomBytes = crypto.randomBytes(4).toString("hex");
  return `${currentTimestamp}-${randomBytes}`;
}

const createCartForUser = async (req, res) => {
  try {
    const userId = req.session.user._id;
    await CartService.createCartForUser(userId);
    res.status(200).json({ message: 'Carrito creado exitosamente' });
  } catch (error) {
    console.error('Error al crear carrito:', error);
    res.status(500).json({ status: 'error', message: 'Error al crear carrito' });
  }
};


const addProductToCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const userId = req.session.user._id;
    const { quantity } = req.body;

    const message = await CartService.addProductToCart(cartId, userId, productId, quantity);

    res.status(200).json({ message: message });
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ status: 'error', message: 'Error al agregar producto al carrito' });
  }
};


const getCartContents = async (req, res) => {
  try {
    const { cartId } = req.params;

    const cart = await CartRepository.findCartByCartId(cartId);

    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }

    res.json({ status: "success", cart });
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).json({ status: "error", message: "Error al obtener el carrito" });
  }
};

const purchaseCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userCart = await CartRepository.findCartByCartId(cartId);

    if (!userCart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }

    const totalAmount = await Promise.all(userCart.products.map(async (product) => {
      const productInfo = await Product.findById(product.productId);
      return productInfo.price * product.quantity;
    }));
    
    const totalPrice = totalAmount.reduce((total, amount) => total + amount, 0);

    const newTicket = new ticketModel({
      code: generateUniqueCode(),
      amount: totalPrice,
      purchaser: req.session.user.email,
    });

    await newTicket.save();

    userCart.products = [];

    await userCart.save();

    res.json({ status: "success", message: "Compra realizada con éxito", ticket: newTicket });
  } catch (error) {
    console.error("Error al finalizar la compra:", error);
    res.status(500).json({ status: "error", message: "Error al finalizar la compra" });
  }
};

const editCartItemQuantity = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    const userCart = await CartRepository.findCartByCartId(cartId);

    if (!userCart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }

    const existingProduct = userCart.products.find(product => product.productId._id.toString() === productId);

    if (!existingProduct) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado en el carrito" });
    }

    existingProduct.quantity = quantity;
    await userCart.save();

    res.json({ status: "success", message: "Cantidad del producto actualizada en el carrito" });
  } catch (error) {
    console.error("Error al editar cantidad del producto en el carrito:", error);
    res.status(500).json({ status: "error", message: "Error al editar cantidad del producto en el carrito" });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const userCart = await CartRepository.findCartByCartId(cartId);

    if (!userCart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }

    const existingProductIndex = userCart.products.findIndex(product => product.productId._id.toString() === productId);

    if (existingProductIndex === -1) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado en el carrito" });
    }
    
    userCart.products.splice(existingProductIndex, 1);

    await userCart.save();

    res.json({ status: "success", message: "Producto eliminado del carrito" });
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    res.status(500).json({ status: "error", message: "Error al eliminar producto del carrito" });
  }
};


export { createCartForUser, addProductToCart, getCartContents ,purchaseCart, editCartItemQuantity, removeProductFromCart };