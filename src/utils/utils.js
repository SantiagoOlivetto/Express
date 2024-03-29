import path from 'path';
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(path.dirname(__filename));
export const apiProductsPath = __dirname + '/api/products.json';
export const apiCartsPath = __dirname + '/api/carts.json';
