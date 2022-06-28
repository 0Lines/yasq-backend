const { createServer } = require('http');
const { Server } = require("socket.io");

function createSocketServer(expressServer) {
	const server = createServer(expressServer);
	const io = new Server(server, { cors: { origin: "*" }});

    console.log(`Socket listening on port ${process.env.SOCKET_PORT}`);
	io.listen(process.env.SOCKET_PORT);

	return io;
}

function registerSocketEvents(io) {
	io.on("connection", (socket) => {
        console.log("User connected");

		socket.on("subscribeToRoom", (id_room) => socket.join(id_room));
		socket.on("pause", (id_room) => io.to(id_room).emit("pause"));
		socket.on("play", (id_room) => io.to(id_room).emit("play"));
	});
}

module.exports = { createSocketServer, registerSocketEvents }
