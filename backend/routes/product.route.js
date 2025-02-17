import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";

const router = express.Router();


router.get("/", async (req, res) => {  // end-point
    try {
        const products = await Product.find({}); //fetch all  // import Product
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("error in fetching products", error.message);
        res.status(500).json({ success:false, message: "Server Error" });
    }
});

// route
router.post("/", async (req, res) => { // end-point // asynchronous controller function (async)
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
router.put("/:id", async (req, res) => {
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


router.delete("/:id", async (req, res) => { // end-point
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


export default router;