const addToCart_btn = document.querySelector('.addToCart-btn');
addToCart_btn.addEventListener('click', (evt) => {
  evt.preventDefault();
  const productId = evt.target.dataset.productId;
  fetch(`/carts/${productId}`, {
    method: 'POST',
    headers: {
      'conten-Type': 'application/json',
    },
    body: JSON.stringify(productId),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.success ? (window.location.href = '/products') : false;
    })
    .catch((error) => {
      console.error('Error creating cart:', error);
    });
});
