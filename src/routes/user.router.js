import { Router } from "express";
import userManager from "../managers/userManagerPersistance.js";
import { generarIdAleatorio } from "../utils.js";


const router = Router();

// Rutas CRUD de usuarios
router.get('/', (req, res) => {
    res.json(userManager.getAll());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const user = userManager.getById(id);

    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
});

router.post('/', (req, res) => {
    const nuevoUsuario = {
        id: generarIdAleatorio(),
        ...req.body
    };

    userManager.create(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const usuarioActualizado = userManager.update(id, req.body);

    if (!usuarioActualizado) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuarioActualizado);
});

router.delete('/:id', (req, res) => {
    userManager.delete(req.params.id);
    res.status(204).send();
});

export default router;