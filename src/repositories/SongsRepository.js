const pool = require('../database/db').pool;
const Song = require('../models/Song');
const InvalidInfoException = require('../models/InvalidInfoException');

async function insert(name, artist, music_link, thumbnail_link, priority, id_room) {
    const result = await pool.query(
    `INSERT INTO Songs (name, artist, music_link, thumbnail_link, priority, id_room)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *;`,
    [name, artist, music_link, thumbnail_link, priority, id_room]);

    return rowToObject(result.rows[0]);
}

async function findAllSongsFromRoom(id_room) {
    const result = await pool.query(
        `SELECT *
         FROM Songs
         WHERE id_room = ($1)
         ORDER BY priority ASC`,
        [id_room]);

    return resultToObjectList(result);
}

async function getNextSongPriority(id_room) {
    const result = await pool.query(
        `SELECT MAX(priority) priority
         FROM Songs
         WHERE id_room = ($1)`,
        [id_room]);

    return result.rows[0].priority + 1;
}

async function findSong(id_song, id_room) {
    const result = await pool.query(
        `SELECT *
         FROM Songs
         WHERE id_song = ($1)
         AND id_room = ($2)`,
        [id_song, id_room]);

    return rowToObject(result.rows[0]);
}

async function remove(id_song, id_room) {
    await pool.query(
        `DELETE FROM Songs
         WHERE id_song = ($1)
         AND id_room = ($2)`,
        [id_song, id_room]);
} 

function rowToObject(row) {
    if (!row)
        return null;

    return new Song({
        id_song: row.id_song ?? '', 
        name: row.name ?? '', 
        artist: row.artist ?? '', 
        music_link: row.music_link ?? '', 
        thumbnail_link: row.thumbnail_link ?? '', 
        priority: row.priority ?? '', 
        id_room: row.id_room ?? '', 
    });  
}

function resultToObjectList(result) {
    if (result.rows.length <= 0)
        throw new InvalidInfoException('Playlist does not have any songs.');

    let songs = []; 
    result.rows.forEach((row) => {
        songs.push(rowToObject(row));
    });

    return songs;
}

module.exports = {
    insert,
    findAllSongsFromRoom,
    findSong,
    getNextSongPriority,
    remove
}
