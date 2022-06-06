const pool = require('../database/db').pool;
const User = require('../models/User');

async function insert(nickname, photo_link) {
    const result = await pool.query(
    `INSERT INTO Users (nickname, photo_link)
     VALUES ($1, $2)
     RETURNING *`,
    [nickname, photo_link]);

    return resultToObject(result);
}

function resultToObject(result) {
    if (!result.rows)
        console.log('I should handle errors, but not yet :(');

    return new User({
        id_user : result.rows[0].id_user ?? '', 
        nickname: result.rows[0].nickname ?? '', 
        photo_link: result.rows[0].photo_link ?? '', 
    });  
}

module.exports = { insert }
