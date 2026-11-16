const ampq = require('amqplib')
const dotenv = require('dotenv').config()

class Producer{
    channel;
    async createChannel(){
        const connection = await ampq.connect(process.env.RABBITMQ_URL)
        this.channel = await connection.createChannel()
        console.log("successfull")
    }

    async publishMessage(routingKey , message){
        if(!this.channel){
            await this.createChannel()
        }
        const name = process.env.exchangName
        await this.channel.assertExchange(name , 'direct')

        await this.channel.publish(name , routingKey , 
            Buffer.from(JSON.stringify({
                type: routingKey,
                message: message,
                dateTime : new Date()
            }))
        )
        // await this.channel.waitForConfirms()
        console.log("successfull")
    }
}

module.exports = new Producer