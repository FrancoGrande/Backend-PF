/** Ejemplo de resultados de paginación */
import productsModel from './models/product.model';
import mongoose from 'mongoose';

const mongoURL = 'mongodb://127.0.0.1:27017/miPrimerDB';

const environment = async () => {
await mongoose.connect(mongoURL);

let products = await productsModel.paginate(
{},
{
limit: 10,
page: 1,
sort: { nombre: -1} 
}
);

console.log(products);
}

environment();