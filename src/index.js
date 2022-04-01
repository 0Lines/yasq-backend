const express = require('express')
const ytdl = require('ytdl-core');
const cors = require('cors');
const http = require('http');
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const getStat = require('util').promisify(fs.stat)
const { Server } = require('socket.io');

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

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

server.listen(process.env.SOCKET_PORT, () => {
	console.log(`Listening on ${process.env.SOCKET_PORT}`);
});
