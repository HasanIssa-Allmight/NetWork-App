const {Server} = require('socket.io')
const jwt = require('jsonwebtoken')

let io
function initSocket(httpServer) {
    io = new Server(httpServer, { cors: { origin: '*' } })

    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth.token
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            socket.user = { id: payload.id, role: payload.role }
            next()
        } catch (err) {
            next(new Error('Unauthorized'))
        }
    })

    io.on('connection', (socket) => {

        socket.join(`user:${socket.user.id}`)

        if (socket.user.role === 'admin') {
            socket.join('admins')
        }
    })

    return io
}

function getIO() {
    if (!io) throw new Error('Socket.IO not initialized')
    return io
}

module.exports = { initSocket, getIO }