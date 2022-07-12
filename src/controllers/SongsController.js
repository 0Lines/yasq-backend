const songsServices = require('../services/SongsServices');

async function addSong(req, res, next) {
    const { search_text, id_room } = req.body;
    const song = await songsServices.add(search_text, id_room);

    emitRefreshPlaylist(id_room);

	if (!roomHasPlayingSong(id_room))
		changeRoomsCurrentSong(id_room, song.id_song);

    res.status(200).send(song);
}

async function removeSong(req, res, next) {
    const { id_song, id_room } = req.body;
    
    await songsServices.remove(id_song, id_room);

    emitRefreshPlaylist(id_room);
    res.status(200).send('Song has been removed.');
}

async function getPlaylist(req, res, next) {
    const id_room = req.params.id_room;
    const playlist = await songsServices.getPlaylist(id_room);

    res.status(200).send(playlist);
}

function emitRefreshPlaylist(id_room) {
    if (id_room)
        global.socket.to(id_room).emit('refreshPlaylist', 'Refresh Playlist =)'); 
}

function roomHasPlayingSong(id_room) {
	const room = global.rooms[id_room];
	return Boolean(room.id_song);
}

function changeRoomsCurrentSong(id_room, id_song) {
	const room = global.rooms[id_room];
	room.id_song = id_song;
	global.socket.to(id_room).emit("changeCurrentSong", id_song);
}

module.exports = { addSong, getPlaylist, removeSong }
