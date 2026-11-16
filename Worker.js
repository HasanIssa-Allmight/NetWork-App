const amqp = require('amqplib')
const dotenv = require('dotenv').config()
const NotificationServ = require('./Modules/Notification/services/NotificationServices')

class Worker{

    async withRetry(fn , counter = 3) {
        for(let i=1 ; i<=counter ; i++){
            try{
                return await fn()
            }
            catch(err){
                if(i === counter){
                    throw err
                }
                await new Promise(r =>setTimeout(r, 1000 * i))
            }
        }
    }

    async startWorker(){
        const connection = await amqp.connect(process.env.RABBITMQ_URL)
        const channel = await connection.createChannel()
        await channel.prefetch(1)

        await channel.assertExchange(process.env.exchangName, 'direct', { durable: true })

        await channel.assertExchange(process.env.deadExchangName, 'direct', { durable: true })
        await channel.assertQueue('order.dlq', { durable: true })
        await channel.bindQueue('order.dlq', process.env.deadExchangName, 'OrderNotify')

        const q = await channel.assertQueue('Orderqueue', {
            durable: true,
            arguments: { 'x-dead-letter-exchange': process.env.deadExchangName }
        })
        await channel.bindQueue(q.queue, process.env.exchangName, 'OrderNotify')

        channel.consume(q.queue, async (msg) => {
            if(!msg){
                return 
            }
            try{
                const data = JSON.parse(msg.content.toString())
                await this.withRetry(() => NotificationServ.SendEamil(data.message.email, data.message.message))
                channel.ack(msg) 
            }
            catch(err){
                console.error('failed -> DLQ', err)
                channel.nack(msg, false, false)
            }
        })

    }
}

const worker1 = new Worker()
worker1.startWorker()