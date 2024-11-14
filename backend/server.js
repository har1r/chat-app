import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";


const app = express(); // membuat objek/instance dengan memanggil fungsi bukan class sehingga tidak perlu pakai keyword new
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); //to parse the incoming request with JSON payloads (from req.body)
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
});
