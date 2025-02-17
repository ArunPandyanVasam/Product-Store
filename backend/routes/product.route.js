import express from "express";
// import mongoose from "mongoose";
// import Product from "../models/product.model.js";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controller/product.controller.js";

const router = express.Router();


router.get("/", getProducts);

// route
router.post("/", createProduct);

// patch ->
// put -> 
router.put("/:id", updateProduct);


router.delete("/:id", deleteProduct);


export default router;