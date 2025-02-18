//import routing, helps to route
import express from "express"; 
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";


// import Product from "./models/product.model.js";
// import mongoose from "mongoose";


dotenv.config(); //.envfile

// using express function for the port entry
const app = express(); 
const PORT = process.env.PORT || 5000; // getting PORT from .env file


app.use(express.json()); // allows us to accept JSON data in the reqbody

app.use("/api/products", productRoutes); // route for API products



//console.log(process.env.MONGO_URI);
// using app variable we will listen on port
app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT); 
});


// 9YeveJA0wTcN2pWI
//  mongodb+srv://arunpandyanv:9YeveJA0wTcN2pWI@cluster0.h0qvk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0