const express = require ('express')
const routes = require('./routes')
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require("socket.io");
const { registerSocket } = require("./socket/socket");

require('dotenv').config();

const app = express()
const httpPort = process.env.HTTP_PORT;

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" }});

app.use(cors());
app.use(express.json())
app.use('/', routes)

registerSocket(io);

app.listen(httpPort, () => {
    console.log(`YASQ Server listening on port ${httpPort}`)
})

server.listen(process.env.SOCKET_PORT, () => {
	console.log(`Socket Listening on ${process.env.SOCKET_PORT}`);
});


