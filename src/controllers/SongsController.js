const songsServices = require('../services/SongsServices')

//TODO - Create exceptions, check if room exists and lots of other things
async function createSong(req, res, next) {
    const { search_text, id_room } = req.body;
    
    const song = await songsServices.create(search_text, id_room);
    res.status(200).send(song)
}

async function getPlaylist(req, res, next) {
    const { id_room } = req.body;

    const playlist = await songsServices.getPlaylist(id_room);
    res.status(200).send(playlist);
}

module.exports = { createSong, getPlaylist }
