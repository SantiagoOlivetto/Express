import express from 'express';
import { productManager } from './products.routes.js';
import { productService } from '../services/products.service.js';

export const routerViewProducts = express.Router();

routerViewProducts.get('/:pid', async (req, res) => {
  const pid = req.params.pid;
  const product = await productService.findById(pid);
  return res.render('productId', {
    style: 'product.css',
    product,
  });
});
routerViewProducts.get('/', async (req, res) => {
  let { limit, page, sort, query } = req.query;
  const prodColl = await productService.findAll(limit, page, query, sort);
  const products = prodColl.docs.map((doc) => doc.toJSON());
  console.log('##################################################');
  console.log(prodColl.page);

  return res.render('products', {
    title: 'Product list',
    style: 'realTimeProducts.css',
    products,
  });
});
