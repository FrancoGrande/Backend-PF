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

        res.render('cart', { cart });
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
    
        console.log("🧪 cid:", cid);
        console.log("🧪 pid:", pid);
    
        const carrito = await Cart.findById(cid);
        if (!carrito) {
            console.log("❌ Carrito no encontrado");
            return res.status(404).send('Carrito no encontrado');
        }
    
        const producto = await ProductModel.findById(pid);
        if (!producto) {
            console.log("❌ Producto no encontrado");
            return res.status(404).send('Producto no encontrado');
        }
    
        console.log("🛒 Carrito antes:", carrito.products);
    
        const productoEnCarrito = carrito.products.find(p => p.product.toString() === pid);
    
        if (productoEnCarrito) {
            productoEnCarrito.quantity += 1;
            console.log("🔁 Producto ya estaba. Nueva cantidad:", productoEnCarrito.quantity);
        } else {
            carrito.products.push({ product: pid, quantity: 1 });
            console.log("🆕 Producto agregado al carrito");
        }
    
        await carrito.save();
        console.log("✅ Carrito después:", carrito.products);
    
        res.redirect(`/cart/${cid}`);
        } catch (error) {
        console.error("❌ ERROR FINAL:", error);
        res.status(500).send('Error al agregar producto al carrito');
        }
    });
    


// Eliminar un carrito
router.delete('/:cid', async (req, res) => {
    try {
        const carritoEliminado = await Cart.findByIdAndDelete(req.params.cid);
        if (!carritoEliminado) return res.status(404).json({ message: 'Carrito no encontrado' });

        res.redirect('/');
    } catch (error) {
        console.error("Error al eliminar carrito:", error);
        res.status(500).json({ message: "Error al eliminar carrito", error: error.message });
    }
});

export default router;