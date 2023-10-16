const socket = io();
const addProductForm = document.getElementById('addProductForm');
const deleteProductForm = document.getElementById('deleteProductForm');

addProductForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const price = document.getElementById('price').value;
  const thumbnail = document.getElementById('thumbnail').value;
  const code = document.getElementById('code').value;
  const stock = document.getElementById('stock').value;
  const status = document.getElementById('status').value;

  const newProduct = { title, description, category, price, thumbnail, code, stock, status };

  return socket.emit('addProduct', newProduct);
});

socket.on('productAdded', async (addedProduct) => {
  const renderProduct = await addedProduct;
  return location.reload();
});

deleteProductForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const productId = document.getElementById('productId').value;
  socket.emit('deleteProduct', productId);
});

socket.on('productDeleted', (deletedProduct) => {
  location.reload();
  !deletedProduct ? alert(`Product not found`) : alert(`You deleted the item ${deletedProduct} succesfully!`);
});
