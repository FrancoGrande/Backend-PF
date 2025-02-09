import fs from 'fs';
import path from 'path';
import __dirname from '../utils.js';  // Para obtener el directorio base del proyecto

// Ruta dinámica hacia el archivo JSON
const filePath = path.join(__dirname, 'data', 'products.json');


const initializeFile = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]');  // Crea el archivo con un array vacío
    }
};

const getAll = () => {
    initializeFile();
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data || '[]');  // Evita errores si el archivo está vacío
};

const saveAll = (products) => {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
};

export default {
    getAll,
    getById: (id) => {
        const products = getAll();
        return products.find(product=> product.id === id) || null;
    },
    create: (product) => {
        const products = getAll();
        products.push(product);
        saveAll(products);
        return product;
    },
    update: (id, data) => {
        const products = getAll();
        const index = products.findIndex(product=> product.id === id);
        if (index === -1) return null;
        products[index] = { ...products[index], ...data };
        saveAll(products);
        return products[index];
    },
    delete: (id) => {
        let products = getAll();
        products = products.filter(product=> product.id !== id);
        saveAll(products);
    }
};
