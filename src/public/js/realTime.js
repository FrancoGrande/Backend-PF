

const socket = io('http://localhost:8080');

// Renderiza productos
function renderProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    
    if (products.length === 0) {
        productList.innerHTML = '<li>⚠️ No hay productos cargados.</li>';
    } else {
        products.forEach((product) => {
            const li = document.createElement('li');
            li.textContent = `🆔 ${product.id}: ${product.nombre} - 💵 $${product.precio}`;
            productList.appendChild(li);
        });
    }
}

socket.on('products', (products) => {
    renderProducts(products);
});

// Agrega producto
document.getElementById('addForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const id = Date.now();

    const newProduct = { id, nombre, precio };

    console.log (newProduct);

    socket.emit('addProduct', { id, nombre, precio });
    e.target.reset();
});

// Elimina producto
document.getElementById('deleteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = parseInt(document.getElementById('deleteId').value);
    socket.emit('deleteProduct', id);
    e.target.reset();
});
