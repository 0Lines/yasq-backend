const roomsRepository = require('../repositories/RoomsRepository');

async function create(name) {
    if (!name)
        throw 'Room name cannot be null.';

    return await roomsRepository.insert(name);
}

async function enter(id_user, id_room) {
    if (!id_user)
        throw 'User cannot be null.'; //TODO SHOULD VALIDATE USER VIA FIND TOO??

	if(!id_room)
		throw 'Room cannot be null.'; //TODO SHOULD VALIDATE ROOM VIA FIND TOO??

    return await roomsRepository.insertUserInRoom(id_user, id_room);
}

async function find(id_room) {
    if (!id_room)
        throw 'Room id cannot be null.';

    return await roomsRepository.findById(id_room);
}


module.exports = { create, find, enter }
