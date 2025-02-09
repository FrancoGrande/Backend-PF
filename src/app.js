import express from "express";
import productRouter from "./routes/product.router.js";
import userRouter from "./routes/user.router.js";
import __dirname from "./utils.js";


const app = express();

// middlewares para analizar el cuerpo de las solicitudes
app.use(express.json()) //para poder recibir json
app.use(express.urlencoded({ extended: true })) //para recibir informacion


//iniciando servidor
app.listen(8080, () => {
    console.log("Servidor funcionando en el puerto 8080");




})


app.use("/api/product", productRouter) 
app.use("/api/user", userRouter) 

app.use('/static',express.static(__dirname + '/public'));




console.log(__dirname)