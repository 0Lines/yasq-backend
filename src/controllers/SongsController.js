const songsServices = require('../services/SongsServices');

async function addSong(req, res, next) {
    const { search_text, id_room } = req.body;
    
    const song = await songsServices.add(search_text, id_room);
    res.status(200).send(song);
}

async function removeSong(req, res, next) {
    const { id_song, id_room } = req.body;
    
    await songsServices.remove(id_song, id_room);
    res.status(200).send('Song has been removed.');
}

async function getPlaylist(req, res, next) {
    const id_room = req.params.id_room;

    const playlist = await songsServices.getPlaylist(id_room);
    res.status(200).send(playlist);
}

module.exports = { addSong, getPlaylist, removeSong }
