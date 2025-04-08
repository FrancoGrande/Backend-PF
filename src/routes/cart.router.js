import { Router } from "express";
import Cart from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";

const router = Router();

//  ver carrito
router.get('/:cid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid)
        .populate('products.product')
        .lean();
        
        if (!cart) return res.status(404).render('error', { error: 'Carrito no encontrado' });
        let total = 0
        cart.products.forEach(p => {
            total += p.product.precio * p.quantity;
        });
        res.render('cart', { cart, total });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { error: 'Error al obtener el carrito' });
    }




});



// Crear un nuevo carrito vacío
router.post('/', async (req, res) => {
    try {
        const nuevoCarrito = await Cart.create({ products: [] });

        console.log("🛒 Nuevo carrito creado:", nuevoCarrito._id);
        res.redirect(`/cart/${nuevoCarrito._id}`); // te lleva directo al carrito nuevo
    } catch (error) {
        console.error("Error al crear carrito:", error);
        res.status(500).json({ message: 'Error al crear carrito', error: error.message });
    }
});

// Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
    
        console.log("cid:", cid);
        console.log("pid:", pid);
    
        const carrito = await Cart.findById(cid);
        if (!carrito) {
            console.log("Carrito no encontrado");
            return res.status(404).send('Carrito no encontrado');
        }
    
        const producto = await ProductModel.findById(pid);
        if (!producto) {
            console.log("Producto no encontrado");
            return res.status(404).send('Producto no encontrado');
        }
    
        console.log("🛒 Carrito antes:", carrito.products);
    
        const productoEnCarrito = carrito.products.find(p => p.product.toString() === pid);
    
        if (productoEnCarrito) {
            productoEnCarrito.quantity += 1;
            console.log("Producto ya estaba. Nueva cantidad:", productoEnCarrito.quantity);
        } else {
            carrito.products.push({ product: pid, quantity: 1 });
            console.log("Producto agregado al carrito");
        }
        
        await carrito.save();
        console.log("Carrito después:", carrito.products);
    
        res.redirect(`/cart/${cid}`);
        } catch (error) {
        console.error(" ERROR FINAL:", error);
        res.status(500).send('Error al agregar producto al carrito');
        }
    });
    


    router.delete('/:cid/product/:pid', async (req, res) => {
        try {
            const { cid, pid } = req.params;
        
            const carrito = await Cart.findById(cid);
            if (!carrito) return res.status(404).send('Carrito no encontrado');
        
            const productoEnCarrito = carrito.products.find(p => p.product.toString() === pid);
            if (!productoEnCarrito) return res.status(404).send('Producto no está en el carrito');
        
            if (productoEnCarrito.quantity > 1) {
                productoEnCarrito.quantity -= 1;
                console.log("Producto restado. Nueva cantidad:", productoEnCarrito.quantity);
            } else {
                carrito.products = carrito.products.filter(p => p.product.toString() !== pid);
                console.log("Producto eliminado del carrito");
            }
        
            await carrito.save();
            res.redirect(`/cart/${cid}`);
            } catch (error) {
            console.error("Error al eliminar/restar producto:", error);
            res.status(500).send('Error al eliminar producto del carrito');
            }
        });
        

export default router;