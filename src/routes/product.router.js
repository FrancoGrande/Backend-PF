//puntos de acceso productos

import {Router} from "express";
import productoController from "../controller/product.controller.js";


const router = Router();

// const products= []
// //obtener un producto
// router.get('/', (req, res) => {
//     res.send({products})
// })
// // crear producto
// router.post('/', (req, res) => {
//     const newProduct =  req.body;
//     products.push(newProduct);
//     res.status(201).json({message:"producto creado"})
// })

// router.put('/', (req, res) => {
//     res.send("12312")
// })

// router.delete('/api/productos:id', (req, res) => {
//     res.send("zxczxc")
// })


router.get('/', productoController.getAll);           // Obtener todos los productos
router.get('/:id', productoController.getById);        // Obtener un producto por ID
router.post('/', productoController.create);           // Crear un nuevo producto
router.put('/:id', productoController.update);         // Actualizar un producto por ID
router.delete('/:id', productoController.delete);      // Eliminar un producto por ID



export default router;