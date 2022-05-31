const usersRepository = require('../repositories/UsersRepository');
const roomsRepository = require('../repositories/RoomsRepository');
const Utils = require('../plugins/Utils.js');

async function create(nickname, photo_link, id_room) {
    if (!id_room)
        throw 'Room Id cannot be null.';

    const room = roomsRepository.findById(id_room);

    if (!room)
        throw 'Room does not exist.';

    if (!nickname)
        nickname = Utils.getRandomNickname();

    if (!photo_link)
        photo_link = Utils.getRandomPhoto();

    return await usersRepository.insert(nickname, photo_link, id_room);
}

module.exports = { create }
