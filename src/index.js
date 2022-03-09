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

  const songInfo = await ytdl.getBasicInfo(url).catch((err) => {
    console.log(err);
    res.send("Error").status(500);
  });

  res.json(songInfo.videoDetails);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
