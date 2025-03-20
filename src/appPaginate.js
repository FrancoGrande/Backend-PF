/** Ejemplo de resultados de paginación */
import productsModel from './models/product.model';
import mongoose from 'mongoose';

const mongoURL = 'mongodb://localhost:27017/usuarios';

const environment = async () => {
await mongoose.connect(mongoURL);

let products = await productsModel.paginate(
{}, //Filtros de los datos, si mandamos {} es que no filtramos por nada y obtenemos todo
{
limit: 10,
page: 1,
sort: { nombre: -1} //Orden descendente por last_name
//Cuando se ordena por strings primero ordena por Mayúsculas y luego por minúsculas
}
);

console.log(products);
}

environment();