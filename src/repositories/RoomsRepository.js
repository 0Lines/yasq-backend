const pool = require('../database/db').pool;
const Room = require('../models/Room');

async function insert(name) {
    const result = await pool.query(
            `INSERT INTO Rooms (name)
             VALUES ($1)
             RETURNING *`,
            [name]);

    return resultToObject(result);
}

async function findById(id) {
    const result = await pool.query(
            `SELECT
                id_room,
                name
            FROM Rooms
            WHERE id_room = ($1)`,
            [id]);

    return resultToObject(result);
}

async function insertUserInRoom(id_user, id_room) {
    const result = await pool.query(
		`UPDATE users
		SET id_room = ($1)
		WHERE id_user = ($2);`,
		[id_room, id_user]);

    return result;
}

function resultToObject(result) {
    if (!result.rows)
        console.log('I should handle errors, but not yet :(');

    return new Room({
        id_room: result.rows[0].id_room ?? '', 
        name: result.rows[0].name ?? '', 
    });  
}

module.exports = { insert, findById, insertUserInRoom }
