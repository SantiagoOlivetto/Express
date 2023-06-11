import { Schema, model } from "mongoose"; 

export const ProductsModel = model (
    "products",
    new Schema ({
        title: {type: String, required: true, max:100},
        description: {type: String, required: true},
        category: {type: String, required: true, max: 100},
        price: {type: Number, required: true},
        thumbnail: {type: String, required: true, max: 100},
        code: {type: String, required: true, max: 100, unique: true},
        stock: {type: Number, required: true},
        status: {type: Boolean, required: true},
    })
)