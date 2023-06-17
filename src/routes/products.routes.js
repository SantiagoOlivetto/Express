import express from 'express';
import ProductManager from '../controllers/ProductManager.js';
import bodyParser from 'express';
import { productService } from '../services/products.service.js';

export const routerProducts = express.Router();
routerProducts.use(bodyParser.json());
routerProducts.use(express.json());

export const productManager = new ProductManager('./src/api/products.json');

routerProducts.get('/', async (req, res) => {
  let { limit, page, sort, query } = req.query;
  try {
    const products = await productService.findAll(limit, page, query, sort);

    return res.status(200).json({
      status: 'succesfull',
      msg: 'Product list',
      data: {
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.prevLink,
        nextLink: products.nextLink,
      },
    });
  } catch (err) {
    return res.status(500).json({ status: 'Error', msg: 'Something went wrong', data: { err } });
  }
});

routerProducts.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const productById = await productService.findById(id);
    productById
      ? res.status(200).json({ status: 'succesfull', msg: 'Product by id', data: productById })
      : res.status(404).json({ status: 'Unsuccesfull', msg: `Product with the id:${id} does not exist`, data: {} });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'Error', msg: err });
  }
});

routerProducts.post('/', async (req, res) => {
  try {
    const { title, description, category, price, thumbnail, code, stock, status } = req.body;
    const newProduct = await productService.createProduct(title, description, category, price, thumbnail, code, stock, status);
    if (newProduct) {
      return res.status(201).json({ status: 'succesfull', msg: 'Product added to the list', data: newProduct });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'Unsuccesfull', msg: 'Creation process failed', data: err });
  }
});

routerProducts.delete('/:id', async (req, res) => {
  const pid = req.params.id;

  try {
    const productDelete = await productService.deleteProduct(pid);
    if (productDelete) {
      console.log(productDelete);
      return res.status(204).header(`X-Product-Message`, 'Product deleted successfully').end();
    } else {
      throw new Error(`Product with the id:${pid} does not exist`);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ status: 'error', msg: `Product with the id:${pid} do not match a product`, data: 'Error 404' });
  }
});

routerProducts.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const toUpdate = req.body;
  try {
    const updateProduct = await productService.updateProduct(productId, toUpdate);
    updateProduct
      ? res.status(200).json({ status: 'succesfull', msg: 'product updated', data: toUpdate })
      : res.status(500).json({ status: 'ERROR 500', msg: 'Updating process of product was unsuccesfull' });
  } catch (err) {
    return res.status(500).json({ status: 'Error', msg: err });
  }
});
