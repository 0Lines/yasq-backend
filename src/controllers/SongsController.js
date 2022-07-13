const songsServices = require('../services/SongsServices');

async function addSong(req, res, next) {
    const { search_text, id_room } = req.body;
    const song = await songsServices.add(search_text, id_room);
	
    global.socket.to(id_room).emit("refreshPlaylist", 'Refresh Playlist =)'); 

	if (!roomHasPlayingSong(id_room))
		changeRoomsCurrentSong(id_room, song);

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

function roomHasPlayingSong(id_room) {
	const room = global.rooms[id_room];
	return Boolean(room.currentSongId);
}

function changeRoomsCurrentSong(id_room, song) {
	const room = global.rooms[id_room];
	room.currentSongId = song.id_song;
	room.startedAt = 0;
	room.stoppedAt = 0;
	room.isPlaying = false;

	global.socket.to(id_room).emit("getCurrentState2", {
		currentSongId: song.id_song,
		isPlaying: false,
		startFrom: 0,
		song: song,
	});
}

module.exports = { addSong, getPlaylist, removeSong }
