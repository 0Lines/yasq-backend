const pool = require('../database/db').pool

const { v4: uuidv4 } = require('uuid');

async function insert(user) {
    const newUser = await pool.query(
    `INSERT INTO Users (id_user, nickname, photo_link, id_room)
     VALUES ($1, $2, $3, $4)
     RETURNING *;`,
    [uuidv4(), user.nickname, user.photo_link, user.id_room]
    )

    return newUser;
}

module.exports = { insert }
