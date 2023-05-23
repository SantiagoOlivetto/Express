import express from 'express';
import ProductManager from '../public/js/ProductManager.js';
import { productManager } from './products.routes.js';

export const routerViewProducts = express.Router();

routerViewProducts.get('/:pid', async (req, res) => {
    const pid = req.params.pid
    const product = await  productManager.getProductById(pid)
    return res.render("productId", {
        product
    })
})
routerViewProducts.get('/', async (req, res) => {
    const products = await  productManager.getProducts()
    console.log(products);
    return res.render("products", {
       title: "Product list",
       products
    })
})