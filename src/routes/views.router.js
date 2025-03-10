import { Router } from 'express';
import products from '../data/products.js';

const router = Router();

router.get('/', (req, res) => {
    res.render('home', { products });
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

export default router;