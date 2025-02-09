import  {dirname} from "path";
import {fileURLToPath} from "url";


// Generando Id unico para cada producto/user
export function generarIdAleatorio(longitud = 10) {
    if (longitud < 10) {
        longitud = 5; // Establece la longitud mínima
    }

    //set para almacenar resultados unicos en este caso ID
    const idGenerados = new Set()

    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';

    do{
    for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        resultado += caracteres[indiceAleatorio];
    }
} while (idGenerados.has/resultado)
//Si no se repite lo almacena y si se repite lo vuelve a generar
    idGenerados.add(resultado)
    return resultado;
}


//-------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

