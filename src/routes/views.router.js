import {Router} from "express";
import ProductModel from "../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const products = await ProductModel.find().lean(); // usamos lean() para convertir los documentos en objetos JavaScript sin usar .toObject() en cada elemento
        res.render("index", { products });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    });


export default router;