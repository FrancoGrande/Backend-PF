import fs from 'fs';

const filePath = './data/productos.json';  // Archivo JSON para persistencia

export default {
    getAll: () => {
        if (!fs.existsSync(filePath)) return [];
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    },
    saveAll: (productos) => {
        fs.writeFileSync(filePath, JSON.stringify(productos, null, 2));
    },
};