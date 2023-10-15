import CustomError from '../errors/customErr.js';
import { EErrors } from '../errors/enum.js';
import { cartsService } from '../services/carts.service.js';
import SessionDto from './dto/sessionDto.js';
import { env } from '../config.js';

const url = env.URL;

class CartsController {
  async get(req, res) {
    try {
      const cId = req.params.cid;
      const cart = await cartsService.findById(cId);
      const isEmpty = await cartsService.isEmpty(cId);
      return res.render('cart', {
        style: 'cart.css',
        cart,
        cId,
        isEmpty,
        url,
      });
    } catch (err) {
      return CustomError.createError({ name: 'Cart error', cause: 'Cart id do not match the user', message: err, code: EErrors.DB_READ_ERROR });
    }
  }
  async post(req, res) {
    try {
      const sessionDto = new SessionDto(req.session.user);
      const { uid } = sessionDto;

      const pid = req.params.pid;
      const addProd = await cartsService.addProdtoCart(uid, pid);
      sessionDto.cid = addProd._id;
      req.session.user = sessionDto;

      return res.status(200).json({ success: true });
    } catch (err) {
      return CustomError.createError({ name: 'Cart error', cause: 'Add product to cart failed, check cart and product id', message: err, code: EErrors.DB_READ_ERROR });
    }
  }
}

export const cartsController = new CartsController();
