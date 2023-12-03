import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./src/routes/authRoutes.js";
import connectDB from "./src/config/db.js";
import channelRoutes from "./src/routes/channelRoutes.js";
import settingsRoutes from "./src/routes/settingsRoutes.js";

const PORT = process.env.PORT || process.env.API_PORT;

connectDB();

const app = express();

app.use(express.json()); //body parser

app.use(cors());

app.get("/", (req, res) => res.send("API IS RUNNING"));

app.use("/api/auth", authRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/settings", settingsRoutes);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
