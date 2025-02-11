import  {dirname} from "path";
import {fileURLToPath} from "url";
import fs from 'fs/promises';

let productos = [];
let usuarios = [];

async function cargarDatos() {
    const productosData = await fs.readFile('./src/data/products.json', 'utf-8');
    const usuariosData = await fs.readFile('./src/data/users.json', 'utf-8');

    productos = JSON.parse(productosData);
    usuarios = JSON.parse(usuariosData);
}

await cargarDatos();

export function generarIdAleatorio(longitud = 10) {

    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';

    const idExiste = (id) => {
        return  productos.some(producto => producto.id === id) ||
                usuarios.some(usuario => usuario.id === id);
    };

    do {
        resultado = '';
        for (let i = 0; i < longitud; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
            resultado += caracteres[indiceAleatorio];
        }
    } while (idExiste(resultado));

    return resultado;
}



//-------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;


























// import  {dirname} from "path";
// import {fileURLToPath} from "url";


// // Generando Id unico para cada producto/user
// export function generarIdAleatorio(longitud = 10) {
//     if (longitud < 10) {
//         longitud = 5; // Establece la longitud mínima
//     }

//     //set para almacenar resultados unicos en este caso ID
//     const idGenerados = new Set()

//     const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let resultado = '';

//     do{
//     for (let i = 0; i < longitud; i++) {
//         const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
//         resultado += caracteres[indiceAleatorio];
//     }
// } while (idGenerados.has/resultado)
// //Si no se repite lo almacena y si se repite lo vuelve a generar
//     idGenerados.add(resultado)
//     return resultado;
// }


// //-------------------------------------------------------------------------

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// export default __dirname;

