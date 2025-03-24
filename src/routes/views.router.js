import {Router} from "express";
import ProductModel from "../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
const elementosPorPagina =  req.query.page ?? 10;
const pagActual = req.query.page ?? 1;

        let infoPaginate = await ProductModel.paginate({}, { limit: elementosPorPagina, page: pagActual });

        // const products = await ProductModel.find().lean(); // usamos lean() para convertir los documentos en objetos JavaScript sin usar .toObject() en cada elemento // PROYECTO CON MONGODB NUBE
        res.render("index", { info: infoPaginate });

        console.log(infoPaginate);
        infoPaginate.docs = infoPaginate.docs.map((doc) => doc.toObject());
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    });


export default router;