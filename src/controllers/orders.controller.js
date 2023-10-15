import { cartsService } from '../services/carts.service.js';
import { orderService } from '../services/orders.service.js';
import SessionDto from './dto/sessionDto.js';
import { env } from '../config.js';

const url = env.URL;

class OrdersController {
  async post(req, res) {
    const { cid } = req.body;
    const { email } = new SessionDto(req.session.user);
    const cart = await cartsService.findById(cid);
    const { amount } = cart;
    const order = await orderService.create(amount, email, cid);
    return res.status(200).json({ success: true, oid: order._id });
  }
  async get(req, res) {
    const oid = req.params.oid;
    const order = await orderService.findById(oid);
    const { amount, emittedBy, code, createdAt } = order;
    return res.render('order', {
      style: 'order.css',
      amount,
      emittedBy,
      code,
      createdAt,
      oid,
      url,
    });
  }
  async confirmPost(req, res) {
    const oid = req.params.oid;
    const confirmData = await orderService.confirm(oid);
    return res.status(200).json({ success: true });
  }
  async confirmGet(req, res) {
    const oid = req.params.oid;
    const order = await orderService.findById(oid);

    return res.render('orderConfirmation', {
      style: 'order.css',
      order,
      url,
    });
  }
}

export const orderController = new OrdersController();
