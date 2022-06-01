const pool = require('../database/db').pool
const Song = require('../models/Song');

async function insert(name, artist, music_link, thumbnail_link, priority, id_room) {
    const result = await pool.query(
    `INSERT INTO Songs (name, artist, music_link, thumbnail_link, priority, id_room)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *;`,
    [name, artist, music_link, thumbnail_link, priority, id_room]);

    return resultToObject(result);
}

function resultToObject(result) {
    if (!result.rows)
        console.log('I should handle errors, but not yet :(');

    return new Song({
        id_room: result.rows[0].id_room ?? '', 
        artist: result.rows[0].artist ?? '', 
        music_link: result.rows[0].music_link ?? '', 
        thumbnail_link: result.rows[0].thumbnail_link ?? '', 
        priority: result.rows[0].priority ?? '', 
        id_room: result.rows[0].id_room ?? '', 
    });  
}

module.exports = { insert }
