const express = require('express')

const router  = express.Router(); 

const usersController = require('./controllers/UsersController'); 
const roomsController = require('./controllers/RoomsController'); 

router.post('/users', usersController.createUser); 

router.post('/rooms', roomsController.createRoom); 
router.get('/rooms', roomsController.findRoom); 

module.exports = router; 

