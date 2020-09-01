const faker = require('faker/locale/pt_BR');

module.exports = {
  name: faker.name.findName(),
  age: faker.random.number({ min: 1, max: 80 }),
  phone: faker.phone.phoneNumberFormat(),
  email: faker.internet.email(),
  address: {
    type: faker.address.streetSuffix(),
    street: faker.address.streetName(),
    number: faker.random.number({ min: 1, max: 3000 }),
    zipcode: faker.address.zipCode(),
  },
};
