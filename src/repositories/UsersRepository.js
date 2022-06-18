const pool = require('../database/db').pool;
const User = require('../models/User');
const InvalidInfoException = require('../models/InvalidInfoException');

async function insert(nickname, photo_link, id_room) {
    const result = await pool.query(
        `INSERT INTO Users (nickname, photo_link, id_room)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [nickname, photo_link, id_room]);

    return resultToObject(result);
}

async function findById(id_user) {
    const result = await pool.query(
        `SELECT *
         FROM Users
         WHERE id_user = ($1)`,
        [id_user]);

    return resultToObject(result);
}

async function insertUserInRoom(id_user, id_room) {
    const result = await pool.query(
		`UPDATE Users
		 SET id_room = ($1)
		 WHERE id_user = ($2)
         RETURNING *`,
		[id_room, id_user]);

    return resultToObject(result);
}

async function getParticipantsFromRoom(id_room) {
    const result = await pool.query(
		`SELECT
			nickname,
			photo_link
		FROM Users
		WHERE id_room = ($1)`,
		[id_room]);

    return result.rows.map(row => new User({ ...row }));
}

function resultToObject(result) {
    if (result.rows.length <= 0)
        return null;

    return new User({ ...result.rows[0] });  
}

module.exports = {
    insert,
    findById,
    insertUserInRoom,
    getParticipantsFromRoom
}
