import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


// const productCollection = "product";

const productCollection = "products";
const productSchema = new mongoose.Schema({
    cod: {type: Number, required: true, unique: true},
    nombre : {type: String, required: true},
    precio : {type: Number, required: true},
    stock : {type: Number, required: false},
    categoria : {type: String, required: true},
})

productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model(productCollection, productSchema);


export default ProductModel;