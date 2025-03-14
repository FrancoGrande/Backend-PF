// Renderiza productos desde backend
async function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    try {
        const response = await fetch('/api/product');
        const products = await response.json();

        if (products.length === 0) {
            productList.innerHTML = '<li>⚠️ No hay productos cargados.</li>';
        } else {
            products.forEach((product) => {
                const li = document.createElement('li');
                li.textContent = `🆔 ${product._id}: ${product.nombre} - 💵 $${product.precio}`;
                productList.appendChild(li);
            });
        }
    } catch (error) {
        productList.innerHTML = '<li>Error al cargar productos.</li>';
        console.error("Error:", error);
    }
}

// Ejecutar al cargar la página
renderProducts();

// Agrega producto vía POST
document.getElementById('addForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value);

    try {
        const response = await fetch('/api/product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, precio })
        });

        if (response.ok) {
            renderProducts();
            e.target.reset();
        } else {
            console.error("Error al agregar producto:", await response.json());
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

// Elimina producto por ID vía DELETE
document.getElementById('deleteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('deleteId').value;

    try {
        const response = await fetch(`/api/product/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            renderProducts();
            e.target.reset();
        } else {
            console.error("Error al eliminar producto:", await response.json());
        }
    } catch (error) {
        console.error("Error:", error);
    }
});