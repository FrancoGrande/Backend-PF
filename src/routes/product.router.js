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
    router.get('/', async (req, res) => {
        try{
            let products = await ProductModel.find();
            res.render('products', {products : products.map( product => product.toObject())});
        }catch(error){
            return res.json({message: error})
        }
    })

    export default router;