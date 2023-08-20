import { CartsModel } from '../dao/db/models/carts.model.js';
import { productService } from './products.service.js';
import { usersService } from './users.service.js';

class CartsService {
  async createCart(uid) {
    const newCart = await CartsModel.create({ user: uid, products: [] });
    const userUpdate = await usersService.linkCart(uid, newCart._id);
    return newCart;
  }
  async findAll() {
    const findAll = await CartsModel.find();
    return findAll;
  }
  async findById(id) {
    try {
      let cart = await CartsModel.findById(id).populate('products.product', 'title price code').exec();
      cart = cart.products.map((prod) => prod);
      let amount = 0;
      for (let i = 0; i < cart.length; i++) {
        let price_qty = cart[i].product.price * cart[i].quantity;
        amount = amount + price_qty;
      }
      cart.amount = amount.toFixed(2);
      return cart;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async addProdtoCart(uId, pId) {
    let cart = await CartsModel.findOne({ user: uId });
    !cart ? (cart = await this.createCart(uId)) : cart;
    let checkProduct = await productService.findById(pId);
    const { stock } = checkProduct;
    const productExist = cart.products.find((product) => product.product == pId);

    if (productExist && productExist.quantity === stock) {
      throw new error('Cannot add more of this product to the cart due to insufficient stock');
    } else if (productExist) {
      productExist.quantity++;
    }
    if ((!productExist && stock > 0) || stock === 1) {
      const product = {
        product: pId,
        quantity: 1,
      };
      cart.products.addToSet(product);
    }
    await cart.save();
    return cart;
  }
  async removeProd(cId, pId) {
    const cart = await CartsModel.findById(cId);
    const prodIndex = cart.products.findIndex((product) => product.product._id.toString() === pId);
    if (prodIndex != -1) {
      const res = cart.products.splice(prodIndex, 1);
      await cart.save();
      return res;
    } else {
      const res = 'Product not found';
      return res;
    }
  }
  async isEmpty(cid) {
    let cart = await CartsModel.findById(cid);
    return cart.products.length === 0 ? true : false;
  }
  async emptyCart(cId) {
    let cart = await CartsModel.findById(cId);
    cart.products = [];
    cart = await cart.save();
    return cart;
  }

  async quantityModifier(cId, pId, qty) {
    let cart = await CartsModel.findById(cId);
    const prodIndex = cart.products.findIndex((product) => product.product._id.toString() === pId);
    if (prodIndex != -1) {
      qty ? (cart.products[prodIndex].quantity = qty) : cart.products[prodIndex].quantity;
      await cart.save();
      return cart.products[prodIndex];
    } else {
      throw new Error(`Product with the id:${pId} does not exist`);
    }
  }

  async updateProducts(cId, prods) {
    const cart = await cartsService.findById(cId);
    cart.products = prods;
    await cart.save();
    return cart;
  }
}

export const cartsService = new CartsService();
