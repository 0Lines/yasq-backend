const { createServer } = require('http');
const { Server } = require("socket.io");

global.rooms = [];

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
            socket.join(id_room);
            if (global.rooms[id_room] == undefined)
                global.rooms[id_room] = {
					currentSongId: undefined,
                    isPlaying: false,
                    startedAt: 0,
                    stoppedAt: 0,
                };
        });

		socket.on("pause", (id_room) => {
			const room = global.rooms[id_room];

			if(room.isPlaying) {
				room.stoppedAt = Date.now();
				room.isPlaying = false;

				io.to(id_room).emit("pause");
			}
        });

        socket.on("play", (id_room) => {
            const room = global.rooms[id_room];

            if(!room.isPlaying) {
				const songElapsedTime = room.stoppedAt - room.startedAt;
				room.startedAt = Date.now() - songElapsedTime;
				room.isPlaying = true;
				
				io.to(id_room).emit("play", songElapsedTime / 1000);
			}
        });

        socket.on("getCurrentState", (id_room) => {
            const room = global.rooms[id_room];

            io.to(id_room).emit("getCurrentState", {
				currentSongId: room.currentSongId,
                isPlaying: room.isPlaying,
                startFrom: ((room.isPlaying ? Date.now() : room.stoppedAt) - room.startedAt) / 1000,
            });
        });

		socket.on("changeCurrentSong", ({id_room, id_song}) => {
            const room = global.rooms[id_room];
			room.currentSongId = id_song;
            io.to(id_room).emit("changeCurrentSong", id_song);
        });
	});
}

module.exports = { createSocketServer, registerSocketEvents }
