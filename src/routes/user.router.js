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

    try {
        const user = userManager.getById(id);
        res.json(user);

    } catch (error) {
        return res.status(404).json({ error: 'Usuario no encontrado', error });
    }

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
    try {
        res.json(usuarioActualizado);
    } catch (error) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

});

router.delete('/:id', (req, res) => {
    
    const result =userManager.delete(req.params.id);
    res.status(result.status).send(result.message);
});

export default router;