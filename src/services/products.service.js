import { ProductsModel } from "../dao/models/products.model.js";


class ProductsService {

    async deleteProduct(id) {
        const deletedProduct = await ProductsModel.findByIdAndDelete(id)
        return deletedProduct;
    }
    async findAll() {
        const products = await ProductsModel.find({})
        return products
    }
    async findById(id) {
        const productById = await ProductsModel.findById(id)
        return productById
    }
    async createProduct(title, description, category, price, thumbnail, code, stock, status) {
        const data = {title, description, category, price, thumbnail, code, stock, status}
        const newProduct = await ProductsModel.create(data);
        return newProduct
    }
    async updateProduct(id, toUpdate) {
        const productUpdate = await ProductsModel.findByIdAndUpdate(id,toUpdate)
        return productUpdate
    }
}

export const productService = new ProductsService();