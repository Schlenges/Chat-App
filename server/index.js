const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connect', (socket) => {
  socket.on('join', ({name, room}, callback) => {
    const { user, error } = addUser({ id: socket.id, name, room})

    if(error) callback(error)

    socket.join(user.room)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

app.use(router)

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))