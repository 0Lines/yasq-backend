const NullException = require('../models/NullException');
const InvalidInfoException = require('../models/InvalidInfoException');
const usersRepository = require('../repositories/UsersRepository');
const roomsServices = require('../services/RoomsServices');
const Utils = require('../plugins/Utils.js');

async function create(nickname, photo_link, id_room) {
    if (!nickname)
        nickname = Utils.getRandomNickname();

    if (!photo_link)
        photo_link = Utils.getRandomPhoto();

    if (id_room)
        var room = await roomsServices.validateAndFind(id_room);

    return await usersRepository.insert(nickname, photo_link, room?.id_room);
}

async function enterRoom(id_user, id_room) {
    if (!id_user)
        throw new NullException('User cannot be null.');

    const user = await usersRepository.findById(id_user);
    if (!user)
        throw new InvalidInfoException('User does not exist.');

    const room = await roomsServices.validateAndFind(id_room);

    return await usersRepository.insertUserInRoom(id_user, room.id_room);
}

async function getParticipantsFromRoom(id_room) { 
    const room = await roomsServices.validateAndFind(id_room);

    return await usersRepository.getParticipantsFromRoom(room.id_room);
}

module.exports = { create, enterRoom, getParticipantsFromRoom }
