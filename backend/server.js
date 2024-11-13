import express from "express";
import dotenv from "dotenv";

// app merupakan instance atau objek dari sebuah factory "express" function
// yang digunakan untuk membuat dan mengembalikan objek tanpa
// menggunakan keyword new seperti di class
const app = express();

dotenv.config();