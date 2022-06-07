require('express-async-errors');
const express = require ('express');
const routes = require('./routes');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require("socket.io");
const { registerSocket } = require("./socket/socket");

require('dotenv').config();

const app = express();
const httpPort = process.env.HTTP_PORT;

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" }});

app.use(express.static('public/resources/images'));
app.use(cors());
app.use(express.json());
app.use('/', routes);

app.use((error, req, res, next) => {
    res.status(error.statusCode ?? 400).send(error.message);
});

registerSocket(io);

app.listen(httpPort, () => {
    console.log(`HTTP server listening on port ${httpPort}`);
});

server.listen(process.env.SOCKET_PORT, () => {
	console.log(`Socket listening on port ${process.env.SOCKET_PORT}`);
});

