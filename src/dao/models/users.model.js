import mongoose, { model } from 'mongoose';

const usersSchema = mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  dob: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String, default: 'client' },
});

export const UsersModel = model('users', usersSchema);
