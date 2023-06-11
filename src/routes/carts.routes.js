import  express  from "express";
import CartManager from "../controllers/CartManager.js";
import { cartsService } from "../services/carts.service.js";

export const routerCarts = express.Router()
routerCarts.use(express.json())
routerCarts.use(express.urlencoded({extended: true}))

const cartManager = new CartManager("./src/api/carts.json");

routerCarts.get('/', async (req, res) => {
    try {
        const carts = await cartsService.findAll()
        return res.status(200).json({status: "succesfull", msg: "Product list", data: carts})
    }catch (err){
        return res.status(500).json({status: "Error", msg: "Something went wrong", data: {err}})
    }
})

routerCarts.get('/:id', async (req, res) => {
    const cartId = req.params.id
    try{
        const cartByID = await cartsService.findById(cartId)
        return cartByID ? res.status(200).json({status: "succesfull", msg: "Product by id", data: cartByID}) : res.status(404).json({status: "ERROR 404", msg: "Problem: Searching for product by id", data: `The id ${cartId} do not match any product`})
    }catch (err) {
        console.log(err);
        return res.status(500).json({status: "Failed", msg:"Something went wrong", data: err})
    }
})

routerCarts.post('/', async (req, res) => {
    try{
        const newCart = await cartsService.createCart()
        return newCart ?  res.status(201).json({status: "succesfull", msg: "Cart succesfully created", data: newCart}) : res.status(500).json({status: "ERROR 500", msg: "Creating cart process failed", data: `No cart created`})
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({status: "Error", msg: err})
    }
})

routerCarts.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid
    try{
        const addProdToCart = await cartsService.addProdtoCart(cartId, productId)
        return addProdToCart ? res.status(201).json({status: "succesfull", msg:"Product succesfully added to cart", data: addProdToCart}) : res.status(500).json({status: "ERROR 500", msg: "adding product process failed", data: "no product added to cart"}) 
    }catch (err) {
        console.log(err);
        return res.status(500).json({status: "Error", msg: err})
    }
    
    
})
