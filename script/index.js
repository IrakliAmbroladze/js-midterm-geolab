async function main() {
  let products = await fetchProducts();
  createProductList(products);
  createCartSummary(products);

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
      const { id, title, price, quantity, total, thumbnail } = product;
      const li = document.createElement("li");
      li.classList.add("product-container");

      const imgElement = document.createElement("img");
      imgElement.src = thumbnail;
      imgElement.alt = title;

      const h3Element = document.createElement("h3");
      h3Element.textContent = title;

      const priceDiv = document.createElement("div");
      priceDiv.textContent = price;
      const minusBtn = document.createElement("button");
      minusBtn.textContent = "-";
      minusBtn.style = "height: 20px";
      const plusBtn = document.createElement("button");
      plusBtn.textContent = "+";
      plusBtn.style = "height: 20px";
      plusBtn.addEventListener("click", () => increaseQuantity(product.id));

      const quantitySpan = document.createElement("span");
      quantitySpan.textContent = quantity;
      quantitySpan.id = `qty-${id}`;
      const totalSpan = document.createElement("span");
      totalSpan.textContent = total;
      totalSpan.id = `total-${id}`;

      const clearBtn = document.createElement("button");
      clearBtn.textContent = "x";
      clearBtn.style = "height: 20px";

      li.append(
        imgElement,
        h3Element,
        priceDiv,
        minusBtn,
        quantitySpan,
        plusBtn,
        totalSpan,
        clearBtn,
      );
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
    const summary = document.getElementById("summary");
    summary.innerHTML = `
<li>Total Products ${totalProducts}</li>
<li>Total Quantity ${totalQuantity}</li>
<li>Total Price ${totalPrice}</li>
`;
  }

  function increaseQuantity(id) {
    products = products.map((p) =>
      p.id === id
        ? { ...p, quantity: p.quantity + 1, total: (p.quantity + 1) * p.price }
        : p,
    );
    const updatedProduct = products.find((p) => p.id == id);
    document.getElementById(`qty-${id}`).textContent = updatedProduct.quantity;
    document.getElementById(`total-${id}`).textContent = updatedProduct.total;
  }
}

main();
