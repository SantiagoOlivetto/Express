import mongoose, { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = mongoose.Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true },
  category: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true, max: 100 },
  code: { type: String, required: true, max: 100, unique: true },
  stock: { type: Number, required: true },
  status: { type: Boolean, required: true },
});

productsSchema.plugin(mongoosePaginate);

export const ProductsModel = model('products', productsSchema);
