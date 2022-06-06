const roomsRepository = require('../repositories/RoomsRepository');

async function create(name) {
    if (!name)
        throw 'Room name cannot be null.';

    return await roomsRepository.insert(name);
}

async function find(id_room) {
    if (!id_room)
        throw 'Room id cannot be null.';

    return await roomsRepository.findById(id_room);
}

module.exports = { create, find }
