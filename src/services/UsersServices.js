const usersRepository = require('../repositories/UsersRepository');
const roomsRepository = require('../repositories/RoomsRepository');
const Utils = require('../plugins/Utils.js');

async function create(nickname, photo_link, id_room) {
    if (!nickname)
        nickname = Utils.getRandomNickname();

    if (!photo_link)
        photo_link = Utils.getRandomPhoto();

    return await usersRepository.insert(nickname, photo_link, id_room);
}

async function enterRoom(id_user, id_room) {
    if (!id_user)
        throw 'User cannot be null.';

	if (!id_room)
		throw 'Room cannot be null.';

    const user = await usersRepository.findById(id_user);
    if (!user)
        throw 'User does not exist.';

    const room = await roomsRepository.findById(id_room);
    if (!room)
        throw 'Room does not exist.';

    return await usersRepository.insertUserInRoom(id_user, id_room);
}

module.exports = { create, enterRoom }
