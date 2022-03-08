const express = require('express')
const ytdl = require('ytdl-core');

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/video', async (req, res) => {
  const { url } = req.body;
  const songInfo = await ytdl.getBasicInfo(url);
  res.json(songInfo.videoDetails);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
