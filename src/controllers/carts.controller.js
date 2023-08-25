import { cartsService } from '../services/carts.service.js';
import SessionDto from './dto/sessionDto.js';

class CartsController {
  async get(req, res) {
    const cId = req.params.cid;
    try {
      const cart = await cartsService.findById(cId);
      const isEmpty = await cartsService.isEmpty(cId);
      return res.render('cart', {
        style: 'cart.css',
        cart,
        cId,
        isEmpty,
      });
    } catch (err) {
      return res.status(404).send('Cart not found');
    }
  }
  async post(req, res) {
    const sessionDto = new SessionDto(req.session.user);
    const { uid } = sessionDto;
    const pid = req.params.pid;
    const addProd = await cartsService.addProdtoCart(uid, pid);
    sessionDto.cid = addProd._id;
    req.session.user = sessionDto;

    return res.status(200).json({ success: true });
  }
}

export const cartsController = new CartsController();
