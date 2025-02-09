let productos = [
    { id: 1, nombre: 'Producto 1', precio: 100 },
    { id: 2, nombre: 'Producto 2', precio: 200 },
];

// Controladores básicos
const getAll = (req, res) => {
    res.json(productos);
};

const getById = (req, res) => {
    const id = generarIdAleatorio()
    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
};

const create = (req, res) => {
    const nuevoProducto = {
        id: generarIdAleatorio() + 1,
        ...req.body
    };

    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
};

const update = (req, res) => {
    const id = parseInt(req.params.id);
    const productoIndex = productos.findIndex(p => p.id === id);

    if (productoIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    productos[productoIndex] = { id, ...req.body };
    res.json(productos[productoIndex]);
};

const deleteProducto = (req, res) => {
    const id = parseInt(req.params.id);
    const productoIndex = productos.findIndex(p => p.id === id);

    if (productoIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    productos.splice(productoIndex, 1);
    res.status(204).send();
};

export default {
    getAll,
    getById,
    create,
    update,
    delete: deleteProducto
};