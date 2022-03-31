const express = require('express')
const ytdl = require('ytdl-core');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");

require('dotenv').config();

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
	}
});

app.use(express.json())
app.use(cors());

io.on('connection', (socket) => {
	console.log('a user connected');
});


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/video', async (req, res) => {
    const { url } = req.body;
    const validUrl = await ytdl.validateURL(url);

	if(!validUrl) {
		res.status(404).send('Video not found!').end();
		return;
	}

    try {
        const songInfo = await ytdl.getBasicInfo(url);
    } catch(error) {
		res.status(404).send('URL malformed or invalid!').end();
		return;
    }
	res.json(songInfo.videoDetails);
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

server.listen(process.env.SOCKET_PORT, () => {
	console.log(`Listening on ${process.env.SOCKET_PORT}`);
});
