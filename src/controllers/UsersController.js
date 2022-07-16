const usersServices = require('../services/UsersServices');

async function createUser (req, res, next) {
    const { nickname, photo_link, id_room } = req.body;
    const user = await usersServices.create(nickname, photo_link, id_room);

    res.status(200).send(user);
}

async function enterRoom(req, res, next) {
    const { id_user, id_room } = req.body;
    const room = await usersServices.enterRoom(id_user, id_room);

    global.socket.to(id_room).emit('refreshUsers'); 
    res.status(200).send(room);
}

module.exports = { createUser, enterRoom }
