import { productService } from '../services/products.service.js';

class RealTimeProductsController {
  async get(req, res) {
    const products = await productService.findAll('false');
    const { productsColl } = products;
    return res.render('realTimeProducts', {
      title: 'Product list',
      style: 'realTimeProducts.css',
      productsColl,
      products,
    });
  }
}

export const realTimeProdController = new RealTimeProductsController();
