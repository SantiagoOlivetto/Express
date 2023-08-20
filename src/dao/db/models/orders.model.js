import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const ordersSchema = mongoose.Schema({
  code: {
    type: String,
    default: () => nanoid(10).toUpperCase(),
    unique: true,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, required: true },
  amount: { type: Number, default: null, required: true },
  emittedBy: { type: String, required: true },
  cart: { type: Schema.Types.ObjectId, ref: 'carts', required: true },
  status: { type: Boolean, default: true },
});

export const OrdersModel = model('orders', ordersSchema);
