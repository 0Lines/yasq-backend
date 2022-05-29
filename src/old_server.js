const fs = require('fs')
const cors = require('cors');
const express = require('express')
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const ffmpeg = require('fluent-ffmpeg')
const getStat = require('util').promisify(fs.stat)
const http = require('http');

const User = require('./models/User.js');
const Utils = require('./plugins/Utils.js');

const { v4: uuidv4 } = require('uuid');
const { Server } = require('socket.io');

require('dotenv').config();

const app = express();
const port = process.env.HTTP_PORT;
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" }});

app.use(express.static('public/resources/images'))
app.use(express.json())
app.use(cors());

io.on('connection', (socket) => {
	console.log('a user connected');
});

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/video', async (req, res) => {
    const { url } = req.body;
    
    const validUrl = await ytdl.validateURL(url);
    const validPlaylist = await ytpl.validateID(url);

	if(!validUrl && !validPlaylist) {
		res.status(404).send('Video or playlist not found!').end();
		return;
	}

    try {
        const songInfo = await ytdl.getBasicInfo(url);
        res.json(songInfo.videoDetails);
    } catch(error) {
		res.status(404).send('URL malformed or invalid!').end();
		return;
    }
})

// Just downloads the mp3
// Works fine, downloads without any problems
app.get('/download-mp3', async (req, res) => {
    const { url } = req.body;
    const validUrl = await ytdl.validateURL(url);

	if(!validUrl) {
		res.status(404).send('Video not found!').end();
		return;
	}

    try {
        songInfo = await ytdl.getBasicInfo(url)
        stream = await ytdl(url)
        proc = new ffmpeg({ source:stream })
        proc.saveToFile('./' + songInfo.videoDetails.title + '.mp3')
    } catch {
        res.status(404).send('Error downloading mp3.')
    }

    res.status(200).send('MP3 downloaded :D')
})

// Trying to stream without downloading
// For now, not working :/
/*
app.get('/stream-source', async (req, res) => {
    const ffmpegLocation = './test.mp3'
    let { url } = req.body
    url = 'https://www.youtube.com/watch?v=gBVBwtBRQoY'
    const validUrl = await ytdl.validateURL(url)
	if(!validUrl) {
		res.status(404).send('Video not found!').end()
		return
	}
    const stream = await ytdl(url)
    res.setHeader('Content-disposition', 'attachment; filename=' + 'test' + '.mp3')
    res.setHeader('Content-type', 'audio/mp3')
    proc = new ffmpeg({ source: stream })
    proc.setFfmpegPath(ffmpegLocation);
    proc.withAudioCodec('libmp3lame')
        .toFormat('mp3')
        .output(res)
        .run()
    proc.on('end', () => {
        console.log('Streaming is complete...')
    })
})
*/

// Trying to download and then streaming mp3
// It seems that we can pipe a file that has not been fully downloaded yet
// The only problem is, the file is incomplete.....
app.get('/download-then-stream', async (req, res) => {
    const filePath = './test.mp3'
    let { url } = req.body;
    url = 'https://www.youtube.com/watch?v=gBVBwtBRQoY'
    const validUrl = await ytdl.validateURL(url)

	if(!validUrl) {
		res.status(404).send('Video not found!').end()
		return
	}

    try {
        let stream = await ytdl(url)
        proc = new ffmpeg({ source: stream }).withNoVideo()
        await proc.saveToFile(filePath)
    } catch(error) {
        console.log(error)
        res.status(404).send('Error downloading mp3.').end()
        return
    }

    const stat = await getStat(filePath)
    console.log(stat)

    res.writeHead(200, {
        'Content-Type': 'audio/mp3',
        'Content-Length': stat.size
    })

    // highWaterMark == buffer size, 1000 is low, but better for testing
    // if im not mistaken 64000 is the max
    const highWaterMark = 64000 
    const stream = fs.createReadStream(filePath, { highWaterMark })
    stream.on('end', () => console.log('Streaming complete...'))
    stream.pipe(res)
})

// Streaming already downloaded mp3 file
// File always gets fully delivered without any errors
app.get('/stream-downloaded', async (req, res) => {
    const filePath = './test.mp3'
    const highWaterMark = 16000

    const stat = await getStat(filePath)
    console.log(stat)
    
    res.writeHead(200, {
        'Content-Type': 'audio/mp3',
        'Content-Length': stat.size
    })

    const stream = fs.createReadStream(filePath, { highWaterMark })
    stream.on('end', () => console.log('streaming complete'))
    stream.pipe(res)
})

// Generate random hash id, profile photo and name
// TODO: setup for using database and ORM in the future
app.post('/create/user', async (req, res) => {

    const {firstnames, lastnames} = require('./plugins/names.json');

	const generateRandomNick = (listNames) => {
		const rndint = Math.floor(Math.random() * listNames.length);
		return listNames[rndint].charAt(0).toUpperCase() + listNames[rndint].slice(1);
	}

    const generateRandomImg = () => {
        const photos = Utils.getAllFilesFromFolder("./public/resources/images");
        const result = photos[Math.floor(Math.random() * photos.length)];

        return result.replace("./public/resources/images", "");
    }
    
	res.jsonp(new User({
		id: uuidv4(),
		firstname: generateRandomNick(firstnames),
		lastname: generateRandomNick(lastnames),
		profilesrc: generateRandomImg(),
	}));
});


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

server.listen(process.env.SOCKET_PORT, () => {
	console.log(`Listening on ${process.env.SOCKET_PORT}`);
});
