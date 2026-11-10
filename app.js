const express = require('express')
const ConnectDB = require('./database/connection')
const cors = require('cors') 
const redis = require('./infrastructure/redis/redis')
const body_parser = require('body-parser')
const server = express()


//files
server.use('/uploads', express.static('uploads'));


server.use(express.json())
server.use(body_parser.json())
server.use(body_parser.urlencoded({extended : true}))
server.use(
    cors({
        origin:'*',
        credentials : true
    })
)


ConnectDB()


require('./Modules/Products/services/CartServices')

//model
require('./Modules/Products/model/Products')
require('./Modules/User/model/User')
require('./Modules/Products/model/Cart')

const routes = require('./v1/routes')

server.use('/v1' , routes)
    
const Faker = require('./faker/faker')
// Faker.UserFaker()
// Faker.OrderFaker()
// Faker.ProductsFaker()
// Faker.OrderItemFaker()

async function startServer() {
    try {
        // Connect Redis first
        await redis.connect();

        console.log('Redis connected successfully!');

        // Start Express after Redis connection
        server.listen(4000, () => {
            console.log('Server is running on port 4000 ...');
        });

    } catch (error) {
        console.log('Failed to connect Redis:');
        process.exit(1);
    }
}

startServer();