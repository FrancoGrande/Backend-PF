import fs from 'fs';
import path from 'path';
import __dirname from '../utils.js';  // Para obtener el directorio base del proyecto

// Ruta dinámica hacia el archivo JSON
const filePath = path.join(__dirname, 'data', 'users.json');

// Inicializa el archivo si no existe
const initializeFile = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]');  // Crea un archivo vacío con un array JSON
    }
};

// Obtiene todos los usuarios
const getAll = () => {
    initializeFile();
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data || '[]');
};

// Guarda todos los usuarios
const saveAll = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

export default {
    getAll,
    getById: (id) => {
        const users = getAll();
        return users.find(user => user.id === id) || null;
    },
    create: (user) => {
        const users = getAll();
        users.push(user);
        saveAll(users);
        return user;
    },
    update: (id, data) => {
        const users = getAll();
        const index = users.findIndex(user => user.id === id);
        if (index === -1) return null;
        users[index] = { ...users[index], ...data };
        saveAll(users);
        return users[index];
    },
    delete: (id) => {
        let users = getAll();
        users = users.filter(user => user.id !== id);
        saveAll(users);
    }
};

