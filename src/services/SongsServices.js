const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const songsRepository = require('../repositories/SongsRepository');
const roomsRepository = require('../repositories/RoomsRepository');

async function create(search_text, id_room) {
    if (!search_text)
        throw 'Text or link cannot be null.';

    if (!id_room)
        throw 'Room id cannot be null.';

    const room = roomsRepository.findById(id_room);

    if (!room)
        throw 'Room does not exist.';

    const validUrl = await ytdl.validateURL(search_text);
    const validPlaylist = await ytpl.validateID(search_text);

	if(!validUrl && !validPlaylist) {
	    console.log('Handle invalid link :P');
		return;
	}

    let songInfo = await ytdl.getBasicInfo(search_text);
    const priority = await songsRepository.getNextSongPriority(id_room);

    return await songsRepository.insert(
        songInfo.videoDetails.title,
        songInfo.videoDetails.ownerChannelName,
        songInfo.videoDetails.video_url,
        songInfo.videoDetails.thumbnails[0].url,
        priority,
        id_room
    );
}

async function getPlaylist(id_room) {
    if (!id_room)
        throw 'Room id cannot be null.';

    const room = roomsRepository.findById(id_room);

    if (!room)
        throw 'Room does not exist.';

    return await songsRepository.findAllSongsFromRoom(id_room);
}

module.exports = { create, getPlaylist }
