import db from "#db/client";

export async function addTrackToPlaylist(playlistId, trackId) {
  const sql = `
    INSERT INTO playlists_tracks (playlist_id, track_id)
    VALUES ($1, $2)
    RETURNING *
  `;
  const {
    rows: [playlistTrack],
  } = await db.query(sql, [playlistId, trackId]);
  return playlistTrack;
}

export { addTrackToPlaylist as createPlaylistTrack };

export async function getPlaylistTrack(playlistId, trackId) {
  const sql = `
    SELECT *
    FROM playlists_tracks
    WHERE playlist_id = $1 AND track_id = $2
  `;
  const { rows: [playlistTrack] = [] } = await db.query(sql, [
    playlistId,
    trackId,
  ]);
  return playlistTrack;
}
