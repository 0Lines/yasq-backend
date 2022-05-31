let socketServer;

function registerSocket(server) {
	socketServer = server;

	server.on("connection", (socket) => {

		console.log("a user connected");

		socket.on("eventFromClientTest1", (msg) => retrieveToClientItsOwnMessage(msg, "eventFromClientTest1"));
		socket.on("eventFromClientTest2", (msg) => retrieveToClientItsOwnMessage(msg, "eventFromClientTest2"));
	});
}

function retrieveToClientItsOwnMessage(msg, eventReceived) {
	console.log("Client sent to server '" + JSON.stringify(msg) + "' using '" + eventReceived + "' event. Sending back to client its own message via 'retrieveFromServer' event");
	socketServer.emit('retrieveFromServer', msg);
}

module.exports = { registerSocket }