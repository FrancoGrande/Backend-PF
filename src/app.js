import express from "express";
import productRouter from "./routes/product.router.js";
import userRouter from "./routes/user.router.js";
import __dirname from "./utils.js";
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import http from "http";



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*", 
    },
  });

// middlewares para analizar el cuerpo de las solicitudes
app.use(express.json()) //para poder recibir json
app.use(express.urlencoded({ extended: true })) //para recibir informacion
app.use('/static',express.static(__dirname + '/public'));


// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use("/api/product", productRouter) 
app.use("/api/user", userRouter) 
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io/client-dist/'));

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

// WebSockets
const products = []

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    // Lista de productos que enviamos
    socket.emit('products', products);

    // Agregar producto
    socket.on('addProduct', (product) => {
    products.push(product);
    io.emit('products', products);
    });

    // Eliminar producto
    socket.on('deleteProduct', (id) => {
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) products.splice(index, 1);
    io.emit('products', products);
    });
});


console.log(__dirname)


//iniciando servidor 
server.listen(8080, () => {
    console.log("Servidor funcionando en el puerto 8080");
})