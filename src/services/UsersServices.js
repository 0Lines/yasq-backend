const usersRepository = require('../repositories/UsersRepository');
const roomsRepository = require('../repositories/RoomsRepository');
const Utils = require('../plugins/Utils.js');

async function create(nickname, photo_link) {
    if (!nickname)
        nickname = Utils.getRandomNickname();

    if (!photo_link)
        photo_link = Utils.getRandomPhoto();

    return await usersRepository.insert(nickname, photo_link);
}

module.exports = { create }
