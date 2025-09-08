import Anime from "../models/Anime.js";

export async function getAllAnime(req, res) {
  try {
    const { search, year } = req.query;
    const filter = {};
    if (year) filter.year = parseInt(year);
    if (search) {
      const rx = new RegExp(search, "i");
      filter.$or = [{ title: rx }, { storyline: rx }, { characters: rx }];
    }
    const list = await Anime.find(filter).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAnimeById(req, res) {
  try {
    const a = await Anime.findById(req.params.id);
    if (!a) return res.status(404).json({ message: "Not found" });
    res.json(a);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createAnime(req, res) {
  try {
    const { title, year, characters, storyline } = req.body;
    const arr = Array.isArray(characters) ? characters : (characters ? characters.split(",").map(s=>s.trim()) : []);
    const item = await Anime.create({ title, year, characters: arr, storyline });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateAnime(req, res) {
  try {
    const update = req.body;
    if (update.characters && typeof update.characters === "string") {
      update.characters = update.characters.split(",").map(s => s.trim());
    }
    const updated = await Anime.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteAnime(req, res) {
  try {
    const removed = await Anime.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
