import mongoose, { Schema, model } from 'mongoose';

const cartSchema = mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'products',
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
});

/* cartSchema.pre('find', function () {
  this.populate('products.product');
}); */
/* cartSchema.pre('findById', function () {
  this.populate('products', 'title');
}); */

export const CartsModel = model('carts', cartSchema);
