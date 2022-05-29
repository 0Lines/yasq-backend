const express = require('express')

const router  = express.Router(); 

const usersController = require('./controllers/UsersController'); 

router.post('/users', usersController.createUser); 

module.exports = router; 

