import fs from 'fs'
import { __dirname, apiProductsPath, apiCartsPath, __filename } from '../utils/utils.js'

export const getProductById = (id) => {
    const product = JSON.parse(fs.readFileSync(apiProductsPath, "utf-8"))
    const productFound = product.find((product) => product.id == id)
    return productFound ? productFound : false
    }


export default class CartManager {
    constructor (path) {
        this.carts = [],
        this.path = path
        fs.existsSync(this.path) == false ? fs.writeFileSync(this.path, JSON.stringify(this.carts)) : console.log('carts.json') 
    }
    #idGenerator() {
        let idGenerated = 0
        for (let i = 0; i < this.carts.length; i++) {
            const cart = this.carts[i];
            cart.id > idGenerated ? idGenerated = cart.id : false
        }
        return ++idGenerated
    }

    lastCart = async () => {
        let cartList = this.carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
        const lastIndex = this.carts.length -1
        const cart = this.carts[lastIndex]
        return cart
    }

    getCartById = async (cartId) => {
        this.carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
        const cartFound = this.carts.find((cart) => cart.id == cartId)
        return cartFound ? cartFound : false
    }

    createCart = async () => {
        this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        const products = []
        const id = this.#idGenerator()
        const newCart = {id, products}
        this.carts = [...this.carts, newCart]
        return await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
    }

    addProductCart = async (cid, pid) => {
    this.carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
    const cartFound = this.carts.find((cart) => cart.id == cid)
    const productsOnCart = cartFound.products
    const productExist = productsOnCart.find((product)=> product.id == pid)
    if (productExist) {
        productExist.quantity += 1
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts)) 
        return productExist

    }else {

        if (cartFound) {
            const productFound = getProductById(pid)
            const {title, id} = productFound
            const addProduct = {title: title, id: id, quantity: 1}
            cartFound.products = [...cartFound.products, addProduct]
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts)) 
            return cartFound.products
        }
    }
    }
}

const cartManager = new CartManager (apiCartsPath)



