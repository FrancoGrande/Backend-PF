import {Router} from "express";
import ProductModel from "../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const elementosPorPagina = parseInt(req.query.limit) || 5;
        const pagActual = parseInt(req.query.page) || 1;
        const categoriaFiltro = req.query.categoria;
    
        let filtro = {};
    
        if (categoriaFiltro) {
            filtro.categoria = categoriaFiltro;
        }
    
        const infoPaginate = await ProductModel.paginate(filtro, {
            limit: elementosPorPagina,
            page: pagActual,
            lean: true
        });
    
        res.render('index', {
            info: infoPaginate,
            categoria: req.query.categoria || ""
          });;
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    });

export default router;