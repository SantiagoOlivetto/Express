import express from 'express';
import { productManager } from './products.routes.js';
import { productService } from '../services/products.service.js';
import { cartsService } from '../services/carts.service.js';

export const viewRoutes = express.Router();

// REALTIME PRODUCTS----------------------------

viewRoutes.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  return res.render('realTimeProducts', {
    title: 'Product list',
    style: 'realTimeProducts.css',
    products,
  });
});

// PRODUCTS-------------------------------------

viewRoutes.get('/products/:pid', async (req, res) => {
  const pid = req.params.pid;
  const product = await productService.findById(pid);
  return res.render('productId', {
    style: 'product.css',
    product,
  });
});

viewRoutes.get('/products', async (req, res) => {
  let { limit, page, sort, query } = req.query;
  const prodColl = await productService.findAll(limit, page, query, sort);
  const products = prodColl.docs.map((doc) => doc.toJSON());
  prodColl.prevLink != null ? (prodColl.prevLink = prodColl.prevLink.replace('/api', '')) : prodColl.prevLink;
  prodColl.nextLink != null ? (prodColl.nextLink = prodColl.nextLink.replace('/api', '')) : prodColl.nextLink;
  let arrPages = [];
  for (let i = 1; i <= prodColl.totalPages; i++) {
    arrPages.push(i);
  }

  return res.render('products', {
    title: 'Product list',
    style: 'realTimeProducts.css',
    products,
    prodColl,
    arrPages,
  });
});

// CART---------------------------------------

viewRoutes.get('/carts/:cid', async (req, res) => {
  const cId = req.params.cid;
  const cart = await cartsService.findById(cId);
  const cartProds = cart.products.map((prod) => prod.toJSON());

  return res.render('cart', {
    style: 'cart.css',
    cart,
    cartProds,
  });
});

// CHAT---------------------------------------
viewRoutes.get('/chat', (req, res) => {
  return res.render('chat', {
    style: 'chat.css',
  });
});
