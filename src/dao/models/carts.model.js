import { Schema, model } from 'mongoose';

export const CartsModel = model(
    "carts",
  new Schema({
    products: {
        type: [
            {
              product: {
                type: Schema.Types.ObjectId,
                ref: 'products',
              },
            },
          ],
          default: [],
    }
})
);

