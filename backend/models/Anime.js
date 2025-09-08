import mongoose from "mongoose";

const AnimeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: Number,
  characters: [String],
  storyline: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Anime", AnimeSchema);
