const mongoose = require('mongoose');
const User = require('../api/model/user');
const { connect, saveUser, disconnect } = require('./db');

jest.mock('./db');

describe('Db Tests', () => {
  test('As a user I want to save a user to MongoDB', async () => {
    const newUser = new User({
      _id: mongoose.Types.ObjectId(),
      firstName: 'Eric',
      email: 'eclarke@fullsail.edu',
      password: 'Bob',
    });
    await connect();
    const user = await saveUser(newUser);
    expect(user.firstName).toEqual('Eric');
    expect(user.email).toEqual('eclarke@fullsail.edu');
    expect(user.password).toEqual('Bob');
    await disconnect();
  });
});
