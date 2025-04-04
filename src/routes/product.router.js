import { Router } from "express";
import ProductModel from "../models/product.model.js";

const router = Router();


//crear
router.post('/', async (req, res) => {
    try {

        const newProduct = new ProductModel(req.body);
        console.log("nuevo producto:", newProduct)
        await newProduct.save();
        res.redirect("/")
    } catch (error) {

        console.error("Error al crear producto:", error);
        res.status(500).json({ message: "Error al crear producto", error: error.message });

    }
    })


// read
//Ver un solo producto
router.get('/:cod', async (req, res) => {
    try{
        const product = await ProductModel.findOne({cod: req.params.cod}).lean();
        if(!product){
            return res.render('error',{error: "Producto no encontrado"})
        }
        res.render('product', {product});
    }catch(error){
        console.error(error);
        return res.render('error',{error: "Error al obtener el producto solicitado"})
    }
})



    //borrar producto por ID
    router.delete('/:pid', async (req, res) => {
        try {
            const productoElminiar = await ProductModel.findByIdAndDelete(req.params.pid);
            if (!productoElminiar) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.redirect('/');
            console.log(`Producto ${productoElminiar.nombre} con ID ${req.params.pid} eliminado`);
        } catch (error) {
            console.error({error})
            return res.render('error',{error:"error al eliminar producto"})
        }
    })

    export default router;