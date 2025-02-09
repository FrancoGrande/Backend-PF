import { Router } from "express";
import productManager from "../managers/productManagerPersistance.js";
import { generarIdAleatorio } from "../utils.js";

const router = Router();

// Rutas CRUD de productos
router.get('/', (req, res) => {
    res.json(productManager.getAll());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const producto = productManager.getById(id);

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
});

router.post('/', (req, res) => {
    const nuevoProducto = {
        id: generarIdAleatorio(),
        ...req.body
    };

    productManager.create(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const productoActualizado = productManager.update(id, req.body);

    if (!productoActualizado) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(productoActualizado);
});

router.delete('/:id', (req, res) => {
    productManager.delete(req.params.id);
    res.status(204).send();
});

export default router;