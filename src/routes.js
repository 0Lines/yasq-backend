const express = require('express');

const router  = express.Router(); 


const roomsController = require('./controllers/RoomsController'); 
const usersController = require('./controllers/UsersController'); 
const songsController = require('./controllers/SongsController'); 

//Rooms
router.post('/rooms', roomsController.createRoom); 
router.get('/rooms', roomsController.findRoom); 

//Users
router.post('/users', usersController.createUser); 
router.put('/enter-room', usersController.enterRoom); 

//Songs
router.post('/songs', songsController.createSong); 
router.get('/songs', songsController.getPlaylist); 

module.exports = router; 

