import fs from 'fs';

const productos= []

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