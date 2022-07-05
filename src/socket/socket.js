const { createServer } = require('http');
const { Server } = require("socket.io");

let rooms = [];

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
            if (rooms[id_room] == undefined)
                rooms[id_room] = {
                    isPlaying: false,
                    startedAt: 0,
                    stoppedAt: 0,
                };
        });

		socket.on("pause", (id_room) => {
            rooms[id_room].stoppedAt = Date.now();

            rooms[id_room].isPlaying = false;

            io.to(id_room).emit("pause");
        });

        socket.on("play", (id_room) => {
            let room = rooms[id_room];

            console.log(room)

            const now = Date.now();
            if (room.startedAt)
                room.startedAt = now - ((room.isPlaying ? now : room.stoppedAt) - room.startedAt);
            else
                room.startedAt = now;

            room.isPlaying = true;
            io.to(id_room).emit("play", (now - room.startedAt) / 1000);
        });

        socket.on("getCurrentState", (id_room) => {
            const room = rooms[id_room];
            const now = Date.now();

            io.to(id_room).emit("getCurrentState", {
                isPlaying: room.isPlaying,
                startFrom: (((room.isPlaying ? now : room.stoppedAt) - room.startedAt) / 1000),
            });
        });
	});
}

module.exports = { createSocketServer, registerSocketEvents }
