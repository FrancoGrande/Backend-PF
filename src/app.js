import express from 'express';
import handlebars from 'express-handlebars';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import __dirname from './utils.js';
import { config } from './config/config.js';
import viewsRouter from './routes/views.router.js';
import productRouter from './routes/product.router.js';
import methodOverride from 'method-override';
import ProductModel from './models/product.model.js';
import cartRouter from './routes/cart.router.js';

const app = express(); //inicializo app para usar express


//configuraciones para trabajar con
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.engine('handlebars', engine({
    helpers: {
        ifCond: function (v1, v2, options) {
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        }
        }
    }));

app.use(express.static(__dirname + '/public'));

const mongoURL = 'mongodb://127.0.0.1:27017/miPrimerDB';


const environment = async () => {
mongoose.connect(config.MONGO_URL)
    .then(() => {
        console.log('Conexión a la base de datos establecida: ', config.MONGO_URL);

    })
    .catch((error) => {
        console.log('Error al conectar a la base de datos:', error);
        process.exit();
    });

}
environment();

// mongoose.connect(config.MONGO_URL)
//     .then(() => {
//         console.log('Conexión a la base de datos establecida: ', config.MONGO_URL);

//     })
//     .catch((error) => {
//         console.log('Error al conectar a la base de datos:', error);
//         process.exit();
//     });

app.listen(config.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${config.PORT}`);
});



app.use(methodOverride('_method'));


app.use('/', viewsRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);

