//import routing, helps to route
import express from "express"; 
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";


dotenv.config();

// using express function for the port entry
const app = express(); 


// route
app.post("api/products", async (req, res) => {
    const product = req.body;   // user will send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    // new Product -> coming from product.model.js and product -> body got from user
    const newProduct = new Product(product);  

    try {
        await newProduct.save(); // save them to database
        res.status(201).json({ success: true, data: newProduct}); // 201 -> something created, data ->return new product
    } catch (error) {
        console.error("Error in create product:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }

});

//console.log(process.env.MONGO_URI);
// using app variable we will listen on port
app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000"); 
});


// 9YeveJA0wTcN2pWI
//  mongodb+srv://arunpandyanv:9YeveJA0wTcN2pWI@cluster0.h0qvk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0