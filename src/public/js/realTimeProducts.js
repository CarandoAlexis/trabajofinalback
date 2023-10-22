const socket = io();
socket.on("connect", () => {
});

document.getElementById("productForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const title = formData.get("title");
  const description = formData.get("description");
  const price = formData.get("price");
  const thumbnail = formData.get("thumbnail");
  const code = formData.get("code");
  const category = formData.get("categoria");
  const product = { title, description, price, thumbnail, code, category };
  socket.emit("createProduct", product);
  event.target.reset();
});

// Recibir los productos existentes al cargar la página
socket.on("currentProducts", (products) => {
  const productList = document.getElementById("productList");
  if (!productList) {
    return;
  }

  // Limpiar la lista de productos existente
  productList.innerHTML = "";

  // Agregar los productos existentes a la lista
  products.forEach((product) => {
    const productItem = document.createElement("li");
    productItem.innerHTML = `
          <h2>${product.title}</h2>
          <p>Descripcion de Producto: ${product.description}</p>
          <p>Precio: ${product.price}</p>
          <p>Código: ${product.code}</p>
          <p>Categoria: ${product.category}</p>
        `;
    productList.appendChild(productItem);
  });
});

socket.on("newProduct", (product) => {

  const productList = document.getElementById("productList");
  if (!productList) {
    return;
  }

  const productItem = document.createElement("li");
  productItem.innerHTML = `
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>Precio: ${product.price}</p>
        <p>Código: ${product.code}</p>
        <p>Categoria: ${product.category}</p>
      `;

  productList.appendChild(productItem);
});
