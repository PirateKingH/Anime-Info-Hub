import express from "express";
import * as controller from "../controllers/animeController.js";
const router = express.Router();

router.get("/", controller.getAllAnime);
router.get("/:id", controller.getAnimeById);
router.post("/", controller.createAnime);
router.put("/:id", controller.updateAnime);
router.delete("/:id", controller.deleteAnime);

export default router;
