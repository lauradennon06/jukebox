import express from "express";
import { getTracks, getTrackById } from "#db/queries/tracks";

const router = express.Router();

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).send("Invalid id");
  const track = await getTrackById(id);
  if (!track) return res.status(404).send("Track not found");
  res.send(track);
});

export default router;
