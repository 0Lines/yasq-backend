const express = require('express')
const ytdl = require('ytdl-core');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.HOST_PORT;

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/video', async (req, res) => {
  const { url } = req.body;
  const validUrl = await ytdl.validateURL(url);

  if(!validUrl)
    res.status(404).send("Video not found!").end();
  
  const songInfo = await ytdl.getBasicInfo(url);
  res.json(songInfo.videoDetails);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
