import { ClientSession } from 'mongodb';
import { CartsModel } from '../dao/models/carts.model.js';

class CartsService {
  async createCart() {
    const newCart = await CartsModel.create({ products: [] });
    return newCart;
  }
  async findAll() {
    const findAll = await CartsModel.find();
    return findAll;
  }
  async findById(id) {
    try {
      const cart = await CartsModel.findById(id).populate('products.product', 'title price code').exec();
      return cart;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async addProdtoCart(cId, pId) {
    const cart = await CartsModel.findById(cId);
    const product = {
      product: pId,
      quantity: 1,
    };
    //console.log(cart);
    const productExist = cart.products.find((product) => product.product == pId);
    productExist ? productExist.quantity++ : cart.products.addToSet(product);
    await cart.save();
    return product;
  }
  async removeProd(cId, pId) {
    const cart = await CartsModel.findById(cId);
    console.log(cart.products);
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
