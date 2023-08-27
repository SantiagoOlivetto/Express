const proceed_btn = document.getElementById('proceed_btn');
if (proceed_btn) {
  proceed_btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    const cid = evt.target.dataset.cid;
    const data = { cid: cid };
    fetch(`/carts/${cid}/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        return data.success ? (window.location.href = `/orders/${data.oid}`) : false;
      })
      .catch((err) => {
        return err;
      });
  });
}
