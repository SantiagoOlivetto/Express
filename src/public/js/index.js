
const socket = io();
const addProductForm = document.getElementById('addProductForm')
const deleteProductForm = document.getElementById('deleteProductForm')


addProductForm.addEventListener('submit', (event) => {

    const title = document.getElementById('productTitle').value
    const description = document.getElementById('productDescription').value
    const category = document.getElementById('productCategory').value
    const price = document.getElementById('productPrice').value
    const thumbnail = document.getElementById('productThumbnail').value
    const code = document.getElementById('productCode').value
    const stock = document.getElementById('productStock').value
    const status = document.getElementById('productStatus').value

    const newProduct = {title, description, category, price, thumbnail, code, stock, status}
    socket.emit('addProduct', newProduct)
})

deleteProductForm.addEventListener('submit', (event) => {
    const productId = document.getElementById('productId').value
    socket.emit('deleteProduct', productId)
})


