const roomsServices = require('../services/RoomsServices');

async function createRoom(req, res, next) {
    const { name } = req.body;

    const room = await roomsServices.create(name);
    res.status(200).send(room);
}

async function findRoom(req, res, next) {
    const { id_room } = req.body;

    const room = await roomsServices.validateAndFind(id_room);
    res.status(200).send(room);
}

module.exports = { createRoom, findRoom }
