import chai from 'chai';
import mongoose from 'mongoose';
import { mongoUrl } from '../../src/config/config.js';
import TicketModel from '../../src/dao/models/ticket.model.js';
const expect = chai.expect;

function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}

describe('Ticket Model', () => {
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

  it('debería poder crear y guardar un ticket', async () => {
    const ticketData = {
      code: generateRandomCode(4), // Genera un código aleatorio de 4 caracteres
      amount: 100,
      purchaser: 'Juan',
      products: [
        {
          name: 'Producto 1',
          quantity: 2,
          price: 25,
        },
        {
          name: 'Producto 2',
          quantity: 1,
          price: 50,
        },
      ]
    };
  
    const ticket = new TicketModel(ticketData);
    const savedTicket = await ticket.save();
    console.log('Ticket guardado:', savedTicket);
  
    expect(savedTicket._id).to.exist;
    expect(savedTicket.code).to.equal(ticketData.code);
    expect(savedTicket.amount).to.equal(ticketData.amount);
    expect(savedTicket.purchaser).to.equal(ticketData.purchaser);
    expect(savedTicket).to.have.property('products');
  });
  
  
});

const limpiarBaseDeDatos = async () => {
  await TicketModel.deleteMany({});
};