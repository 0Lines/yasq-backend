require('express-async-errors');
const express = require ('express');
const routes = require('./routes');
const cors = require('cors');
const { createSocketServer, registerSocketEvents } = require("./socket/socket");

require('dotenv').config();

const app = express();
const httpPort = process.env.HTTP_PORT || 5000;

app.use(express.static('public/resources/images'));
app.use(cors());
app.use(express.json());
app.use('/', routes);

app.use((error, req, res, next) => {
    res.status(error.statusCode ?? 400).send(error.message);
});

global.socket = createSocketServer(app);
registerSocketEvents(global.socket);

app.listen(httpPort, () => {
    console.log(`HTTP server listening on port ${httpPort}`);
});