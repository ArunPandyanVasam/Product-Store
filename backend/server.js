//import routing, helps to route
import express from "express"; 
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";


dotenv.config();

// using express function for the port entry
const app = express(); 


app.use(express.json()); // allows us to accept JSON data in the reqbody

app.get("/api/products", async (req, res) => {  // end-point
    try {
        const products = await Product.find({}); //fetch all
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("error in fetching products", error.message);
        res.status(500).json({ success:false, message: "Server Error" });
    }
});

// route
app.post("/api/products", async (req, res) => { // end-point // asynchronous controller function (async)
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
        console.error("error in creating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }

});

// patch ->
// put -> 
app.put("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = req.body; // update name, image, price


    if (!mongoose.Types.ObjectId.isValid) {
        return res.status(404).json({ success: false, message: "Invalid Product ID" })
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({ success: true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });

    }

});


app.delete("/api/products/:id", async (req, res) => { // end-point
    const { id } = req.params;
    //console.log("id:", id);

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.log("error in deleting product:", error.message);
        res.status(404).json({ success: false, message: "Product not Found" });
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