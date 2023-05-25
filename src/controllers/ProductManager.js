// File system module
import fs from "fs";

// Array de productos
export default class ProductManager {

    constructor (path) 
    {
        this.products = [],
        this.path = path
        fs.existsSync(this.path) == false ? fs.writeFileSync(this.path, JSON.stringify(this.products)) : console.log(`products.json`) 
    }
    #idGenerator() {
        let idGenerated = 0
        for (let i = 0; i < this.products.length; i++) {
            const product = this.products[i];
            product.id > idGenerated ? idGenerated = product.id : false
        }
        return ++idGenerated
    }
    async addProducts (title, description, category, price, thumbnail, code, stock, status) {

        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        let newProduct
        const id = this.#idGenerator()
        this.status = true;

         // Validations 
        this.title = title || false 
        this.description = description || false
        this.price = price || false
        this.thumbnail = thumbnail || "No image"
        this.stock = stock || false

        const codeCheck = (product) => {
            const codeExist = this.products.some(p => p.code == product)
            if (codeExist) {
                throw new Error ("This code already exist")
            }else{
                return product
            }
        }
        code = codeCheck(code)
        
        if (title == false) {
            newProduct = "Error by completing title, please try again"
            return console.log(newProduct)
        }
        if (description == false) {
            console.log(description);
            newProduct = "Error by completing description, please try again"
            return console.log(newProduct)
        }
        if (price == false) {
            newProduct = "Error by completing price, please try again"
            return console.log(newProduct)
        }
        if (stock == false) {
            newProduct = "Error by completing stock, please try again"
            return console.log(newProduct)
        }

        newProduct = {title, description, category, price, thumbnail, code, stock, status, id}
        this.products = [...this.products, newProduct]
        await fs.promises.writeFile(this.path, JSON.stringify(this.products))

        return newProduct
    }
    async getProducts() {
      const productList = this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
      return productList
    }
    async getProductById (id) {
        this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
        const productFound = this.products.find((product) => product.id == id)
        return productFound ? productFound : false
    }
    async deleteProduct(pId) {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8")) 
        
        const product = this.products.find(p =>  p.id.toString() === pId.toString())
        if (product) {
            this.products.splice(this.products.indexOf(product), 1)
            fs.writeFileSync(this.path, JSON.stringify(this.products))
            return product;
        }else {
            console.log("second run");
            return false;
        }
    }
    async updateProduct(id, key, value) {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        const productFound = this.products.find((product) => product.id == id)

        if (key == "id") {
            return false
        }else{
            productFound[key] = value
            const updatedProduct = productFound

            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            console.log(updatedProduct)  
            return true

        }
    } 
    
}
export const productManager = new ProductManager("./src/api/products.json")


