import ProductManager from "./ProductManager.js";
import express from "express";
const app = express();
const port = 8080
app.use(express.urlencoded({extended: true}))


const productManager = new ProductManager("./src/products.json");

app.get('/', (req, res) => {
    res.status(200).send( "Welcome to my product manager API")
})
app.get('/products',async (req, res) => {
    const productList = await productManager.getProducts()
    const limit = req.query.limit
    const limitedList = productList.slice(0, limit)


    return res.status(200).json({status: "succesfull", msg: "Product list", data: limitedList})
})

app.get('/products/:id', async (req, res) => {
    const productId = req.params.id
    const productByID = await productManager.getProductById(productId)
    return productByID ? res.status(200).json({status: "succesfull", msg: "Product by id", data: productByID}) : res.status(404).json({status: "ERROR 404", msg: "Problem: Searching for product by id", data: `The id ${productId} do not match any product`})
})

app.delete('/products/:id', (req, res) => {
    const productId = req.params.id
    const deleteProduct = productManager.deleteProduct(productId)
    const productList = productManager.getProducts()
    return deleteProduct == true ? res.status(200).json({status: "succesfull", msg: "Product deleted", data: productList}) : res.status(404).json({status: "ERROR 404", msg: "Problem: Searching for product by id", data: `The id ${productId} do not match any product`})
})

app.listen(port, ()=> {
    console.log(`Example app listening on port ${port}`);
})

app.get('*', (req, res) => {
    res.status(404).send("ERROR 404 : The website you were trying to reach couldn't be found on the server.")
})

