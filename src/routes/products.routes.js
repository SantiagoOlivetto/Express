import  express  from "express"
import ProductManager from "../ProductManager.js";

import bodyParser from "express"

export const routerProducts = express.Router()
routerProducts.use(bodyParser.json());
routerProducts.use(express.json())

const productManager = new ProductManager("./src/api/products.json");

routerProducts.get('/',async (req, res) => {
    const productList = await productManager.getProducts()
    const limit = req.query.limit
    const limitedList = productList.slice(0, limit)


    return res.status(200).json({status: "succesfull", msg: "Product list", data: limitedList})
})

routerProducts.get('/:id', async (req, res) => {
    const productId = req.params.id
    const productByID = await productManager.getProductById(productId)
    return productByID ? res.status(200).json({status: "succesfull", msg: "Product by id", data: productByID}) : res.status(404).json({status: "ERROR 404", msg: "Problem: Searching for product by id", data: `The id ${productId} do not match any product`})
})

routerProducts.post('/', async (req, res) => {
    const {title, description, category, price, thumbnail, code, stock, status} = req.body
    const newProduct = await productManager.addProducts(title, description, category, price, thumbnail, code, stock, status)
    res.status(201).json({status: "succesfull", msg: "Product added to the list", data: newProduct})
})

routerProducts.delete('/:id', async (req, res) => {
    const productId = req.params.id
    const deleteProduct = productManager.deleteProduct(productId)
    const productList = await productManager.getProducts()
    console.log(productList);
    return deleteProduct == true ? res.status(200).json({status: "succesfull", msg: "Product deleted", data: productList}) : res.status(404).json({status: "ERROR 404", msg: "Problem: Searching for product by id", data: `The id ${productId} do not match any product`})
})

routerProducts.put('/:id', async (req, res) => {
    const productId = req.params.id
    const toUpdate = req.body
    const key = Object.keys(toUpdate)
    const newValue = Object.values(toUpdate)
    const updateProduct = await productManager.updateProduct(productId, key[0],newValue[0]);
    return updateProduct ? res.status(200).json({status: "succesfull", msg: "product updated", data: toUpdate}) : res.status(500).json({status: "ERROR 500", msg: "Updating process of product was unsuccesfull"})
})