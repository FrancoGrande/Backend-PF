//puntos de acceso productos

import {Router} from "express";
import userController from "../controller/user.controler.js";


const router = Router();

let users = []

router.get('/', userController.getAll);             // Obtener todos los usuarios
router.get('/:id', userController.getById);          // Obtener un usuario por ID
router.post('/', userController.create);             // Crear un nuevo usuario
router.put('/:id', userController.update);           // Actualizar un usuario por ID
router.delete('/:id', userController.delete);        // Eliminar un usuario por ID

export default router;