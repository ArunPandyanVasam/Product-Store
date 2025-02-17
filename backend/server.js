//import routing, helps to route
import express from "express"; 
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";


// import Product from "./models/product.model.js";
// import mongoose from "mongoose";


dotenv.config();

// using express function for the port entry
const app = express(); 


app.use(express.json()); // allows us to accept JSON data in the reqbody

app.use("/api/products", productRoutes);



//console.log(process.env.MONGO_URI);
// using app variable we will listen on port
app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000"); 
});


// 9YeveJA0wTcN2pWI
//  mongodb+srv://arunpandyanv:9YeveJA0wTcN2pWI@cluster0.h0qvk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0