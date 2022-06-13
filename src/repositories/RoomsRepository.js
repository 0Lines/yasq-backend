const pool = require('../database/db').pool;
const Room = require('../models/Room');
const User = require('../models/User');
const InvalidInfoException = require('../models/InvalidInfoException');

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

async function getParticipants(id_room) {
    const result = await pool.query(
		`SELECT
			nickname,
			photo_link
		FROM Users
		WHERE id_room = ($1)`,
		[id_room]);

	if (result.rows.length <= 0)
        return null;

    return result.rows.map(row => new User({ ...row }));
}

function resultToObject(result) {
    if (result.rows.length <= 0)
        return null;

    return new Room({ ...result.rows[0] });  
}

module.exports = { insert, findById, getParticipants }
