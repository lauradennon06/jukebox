DROP TABLE IF EXISTS playlists_tracks;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS tracks;

/*if either a playlist or a track is deleted, the deletion should cascade to all related playlists_tracks records*/

CREATE TABLE tracks (
    id serial PRIMARY KEY,
    name text NOT NULL,
    duration_ms integer NOT NULL
);

CREATE TABLE playlists (
    id serial PRIMARY KEY,
    name text NOT NULL,
    description text NOT NULL
);

CREATE TABLE playlists_tracks (
    id serial PRIMARY KEY,
    playlist_id integer REFERENCES playlists(id) ON DELETE CASCADE,
    track_id integer REFERENCES tracks(id) ON DELETE CASCADE
);