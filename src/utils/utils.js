import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(path.dirname(__filename));
export const apiProductsPath = __dirname + '/api/products.json';
export const apiCartsPath = __dirname + '/api/carts.json';

// BCRYPT-----------------------------------------------
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);
