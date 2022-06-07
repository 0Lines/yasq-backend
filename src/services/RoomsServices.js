const NullException = require('../models/NullException');
const InvalidInfoException = require('../models/InvalidInfoException');
const roomsRepository = require('../repositories/RoomsRepository');

async function create(name) {
    if (!name)
        throw new NullException('Room name cannot be null.');

    return await roomsRepository.insert(name);
}

async function validateAndFind(id_room) {
    if (!id_room)
        throw new NullException('Room id cannot be null.');

    const room = await roomsRepository.findById(id_room);
    if (!room)
        throw new InvalidInfoException('Room does not exist.')

    return room;
}

module.exports = { create, validateAndFind }
