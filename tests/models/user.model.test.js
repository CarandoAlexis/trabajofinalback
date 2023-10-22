import chai from 'chai';
import mongoose from 'mongoose';
import { mongoUrl } from '../../src/config/config.js';
import UserModel from '../../src/dao/models/user.model.js';

const expect = chai.expect;

describe('User Model', () => {
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

  it('debería poder crear y guardar un usuario', async () => {
    const userData = {
      first_name: 'juan',
      last_name: 'a',
      email: 'juana@ejemplo.com',
      age: 30,
      password: 'password123',
      role: 'usuario',
    };

    const user = new UserModel(userData);
    const savedUser = await user.save();
    console.log('Usuario guardado:', savedUser);

    expect(savedUser._id).to.exist;
    expect(savedUser.first_name).to.equal(userData.first_name);
    expect(savedUser.last_name).to.equal(userData.last_name);
    expect(savedUser.email).to.equal(userData.email);
    expect(savedUser.age).to.equal(userData.age);
    expect(savedUser.password).to.equal(userData.password);
    expect(savedUser.role).to.equal(userData.role);
  });
});

const limpiarBaseDeDatos = async () => {
  await UserModel.deleteMany({});
};