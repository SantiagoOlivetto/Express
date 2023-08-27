import { productService } from '../services/products.service.js';
import { generateProduct } from '../utils/faker.js';

class MockingController {
  async get(req, res) {
    const prodsQty = 100;
    for (let i = 0; i < prodsQty; i++) {
      const newProd = generateProduct();
      const { title, description, category, price, thumbnail, code, stock, status } = newProd;
      await productService.createProduct(title, description, category, price, thumbnail, code, stock, status);
    }
    const allProds = await productService.findAll(100);
    const viewProds = allProds.productsColl;
    return res.send({ viewProds });
  }
}

export const mockingController = new MockingController();
