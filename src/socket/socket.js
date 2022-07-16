const { createServer } = require('http');
const { Server } = require("socket.io");
const Room = require('../classes/Room');
const RoomNotifier = require('../classes/RoomNotifier');

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

		socket.on("subscribeToRoom", (id_room) => {
			if (global.rooms[id_room] == undefined)
				global.rooms[id_room] = new Room(id_room, new RoomNotifier(io)); //TODO #WEIRD_ROOM_VARIABLE RoomNotifier

			socket.join(id_room);
		});

		socket.on("pause", (id_room) => {
			const room = global.rooms[id_room];
			room.pauseJukebox();
		});

		socket.on("play", (id_room) => {
			const room = global.rooms[id_room];
			room.playJukebox();
		});

		socket.on("changeCurrentSong", ({id_room, id_song}) => {
			const room = global.rooms[id_room];
			room.changeSongInJukebox(id_song);
		});

		socket.on("getCurrentState", (id_room) => {
			const room = global.rooms[id_room];
			socket.emit("getCurrentState", room.getCurrentState());//CANNOT USE ROOM notifyCurrentState BECAUSE THIS EVENT HERE IS JUST FOR WHO ASKED
		});

	});
}

module.exports = { createSocketServer, registerSocketEvents }
