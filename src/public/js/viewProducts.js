document.addEventListener('DOMContentLoaded', () => {
  const addTocartBtn = document.querySelectorAll('.addToCart-btn');

  addTocartBtn.forEach((button) => {
    button.addEventListener('click', async (evt) => {
      const productId = evt.target.dataset.productId;
      window.location.href = `/products/${productId}`;
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
