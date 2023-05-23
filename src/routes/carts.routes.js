import  express  from "express";
import CartManager from "../public/js/CartManager.js";
import { getProductById } from "../public/js/CartManager.js";

export const routerCarts = express.Router()
routerCarts.use(express.json())
routerCarts.use(express.urlencoded({extended: true}))

const cartManager = new CartManager("./src/api/carts.json");

routerCarts.get('/:id', async (req, res) => {
    const cartId = req.params.id
    const cartByID = await cartManager.getCartById(cartId)
    return cartByID ? res.status(200).json({status: "succesfull", msg: "Product by id", data: cartByID}) : res.status(404).json({status: "ERROR 404", msg: "Problem: Searching for product by id", data: `The id ${cartId} do not match any product`})
})

routerCarts.post('/', async (req, res) => {
    const newCart = await cartManager.createCart()
    newCart
    const cartCreated = await cartManager.lastCart()
    return cartCreated ? res.status(201).json({status: "succesfull", msg: "Cart succesfully created", data: cartCreated}) : res.status(500).json({status: "ERROR 500", msg: "Creating cart process failed", data: `No cart created`})
})

routerCarts.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid
    const productOnCart = await cartManager.addProductCart(cartId, productId)
    return productOnCart ? res.status(201).json({status: "succesfull", msg:"Product succesfully added to cart", data: productOnCart}) : res.status(500).json({status: "ERROR 500", msg: "adding product process failed", data: "no product added to cart"}) 
    
})
