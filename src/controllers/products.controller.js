import { productService } from '../services/products.service.js';
class ProductsController {
  async getAll(req, res) {
    const name = req.session.firstName;
    const role = req.session.role;
    let { limit, page, sort, query } = req.query;
    const products = await productService.findAll(limit, page, query, sort);
    return res.render('products', {
      title: 'Product list',
      style: 'realTimeProducts.css',
      products,
      name,
      role,
    });
  }

  async getOne(req, res) {
    const pid = req.params.pid;
    const product = await productService.findById(pid);
    const { title, price, description } = product;
    return res.render('productId', {
      style: 'product.css',
      title,
      price,
      description,
    });
  }
}

export const productsController = new ProductsController();
