import mongoose from "mongoose";


const productCollection = "product";
const productSchema = new mongoose.Schema({
    cod: {type: Number, required: true, unique: true},
    nombre : {type: String, required: true},
    precio : {type: Number, required: true},
    stock : {type: Number, required: false},
    categoria : {type: String, required: true},
})

const ProductModel = mongoose.model(productCollection, productSchema);

export default ProductModel;