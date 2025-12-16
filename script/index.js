async function main() {
  const products = await fetchProducts();
  createProductList(products);
  createCartSummary(products);
}

main();

async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/carts/12");
    const data = await response.json();
    return data.products;
  } catch (err) {
    console.log(err);
  }
}

function createProductList(products) {
  const productList = document.getElementById("product-list");
  products.forEach((product) => {
    const { title, price, quantity, total, thumbnail } = product;
    const li = document.createElement("li");
    li.classList.add("product-container");
    li.innerHTML = `
		<img src="${thumbnail}" alt="${title}" />
		<h3>${title}</h3>
		<div>${price}</div>
		<button style="height: 20px">-</button>
		${quantity}
		<button style="height: 20px">+</button>
		${total}
		<button  style="height: 20px">x</button>
		`;
    productList.appendChild(li);
  });
}

function createCartSummary(products) {
  const totalProducts = products.length;
  const totalQuantity = products.reduce(
    (acc, { quantity }) => acc + quantity,
    0,
  );
  const totalPrice = products.reduce((acc, { total }) => acc + total, 0);
}
