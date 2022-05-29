const express = require ('express')
const routes = require('./routes')

require('dotenv').config();

const app = express()
const httpPort = process.env.HTTP_PORT;

app.use(express.json())

app.use('/', routes)

app.listen(httpPort, () => {
    console.log(`YASQ Server listening on port ${httpPort}`)
})

