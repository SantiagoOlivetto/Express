
const socket = io();
const addProductForm = document.getElementById('addProductForm')
const deleteProductForm = document.getElementById('deleteProductForm')


addProductForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const category = document.getElementById('category').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    const code = document.getElementById('code').value
    const stock = document.getElementById('stock').value
    const status = document.getElementById('status').value

    const newProduct = {title, description, category, price, thumbnail, code, stock, status}

    return socket.emit('addProduct', newProduct)
})

socket.on('productAdded', async (addedProduct) => {
    const renderProduct = await addedProduct
    return location.reload()
    
    // This method is good to have instant rendering for no refreshing constantly (polyfill), 
    // for example a real-time chat,
    // but in these case i would stick with refreshing the page for adding a product to a list since is not as demanding as a  live-chat.

    /* const listContainer = document.getElementById('cardList');
    const addedProductCard = document.createElement('div');
    addedProductCard.classList.add('card')
    listContainer.appendChild(addedProductCard)

    const productTitle = document.createElement('h3')
    productTitle.classList.add('productTitle')
    productTitle.textContent = renderProduct.title;
    addedProductCard.appendChild(productTitle);

    const productDescription = document.createElement('p')
    productDescription.classList.add('productDescription')
    productDescription.textContent = renderProduct.description;
    addedProductCard.appendChild(productDescription)

    const productPrice = document.createElement('p')
    productPrice.classList.add('productPrice')
    productPrice.textContent = renderProduct.price + '$';
    addedProductCard.appendChild(productPrice) */

})

deleteProductForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const productId = document.getElementById('productId').value
    socket.emit('deleteProduct', productId)
})

socket.on('productDeleted', (deletedProduct) => {  
    location.reload()

    alert(`You deleted the item ${deletedProduct} succesfully!`);
})


