const usersServices = require('../services/UsersServices')

//TODO - Create exceptions, check if room exists and lots of other things
async function createUser (req, res, next) {
    const { nickname, photo_link, id_room } = req.body;
    
    const user = await usersServices.create(nickname, photo_link, id_room);
    res.status(200).send(user)
}

module.exports = { createUser }
