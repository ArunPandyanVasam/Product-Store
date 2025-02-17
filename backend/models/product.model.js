import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image : {
        type: String,
        required: true
    },
}, {
    timestamps: true //createdAt, updatedAt
});


// Create product model
const Product = mongoose.model('Product', productSchema); // collection, schema
// Product -> products

// export to use in other files
export default Product;