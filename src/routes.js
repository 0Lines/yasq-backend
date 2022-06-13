const express = require('express');

const router  = express.Router(); 


const roomsController = require('./controllers/RoomsController'); 
const usersController = require('./controllers/UsersController'); 
const songsController = require('./controllers/SongsController'); 

//Rooms
router.post('/rooms', roomsController.createRoom); 
router.get('/rooms', roomsController.findRoom); 
router.get('/room-participants/:id_room', roomsController.getParticipants); 

//Users
router.post('/users', usersController.createUser); 
router.put('/enter-room', usersController.enterRoom); 

//Songs
router.post('/songs', songsController.addSong); 
router.get('/songs', songsController.getPlaylist); 
router.delete('/songs', songsController.removeSong); 

module.exports = router;

