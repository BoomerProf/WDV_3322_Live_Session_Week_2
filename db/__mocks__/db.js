const connect = async () => {
  console.log('Mock Connecting');
};

const saveUser = async (newUser) => {
  console.log('Mocked User');
  return Promise.resolve({
    firstName: 'Eric',
    email: 'eclarke@fullsail.edu',
    password: 'Bob',
  });
};

const disconnect = async () => {
  console.log('Mocked Disconnect');
};

module.exports = { connect, saveUser, disconnect };
