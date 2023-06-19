import { ProductsModel } from '../dao/models/products.model.js';

class ProductsService {
  async deleteProduct(id) {
    const deletedProduct = await ProductsModel.findByIdAndDelete(id);
    return deletedProduct;
  }
  async findAll(limit, page, query, sort) {
    const options = {
      limit: limit || 3,
      page: page || 1,
      query: query || {},
      sort: sort || {},
    };
    let filterList = {};
    if (query === 'true' || query === 'false') {
      filterList = { status: query };
    } else {
      if (query) {
        filterList = { category: query };
      }
    }
    const products = await ProductsModel.paginate(filterList, options);

    const linksMaker = () => {
      let prevLink = '';
      let nextLink = '';

      products.hasNextPage ? (nextLink = `http://localhost:8080/api/products?page=${products.nextPage}`) : (nextLink = null);
      products.hasPrevPage ? (prevLink = `http://localhost:8080/api/products?page=${products.prevPage}`) : (prevLink = null);
      products.prevLink = prevLink;
      products.nextLink = nextLink;
      return products;
    };
    linksMaker();

    return products;
  }
  async findById(id) {
    const productById = await ProductsModel.findById(id);
    return productById;
  }
  async createProduct(title, description, category, price, thumbnail, code, stock, status) {
    const data = { title, description, category, price, thumbnail, code, stock, status };
    const newProduct = await ProductsModel.create(data);
    return newProduct;
  }
  async updateProduct(id, toUpdate) {
    const productUpdate = await ProductsModel.findByIdAndUpdate(id, toUpdate);
    return productUpdate;
  }
}

export const productService = new ProductsService();
