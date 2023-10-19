async function editProduct(productId) {
    const title = document.getElementById(`title-${productId}`).value;
    const description = document.getElementById(`description-${productId}`).value;
    const price = document.getElementById(`price-${productId}`).value;
    const code = document.getElementById(`code-${productId}`).value;
    const category = document.getElementById(`category-${productId}`).value;

    const updatedProduct = {
        title,
        description,
        price,
        code,
        category,
    };

    try {
        const response = await fetch(`/api/products/edit/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
            const updatedProductData = await response.json();
            updateProductUI(productId, updatedProductData);
        } else {
            console.error('Error al editar el producto:', response.statusText);
        }
    } catch (error) {
        console.error('Error al editar el producto:', error);
    }
}

async function deleteProduct(productId) {
    try {
        const response = await fetch(`/api/products/delete/${productId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const deletedProductData = await response.json();
            const productContainer = document.getElementById(`product-${productId}`);
            productContainer.remove(); // Eliminar el elemento de la lista
        } else {
            console.error('Error al eliminar el producto:', response.statusText);
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
}

function updateProductUI(productId, updatedProductData) {
    const productContainer = document.getElementById(`product-${productId}`);
    const titleElement = productContainer.querySelector('.product-title');
    const descriptionElement = productContainer.querySelector('.product-description');
    const priceElement = productContainer.querySelector('.product-price');
    const codeElement = productContainer.querySelector('.product-code');
    const categoryElement = productContainer.querySelector('.product-category');

    titleElement.textContent = updatedProductData.title;
    descriptionElement.textContent = updatedProductData.description;
    priceElement.textContent = `Precio: ${updatedProductData.price}`;
    codeElement.textContent = `Código: ${updatedProductData.code}`;
    categoryElement.textContent = `Categoría: ${updatedProductData.category}`;
}
async function addNewProduct(event) {
    event.preventDefault();

    const newProduct = {
        title: document.getElementById('new-title').value,
        description: document.getElementById('new-description').value,
        price: parseFloat(document.getElementById('new-price').value),
        code: document.getElementById('new-code').value,
        category: document.getElementById('new-category').value,
    };

    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });

        if (response.ok) {
            const addedProductData = await response.json();
            appendNewProduct(addedProductData);
            location.reload();
        } else {
            console.error('Error al agregar el producto:', response.statusText);
        }
    } catch (error) {
        console.error('Error al agregar el producto:', error);
    }
}

function appendNewProduct(productData) {
    const productList = document.querySelector('ul');
    const newProductItem = document.createElement('li');
    newProductItem.id = `product-${productData._id}`;
    newProductItem.innerHTML = `
<h3 class="product-title">${productData.title}</h3>
<p class="product-description">${productData.description}</p>
<p class="product-price">Precio: ${productData.price}</p>
<p class="product-code">Código: ${productData.code}</p>
<p class="product-category">Categoría: ${productData.category}</p>
<form onsubmit="editProduct('${productData._id}')">
<!-- ...Campos de edición... -->
<button type="submit">Guardar Cambios</button>
</form>
<button onclick="deleteProduct('${productData._id}')">Eliminar</button>
`;
    productList.appendChild(newProductItem);
}