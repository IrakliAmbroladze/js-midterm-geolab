function main() {
  const demo = document.getElementById("demo");
  demo.textContent = "we are starting";
  fetchProducts();
}

main();

async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/carts/12");
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
