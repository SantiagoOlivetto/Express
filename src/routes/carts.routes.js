import express from 'express';
import { cartsService } from '../services/carts.service.js';

export const routerCarts = express.Router();
routerCarts.use(express.json());
routerCarts.use(express.urlencoded({ extended: true }));

routerCarts.get('/', async (req, res) => {
  try {
    const carts = await cartsService.findAll();
    return res.status(200).json({ status: 'succesfull', msg: 'Product list', data: carts });
  } catch (err) {
    return res.status(500).json({ status: 'Error', msg: 'Something went wrong', data: { err } });
  }
});

routerCarts.get('/:id', async (req, res) => {
  const cartId = req.params.id;
  try {
    const cartByID = await cartsService.findById(cartId);
    return cartByID
      ? res.status(200).json({ status: 'succesfull', msg: 'Cart by id', data: cartByID })
      : res.status(404).json({ status: 'ERROR 404', msg: 'Problem: Searching for product by id', data: `The id ${cartId} do not match any product` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'Failed', msg: 'Something went wrong', data: err });
  }
});

routerCarts.post('/', async (req, res) => {
  try {
    const newCart = await cartsService.createCart();
    return newCart
      ? res.status(201).json({ status: 'succesfull', msg: 'Cart succesfully created', data: newCart })
      : res.status(500).json({ status: 'ERROR 500', msg: 'Creating cart process failed', data: `No cart created` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'Error', msg: err });
  }
});

routerCarts.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    const addProdToCart = await cartsService.addProdtoCart(cartId, productId);
    return addProdToCart
      ? res.status(201).json({ status: 'succesfull', msg: 'Product succesfully added to cart', data: addProdToCart })
      : res.status(500).json({ status: 'ERROR 500', msg: 'adding product process failed', data: 'no product added to cart' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'Error', msg: err });
  }
});

routerCarts.delete('/:cid/product/:pid', async (req, res) => {
  const cId = req.params.cid;
  const pId = req.params.pid;
  try {
    const deleteProd = await cartsService.removeProd(cId, pId);
    if (deleteProd) {
      console.log(deleteProd);
      return res.status(204).header(`X-Product-Message`, 'Product deleted successfully').end();
    } else {
      throw new Error(`Product with the id:${pId} does not exist`);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ status: 'error', msg: `Product with the id:${pId} do not match a product`, data: 'Error 404' });
  }
});
routerCarts.delete('/:cid', async (req, res) => {
  const cId = req.params.cid;
  try {
    const emptyCart = await cartsService.emptyCart(cId);
    return emptyCart ? res.status(204).header(`X-Product-Message`, 'Cart emptied successfully').end() : res.status(500).json({ status: 'ERROR 500', msg: 'Emptying cart process failed', data: '' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'Error', msg: err });
  }
});
routerCarts.put('/:cid/product/:pid', async (req, res) => {
  const cId = req.params.cid;
  const pId = req.params.pid;
  const { qty } = req.body;
  try {
    const qtyModifier = await cartsService.quantityModifier(cId, pId, qty);
    return qtyModifier
      ? res.status(200).json({ status: 'succesfull', msg: `The product ${pId} has succesfully updated the quantity`, data: qtyModifier })
      : res.status(500).json({ status: 'error', msg: 'something went wrong' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'Error', msg: err });
  }
});
routerCarts.put('/:cid', async (req, res) => {
  const cId = req.params.cid;
  const products = req.body;
  try {
    const updateProducts = await cartsService.updateProducts(cId, products);
    return updateProducts
      ? res.status(200).json({ status: 'succesfull', msg: 'The cart has been succesfully updated', data: updateProducts })
      : res.status(500).json({ status: 'ERROR 500', msg: 'Updating process of product was unsuccesfull' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'Error', msg: err });
  }
});
