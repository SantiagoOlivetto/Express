import express from 'express';
import { productManager } from './products.routes.js';

export const routerViewProducts = express.Router();

routerViewProducts.get('/:pid', async (req, res) => {
    const pid = req.params.pid
    const product = await  productManager.getProductById(pid)
    return res.render("productId", {
        style: 'product.css',
        product
    })
})
routerViewProducts.get('/', async (req, res) => {
    const products = await  productManager.getProducts()
    return res.render("products", {
       title: "Product list",
       style: 'realTimeProducts.css',
       products
    })
})