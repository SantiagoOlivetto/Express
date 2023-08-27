import { faker } from '@faker-js/faker';

export const generateProduct = () => {
  return {
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.productAdjective(),
    price: faker.commerce.price(),
    thumbnail: faker.internet.avatar(),
    code: faker.string.alphanumeric(5),
    stock: faker.number.int({ min: 10, max: 100 }),
    status: 'true',
  };
};
