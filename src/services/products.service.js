import { ProductsModel } from '../dao/models/products.model.js';

class ProductsService {
  async deleteProduct(id) {
    const deletedProduct = await ProductsModel.findByIdAndDelete(id);
    return deletedProduct;
  }
  async findAll(limit, page, query, sort) {
    let options = {};
    if (limit === 'false') {
      options = {
        page: page || 1,
        query: query || {},
        sort: sort || {},
      };
    } else {
      options = {
        limit: limit || 3,
        page: page || 1,
        query: query || {},
        sort: sort || {},
      };
    }
    let filterList = {};
    if (query === 'true' || query === 'false') {
      filterList = { status: query };
    } else {
      if (query) {
        filterList = { category: query };
      }
    }
    const products = await ProductsModel.paginate(filterList, options);
    console.log(products);

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

    const productsColl = products.docs.map((doc) => doc.toJSON());
    products.prevLink != null ? (products.prevLink = products.prevLink.replace('/api', '')) : products.prevLink;
    products.nextLink != null ? (products.nextLink = products.nextLink.replace('/api', '')) : products.nextLink;
    products.arrPages = [];
    for (let i = 1; i <= products.totalPages; i++) {
      products.arrPages.push(i);
    }
    const prodPag = {
      totalDocs: products.totalDocs,
      limit: products.limit,
      totalPages: products.totalPages,
      page: products.page,
      pagingCounter: products.pagingCounter,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      prevLink: products.prevLink,
      prevLink: products.prevLink,
      nextLink: products.nextLink,
      arrPages: products.arrPages,
    };

    const prodPayload = { productsColl, prodPag };

    return prodPayload;
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
