const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server, {cors:{origin:'*'}})
const users = new Map()
io.on('connection', socket => {
    socket.on('send:peer', ({username, host, room, id}) =>{
        socket.join(room)
        users.set(username, {username, host, room, id})
        io.to(room).emit('updateUsersList', {users: Array.from(users.keys())})
       socket.to(room).emit('get:peer', ({remoteUserName: username, remoteHost: host,   remoteId: id}))
    })
})
server.listen(3000)