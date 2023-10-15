import { productService } from '../services/products.service.js';
import SessionDto from './dto/sessionDto.js';
import { env } from '../config.js';

const url = env.URL;
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
      url: url,
    });
  }

  async getOne(req, res) {
    let user = new SessionDto(req.session.user);
    if (user.role === 'admin') {
      user.permission = true;
    }

    const pid = req.params.pid;
    const product = await productService.findById(pid);
    const { title, price, description, stock, code, thumbnail, category } = product;
    return res.render('productId', {
      style: 'product.css',
      url: url,
      title,
      price,
      description,
      category,
      stock,
      code,
      thumbnail,
      user,
      pid,
    });
  }
  async update(req, res) {
    const pid = req.params.pid;
    const toUpdate = req.body;
    const product = await productService.updateProduct(pid, toUpdate);
    return res.status(200).json({ success: true });
  }
}

export const productsController = new ProductsController();
