const { io } = require('socket.io-client')

const URL = 'http://localhost:4000'
const CUSTOMER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhZjk1ZGIwNjBkOGE3NGYzOWQzMjY4NSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc5NDg1MDQ0Mn0.nT9RiLu_3ctyWDdbChJCQ-Z4yqS7vVC1NeLKrQUHBEA'
const ADMIN_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhZmIzZWY2NmY5MmU3MGZlYzAxOTUxMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc5NDg1MDU1MH0.8vsp2YlSawtVVx135G-7WqeR4Wfe0c6qjNetydCiQUQ'

function connect(name, token) {
    const socket = io(URL, { auth: { token } })

    socket.on('connect', () => console.log(`✅ ${name} connected (${socket.id})`))
    socket.on('connect_error', (err) => console.log(`❌ ${name} rejected: ${err.message}`))
    socket.on('disconnect', (reason) => console.log(`${name} disconnected: ${reason}`))


    socket.on('order:new', (d) => console.log(`📦 ${name} got order:new`, d))
    // socket.on('order:status', (d) => console.log(`🔄 ${name} got order:status`, d))
}

connect('customer', CUSTOMER_TOKEN)
connect('admin', ADMIN_TOKEN)
connect('no-token', undefined)
connect('bad-token', 'abc.def.ghi')