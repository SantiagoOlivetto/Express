import { OrdersModel } from '../dao/db/models/orders.model.js';
import { cartsService } from './carts.service.js';
import { productService } from './products.service.js';

class OrdersService {
  async create(amount, email, cid) {
    const order = await OrdersModel.create({ amount: amount, emittedBy: email, cart: cid });
    return order;
  }
  async findById(oid) {
    const order = await OrdersModel.findById(oid);
    return order;
  }
  async confirm(oid) {
    const order = await OrdersModel.findById(oid);
    const cart = await cartsService.findById(order.cart._id);
    for (let i = 0; i < cart.length; i++) {
      const qty = cart[i].quantity;
      const id = cart[i].product._id;
      await productService.deductStck(id, qty);
    }
    await cartsService.emptyCart(order.cart._id);
    return order;
  }
}

export const orderService = new OrdersService();
