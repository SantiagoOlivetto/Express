const updateForm = document.getElementById('updateProductForm');
const update_btn = document.getElementById('update-btn');
const title = document.getElementById('title');
const description = document.getElementById('description');
const price = document.getElementById('price');
const category = document.getElementById('category');
const code = document.getElementById('code');
const stock = document.getElementById('stock');

update_btn.addEventListener('click', async (evt) => {
  evt.preventDefault();
  const updateData = { title: title.value, description: description.value, price: price.value, category: category.value, code: code.value, stock: stock.value };
  const productId = evt.target.dataset.productId;
  update_btn.disabled = true;

  fetch(`/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        setTimeout(() => {
          update_btn.disabled = false;
          console.log('Reload');
          location.reload();
        }, 1000);
      }
    })
    .catch((err) => {
      console.error('Error updating products:', err);
    });
});
