const { createServer } = require('http');
const { Server } = require("socket.io");

function createSocketServer(expressServer) {
	const server = createServer(expressServer);
	const io = new Server(server, { cors: { origin: "*" }});

	io.listen(process.env.SOCKET_PORT, () => {
		console.log(`Socket listening on port ${process.env.SOCKET_PORT}`);
	});

	return io;
}

function registerSocketEvents(io) {
	io.on("connection", (socket) => {

		console.log("a user connected");

		socket.on("eventFromClientTest1", (msg) => retrieveToClientItsOwnMessage(msg, "eventFromClientTest1"));
		socket.on("eventFromClientTest2", (msg) => retrieveToClientItsOwnMessage(msg, "eventFromClientTest2"));
	});
}

function retrieveToClientItsOwnMessage(msg, eventReceived) { //TODO THIS FUNCTION IS JUST FOR TESTING
	console.log("Client sent to server '" + JSON.stringify(msg) + "' using '" + eventReceived + "' event. Sending back to client its own message via 'retrieveFromServer' event");
	global.socket.emit('retrieveFromServer', msg); 
}

module.exports = { createSocketServer, registerSocketEvents }