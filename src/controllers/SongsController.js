const songsServices = require('../services/SongsServices')

//TODO - Create exceptions, check if room exists and lots of other things
async function createSong(req, res, next) {
    const { search_text, id_room } = req.body;
    
    const song = await songsServices.create(search_text, id_room);
    res.status(200).send(song)
}

module.exports = { createSong }
