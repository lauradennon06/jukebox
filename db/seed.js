import db from "#db/client";

import { createTrack } from "#db/queries/tracks";
import { createPlaylist } from "#db/queries/playlists";
import { addTrackToPlaylist } from "#db/queries/playlists_tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // Create 20 tracks
  for (let i = 1; i <= 20; i++) {
    // provide a duration in milliseconds (e.g., 2-4 minutes)
    const duration = 120000 + Math.floor(Math.random() * 180000);
    await createTrack("Track " + i, duration);
  }

  // Create 10 playlists
  for (let i = 1; i <= 10; i++) {
    await createPlaylist("Playlist " + i, "Description for Playlist " + i);
  }

  // Add random tracks to playlists
  for (let i = 1; i <= 15; i++) {
    const numberOfTracks = 3 + Math.floor(Math.random() * 5); // Each playlist gets between 3 to 7 tracks
    const playlistId = 1 + Math.floor(Math.random() * 10);
    const trackIds = new Set();
    while (trackIds.size < numberOfTracks) {
      const trackId = 1 + Math.floor(Math.random() * 20);
      trackIds.add(trackId);
    }
    for (const trackId of trackIds) {
      await addTrackToPlaylist(playlistId, trackId);
    }
  }
}
