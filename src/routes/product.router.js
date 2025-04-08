import { Router } from "express";
import ProductModel from "../models/product.model.js";

const router = Router();


//crear
router.post('/', async (req, res) => {
    try {

        if (!req.body.nombre || !req.body.precio || !req.body.categoria) {
            return res.status(400).send("Falta completar campos");
        }
        if (req.body.precio < 1) {
            return res.status(400).send("El precio no puede ser 0 o negativo");
        }

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

router.put('/:pid', async (req, res) => {
    try {
        const productoActualizado = await ProductModel.findByIdAndUpdate(
            req.params.pid,
            req.body,
            { new: true, runValidators: true }
        );

        if (!productoActualizado) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        if (req.body.precio < 1) {
            return res.status(400).send("El precio no puede ser 0 o negativo");
        }

        if (req.body.stock < 1) {
            return res.status(400).send("El stock no puede ser negativo");
        }

        console.log(`Producto actualizado:`, productoActualizado);
        res.redirect('/');
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
    }
});

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