const placeOrderBtn = document.getElementById('placeOrderBtn');

placeOrderBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  const oid = evt.target.dataset.oid;
  fetch(`/orders/${oid}/confirmation`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ oid: oid }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.success ? (window.location.href = `/orders/${oid}/confirmation`) : false;
    })
    .catch((err) => {
      return err;
    });
});
