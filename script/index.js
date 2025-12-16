async function main() {
  const demo = document.getElementById("demo");
  demo.textContent = "we are starting";
  const products = await fetchProducts();
  createProductList(products);
}

main();

async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/carts/15");
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
    li.innerHTML = `
		<img src="${thumbnail}" alt="${title}" width="100px" height="100px"/>
		<h3>${title}</h3>
		<div>${price}</div>
		<button>-</button>
		${quantity}
		<button>+</button>
		${total}
		<button>x</button>
		`;
    productList.appendChild(li);
  });
}
