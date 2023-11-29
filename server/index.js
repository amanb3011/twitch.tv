import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./src/routes/authRoutes.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || process.env.API_PORT;

connectDB();

const app = express();

app.use(express.json()); //body parser

app.use(cors());

app.get("/", (req, res) => res.send("API IS RUNNING"));

app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
