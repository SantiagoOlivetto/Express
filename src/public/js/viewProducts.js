document.addEventListener('DOMContentLoaded', () => {
  const addTocartBtn = document.querySelectorAll('.addToCart-btn');

  addTocartBtn.forEach((button) => {
    button.addEventListener('click', async (evt) => {
      const productId = evt.target.dataset.productId;
      fetch(`api/carts/64858900a8f825ac34addd54/product/${productId}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Producto agregado al carrito:', data);
        })
        .catch((err) => {
          console.error('Error adding product to cart:', err);
        });
    });
  });
});

// Pagination config for UI
const selectElement = document.getElementById('pageSelect');
selectElement.value = currentPage;

selectElement.addEventListener('change', () => {
  let selectedPage = selectElement.value;
  window.location.href = `http://localhost:8080/products?page=${selectedPage}`;
});
