import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import animeRoutes from "./routes/animeRoutes.js";
import { connectDB } from "./config/db.js"; // <-- use import

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/anime", animeRoutes);
app.get("/", (req, res) => res.send("Anime Info Hub API is running"));

// Connect to MongoDB and start server
(async () => {
  try {
    await connectDB(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/anime_info_hub");
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
})();
