import mongoose, { Schema, model } from 'mongoose';

const usersSchema = mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  dob: { type: String, require: true },
  password: { type: String, require: true },
  cart: { type: Schema.Types.ObjectId, ref: 'carts', required: false },
  role: { type: String, default: 'client' },
});

export const UsersModel = model('users', usersSchema);
