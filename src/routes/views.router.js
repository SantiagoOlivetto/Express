import express from 'express';
import { productManager } from './products.routes.js';

export const viewRouter = express.Router();

viewRouter.get('/realtimeproducts', async (req, res) => {
    const products = await  productManager.getProducts()
    return res.render("realTimeProducts", {
       title: "Product list",
       style: 'realTimeProducts.css',
       products
    })
})




