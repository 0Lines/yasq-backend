const User = require('../models/User');
const Utils = require('../plugins/Utils.js');
const { v4: uuidv4 } = require('uuid');

const usersRepository = require('../repositories/UsersRepository')

//TODO - Create exceptions, check if room exists and lots of other things
const createUser = (req, res, next) => {
    const user = usersRepository.insert(req.body);
    res.status(200).send('User created!')
}

module.exports = { createUser }
