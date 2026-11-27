import 'dotenv/config'

import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import bootstrap from './src/app.controller.js'
import { connectMqtt } from './src/services/mqtt.js'

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

app.set('io', io)

io.on('connection', (socket) => {
    console.log('Socket Connected:', socket.id)

    socket.on('disconnect', () => {
        console.log('Socket Disconnected:', socket.id)
    })
})

const port = process.env.PORT || 3000

app.get('/health', (req, res) => {
    res.json({ ok: true })
})

await bootstrap(app, express)

connectMqtt(io)

httpServer.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`)
})