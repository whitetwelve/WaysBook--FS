// IMPORT PACKAGES
const express = require('express')
require('dotenv').config()
const cors = require('cors')

// import package
const http = require('http')
const {Server} = require('socket.io')

const app = express()

// add after app initialization
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
    origin: 'http://localhost:3000' // define client origin if both client and server have different origin
    }
})
require('./src/socket')(io)

//Get routes to the variabel here
const router = require('./src/routes')

const port = 5000

// JSON FOR API AGAR BISA MENAMPILKAN DATA
app.use(express.json())
app.use(cors());

//Create endpoint grouping and router here
app.use('/api/v1/', router)
app.use('/uploads', express.static('uploads'))
app.use('/uploadsImg', express.static('uploadsImg'))

// Port
server.listen(port, () => console.log(`Listening on port ${port}!`))
