const mongoose = require('mongoose');

const connect = async () => {
  console.log('Real Connecting');
  await mongoose.connect('mongodb://localhost:27017/demo');
};

const saveUser = async (newUser) => {
  console.log('Real User');
  return await newUser.save();
};

const disconnect = async () => {
  console.log('Real Disconnect');
  await mongoose.connection.close();
};

module.exports = { connect, saveUser, disconnect };
