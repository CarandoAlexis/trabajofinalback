import chai from 'chai';
import { mongoUrl } from '../../src/config/config.js'
import mongoose from 'mongoose';
import CartModel from '../../src/dao/models/carts.model.js';

const expect = chai.expect;

describe('Cart Model', () => {
  before(async () => {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a la base de datos establecida.', mongoUrl);
  });

  after(async () => {
    await limpiarBaseDeDatos();
    await mongoose.connection.close();
    console.log('Conexión a la base de datos cerrada.');
  });

  it('debería poder crear un carrito vacío', async () => {
    const cartData = {
      owner: 'Propietario de Prueba',
      name: 'Carrito Vacío',
      products: [],
    };
  
    const cart = new CartModel(cartData);
    const savedCart = await cart.save();
    console.log('Datos carrito:', savedCart);
  
    expect(savedCart._id).to.exist;
    expect(savedCart.owner).to.equal(cartData.owner);
    expect(savedCart.name).to.equal(cartData.name);
    expect(savedCart.products).to.be.an('array').that.is.empty;
  });

  it('debería poder crear y guardar un producto en carrito', async () => {
    const cartData = {
      owner: 'Propietario de Prueba',
      name: 'Carrito de Prueba',
      products: [
        {
          productId: new mongoose.Types.ObjectId(),
          quantity: 2,
        },
      ],
    };
  
    const cart = new CartModel(cartData);
    const savedCart = await cart.save();
    console.log('Datos carrito:', savedCart);
  
    expect(savedCart._id).to.exist;
    expect(savedCart.owner).to.equal(cartData.owner);
    expect(savedCart.name).to.equal(cartData.name);
    expect(savedCart.products[0].productId.toString()).to.equal(cartData.products[0].productId.toString());
    expect(savedCart.products[0].quantity).to.equal(cartData.products[0].quantity);
  });
  
  it('debería guardar un producto al carrito con cantidad predeterminada', async () => {
    const cartData = {
      owner: 'Propietario de Prueba',
      name: 'Carrito de Prueba',
      products: [
        {
          productId: new mongoose.Types.ObjectId(),
        },
      ],
    };
    
    const cart = new CartModel(cartData);
    const savedCart = await cart.save();
    console.log('Carrito con producto con cantidad predeterminada:',savedCart)
    expect(savedCart.products[0].quantity).to.equal(1);
  });
})

const limpiarBaseDeDatos = async () => {
  await CartModel.deleteMany({});
};