const express = require('express')

const router  = express.Router(); 


const roomsController = require('./controllers/RoomsController'); 
const usersController = require('./controllers/UsersController'); 
const songsController = require('./controllers/SongsController'); 

//Rooms
router.post('/rooms', roomsController.createRoom); 
router.get('/rooms', roomsController.findRoom); 

//Users
router.post('/users', usersController.createUser); 

//Songs
router.post('/songs', songsController.createSong); 

module.exports = router; 

