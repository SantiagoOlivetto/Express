import { CartsModel } from "../dao/models/carts.model.js";

class CartsService {
    async createCart() {
        const newCart = await CartsModel.create({ products: [] })
         return newCart  
    }
    async findAll() {
        const findAll = await CartsModel.find()
        return findAll
    }
    async findById(id) {
        const findCart = await CartsModel.findById(id).populate('products.product')
        return findCart
    }
    async addProdtoCart(cId, pId){
        const cart = await CartsModel.findById(cId)
        const addedProductOnCart = cart.products.addToSet(pId)
        await cart.save();
        return addedProductOnCart
    }
}

export const cartsService = new CartsService()