const { createServer } = require('http');
const { Server } = require("socket.io");

function createSocketServer(expressServer) {
	const server = createServer(expressServer);
	const io = new Server(server, { cors: { origin: "*" }});

    console.log(`Socket listening on port ${process.env.SOCKET_PORT}`);
	io.listen(process.env.SOCKET_PORT);

	return io;
}

function registerSocketEvents(io) { //TODO MAYBE RETHINK THIS FUNCTION LOCATION / USE ???
	io.on("connection", (socket) => {
        console.log("User connected");

		socket.on("subscribeToRoom", (id_room) => socket.join(id_room));
	});
}

function retrieveToClientItsOwnMessage(msg, eventReceived) { //TODO THIS FUNCTION IS JUST FOR TESTING
	console.log("Client sent to server '" + JSON.stringify(msg) + "' using '" + eventReceived + "' event. Sending back to client its own message via 'retrieveFromServer' event");
	global.socket.emit('retrieveFromServer', msg); 
}

module.exports = { createSocketServer, registerSocketEvents }
