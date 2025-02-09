import { generarIdAleatorio } from "../utils.js";


let users = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@example.com' },
    { id: 2, nombre: 'Ana Gómez', email: 'ana.gomez@example.com' },
];

// Controladores básicos
const getAll = (req, res) => {
    res.json(users);
};

const getById = (req, res) => {
    const id = generarIdAleatorio()
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
};

const create = (req, res) => {
    const nuevoUsuario = {
        id: generarIdAleatorio() + 1,
        ...req.body
    };

    users.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
};

const update = (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    users[userIndex] = { id, ...req.body };
    res.json(users[userIndex]);
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
};

export default{
    getAll,
    getById,
    create,
    update,
    delete: deleteUser
};