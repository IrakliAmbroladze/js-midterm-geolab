async function main() {
  let products = await fetchProducts();
  createProductList(products);
  createCartSummary(products);

  async function fetchProducts() {
    try {
      const response = await fetch("https://dummyjson.com/carts/18");
      const data = await response.json();
      return data.products;
    } catch (err) {
      console.log(err);
    }
  }

  function createProductList(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products.forEach((product) => {
      const { id, title, price, quantity, total, thumbnail } = product;
      const li = document.createElement("li");
      li.classList.add("cart-item");
      li.id = `li-${id}`;

      const imgElement = document.createElement("img");
      imgElement.src = thumbnail;
      imgElement.alt = title;
      imgElement.classList.add("thumbnail");

      const h3Element = document.createElement("h3");
      h3Element.textContent = title;
      const priceDiv = document.createElement("div");
      priceDiv.textContent = price.toFixed(2);
      priceDiv.classList.add("item-price");

      const titlePriceContainerDiv = document.createElement("div");
      titlePriceContainerDiv.append(h3Element, priceDiv);

      const leftPartDiv = document.createElement("div");
      const rightPartDiv = document.createElement("div");
      leftPartDiv.append(imgElement, titlePriceContainerDiv);
      leftPartDiv.classList.add("cart-left-part");

      const minusBtn = document.createElement("button");
      minusBtn.textContent = "-";
      minusBtn.addEventListener("click", () => decreaseQuantity(product.id));
      minusBtn.classList.add("btn");

      const plusBtn = document.createElement("button");
      plusBtn.textContent = "+";
      plusBtn.addEventListener("click", () => increaseQuantity(product.id));
      plusBtn.classList.add("btn");

      const quantitySpan = document.createElement("span");
      quantitySpan.textContent = quantity;
      quantitySpan.id = `qty-${id}`;
      quantitySpan.classList.add("item-qty");

      const totalSpan = document.createElement("span");
      totalSpan.textContent = total.toFixed(2);
      totalSpan.id = `total-${id}`;
      totalSpan.classList.add("item-total");

      const clearBtn = document.createElement("button");
      clearBtn.textContent = "x";
      clearBtn.addEventListener("click", () => deleteItem(product.id));
      clearBtn.classList.add("clear-btn");

      rightPartDiv.append(minusBtn, quantitySpan, plusBtn, totalSpan, clearBtn);
      rightPartDiv.classList.add("cart-right-part");
      li.append(leftPartDiv, rightPartDiv);
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
    document.getElementById("total-products").textContent = totalProducts;
    document.getElementById("total-qty").textContent = totalQuantity;
    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
  }

  function deleteItem(id) {
    products = products.filter((p) => p.id !== id);
    const product = products.find((p) => p.id === id);
    if (!product) {
      document.getElementById(`li-${id}`).remove();
    }
    createCartSummary(products);
  }

  function decreaseQuantity(id) {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    if (product.quantity === 1) {
      products = products.filter((p) => p.id !== id);
      document.getElementById(`li-${id}`).remove();
      createCartSummary(products);
    } else {
      products = products.map((p) =>
        p.id === id
          ? {
              ...p,
              quantity: p.quantity - 1,
              total: (p.quantity - 1) * p.price,
            }
          : p,
      );
      createCartSummary(products);
    }
    const updatedProduct = products.find((p) => p.id == id);
    document.getElementById(`qty-${id}`).textContent = updatedProduct.quantity;
    document.getElementById(`total-${id}`).textContent =
      updatedProduct.total.toFixed(2);
  }

  function increaseQuantity(id) {
    products = products.map((p) =>
      p.id === id
        ? { ...p, quantity: p.quantity + 1, total: (p.quantity + 1) * p.price }
        : p,
    );
    const updatedProduct = products.find((p) => p.id == id);
    document.getElementById(`qty-${id}`).textContent = updatedProduct.quantity;
    document.getElementById(`total-${id}`).textContent =
      updatedProduct.total.toFixed(2);
    createCartSummary(products);
  }

  const search = document.getElementById("search");

  search.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filteredData = products.filter((product) =>
      product.title.toLowerCase().includes(value),
    );

    createProductList(filteredData);
  });

  document
    .getElementById("refreshBtn")
    .addEventListener("click", () => window.location.reload());
}

main();
