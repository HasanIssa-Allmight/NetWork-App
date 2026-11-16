const amqp = require('amqplib')
const {getIO} = require('../middleware/socketIo')

async function startRealtimeConsumer(){
    const connection = await amqp.connect(process.env.RABBITMQ_URL)
    const channel = await connection.createChannel()
    await channel.prefetch(10)

    await channel.assertExchange(process.env.exchangName, 'direct', { durable: true })

    const q = await channel.assertQueue('order.realtime', { durable: true })
    await channel.bindQueue(q.queue, process.env.exchangName, 'order.created')
    await channel.bindQueue(q.queue, process.env.exchangName, 'order.status_changed')

    channel.consume(q.queue, (msg) => {
        if (!msg) {
            return
        }
        try {
            const { type, message } = JSON.parse(msg.content.toString())
            const io = getIO()

            if (type == 'order.created') {
                io.to('admins').emit('order:new', message)
            }
            if (type ==  'order.status_changed') {
                io.to(`user:${message.userId}`).emit('order:status', message)
            }
            channel.ack(msg)
        } catch (err) {
            console.error(err)
            channel.nack(msg, false, false)
        }
    })
}

module.exports = startRealtimeConsumer