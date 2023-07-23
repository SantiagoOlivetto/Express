import { cartsService } from '../services/carts.service.js';

class CartsController {
  async get(req, res) {
    const cId = req.params.cid;
    const cart = await cartsService.findById(cId);
    const cartProds = cart.products.map((prod) => prod.toJSON());

    return res.render('cart', {
      style: 'cart.css',
      cart,
      cartProds,
    });
  }
}

export const cartsController = new CartsController();
