// IMPORT PACKAGES
const express = require('express')


//Get routes to the variabel here
const router = require('./src/routes')

const app = express()

const port = 5000

// JSON FOR API AGAR BISA MENAMPILKAN DATA
app.use(express.json())

//Create endpoint grouping and router here
app.use('/api/v1/', router)
app.use('/uploads', express.static('uploads'))
app.use('/uploadsImg', express.static('uploadsImg'))

// Port
app.listen(port, () => console.log(`Listening on port ${port}!`))
