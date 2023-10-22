import chai from 'chai';
import mongoose from 'mongoose';
import { mongoUrl } from '../../src/config/config.js';
import ProductModel from '../../src/dao/models/products.model.js';
const expect = chai.expect;

describe('Product Model', () => {
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

  it('debería poder crear y guardar un producto', async () => {
    const productData = {
      title: 'Producto de Prueba',
      description: 'Descripción de Producto de Prueba',
      price: 9369,
      code: '75643',
      category: 'Test',
      owner: 'admin',
    };

    const product = new ProductModel(productData);
    const savedProduct = await product.save();
    console.log('Producto guardado:', savedProduct)
    expect(savedProduct._id).to.exist;
    expect(savedProduct.title).to.equal(productData.title);
    expect(savedProduct.description).to.equal(productData.description);
    expect(savedProduct.price).to.equal(productData.price);
    expect(savedProduct.code).to.equal(productData.code);
    expect(savedProduct.category).to.equal(productData.category);
    expect(savedProduct.owner).to.equal(productData.owner);
  });

  it('no debería guardar un producto con campos requeridos faltantes', async () => {
    const product = new ProductModel({});

    try {
      await product.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
    }
  });
});

const limpiarBaseDeDatos = async () => {
  await ProductModel.deleteMany({});
};