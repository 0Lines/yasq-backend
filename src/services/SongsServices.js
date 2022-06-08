const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const NullException = require('../models/NullException');
const InvalidInfoException = require('../models/InvalidInfoException');
const songsRepository = require('../repositories/SongsRepository');
const roomsServices = require('../services/RoomsServices');

async function add(search_text, id_room) {
    if (!search_text)
        throw new NullException('Text or link cannot be null.');

    const room = await roomsServices.validateAndFind(id_room); 

    const validUrl = await ytdl.validateURL(search_text);
    const validPlaylist = await ytpl.validateID(search_text);

	if(!validUrl && !validPlaylist)
        throw new InvalidInfoException('Invalid song link.');

    let songInfo = await ytdl.getBasicInfo(search_text);
    const priority = await songsRepository.getNextSongPriority(room.id_room);

    return await songsRepository.insert(
        songInfo.videoDetails.title,
        songInfo.videoDetails.ownerChannelName,
        songInfo.videoDetails.video_url,
        songInfo.videoDetails.thumbnails[0].url,
        priority,
        room.id_room
    );
}

async function getPlaylist(id_room) {
    const room = await roomsServices.validateAndFind(id_room); 

    return await songsRepository.findAllSongsFromRoom(room.id_room);
}

async function remove(id_song, id_room) {
    const song = await validateAndFind(id_song, id_room);

    await songsRepository.remove(id_song, id_room);
}

async function validateAndFind(id_song, id_room) {
    if (!id_song)
        throw new NullException('Song id cannot be null.');

    const room = await roomsServices.validateAndFind(id_room);
    const song = await songsRepository.findSong(id_song, room.id_room);
    if (!song)
        throw new InvalidInfoException('Song does not exist in this room.');

    return song;
}

module.exports = { add, getPlaylist, remove }
