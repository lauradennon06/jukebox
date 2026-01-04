import express from "express";
import {
  createPlaylist,
  getPlaylistById,
  getPlaylists,
} from "#db/queries/playlists";
import {
  createPlaylistTrack,
  getPlaylistTrack,
} from "#db/queries/playlists_tracks";
import { getTrackByPlaylistId, getTrackById } from "#db/queries/tracks";

const router = express.Router();

router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

router.post("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Missing request body");

  const { name, description } = req.body;
  if (!name || !description)
    return res.status(400).send("Requires name and description");

  const playlist = await createPlaylist(name, description);
  res.status(201).send(playlist);
});

router.param("id", async (req, res, next, id) => {
  const numId = Number(id);
  if (Number.isNaN(numId)) return res.status(400).send("Invalid id");
  const playlist = await getPlaylistById(numId);
  if (!playlist) return res.status(404).send("Playlist not found");
  req.playlist = playlist;
  next();
});

router.get("/:id", async (req, res) => {
  res.send(req.playlist);
});

router.get("/:id/tracks", async (req, res) => {
  const tracks = await getTrackByPlaylistId(req.playlist.id);
  res.send(tracks);
});

router.post("/:id/tracks", async (req, res) => {
  if (!req.body) return res.status(400).send("Missing request body");

  const { trackId } = req.body;
  if (trackId === undefined) return res.status(400).send("Requires trackId");
  if (Number.isNaN(Number(trackId)))
    return res.status(400).send("Invalid trackId");

  const numTrackId = Number(trackId);
  // ensure track exists
  const track = await getTrackById(numTrackId);
  if (!track) return res.status(400).send("Track does not exist");

  // ensure not already in playlist
  const existing = await getPlaylistTrack(req.playlist.id, numTrackId);
  if (existing) return res.status(400).send("Track already in playlist");

  const playlistTrack = await createPlaylistTrack(req.playlist.id, numTrackId);
  res.status(201).send(playlistTrack);
});

export default router;
