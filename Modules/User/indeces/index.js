require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../model/User')

class Index {

    async Create_Index(){
        await mongoose.connect(process.env.dburl)
        await User.collection.createIndex({
            email: 1,
            created_at : -1
        })
        // process.exit()
    }

    // async Drop_Index(){
    //     await mongoose.connect(process.env.dburl)
    //     await Order.collection.dropIndex('user_id_1_status_1_created_at_-1')
    //     // process.exit()
    // }

    // async Create_Index_In_OrderItem (){
    //     await mongoose.connect(process.env.dburl)
    //     await OrderItem.collection.createIndex({
    //         order_id: 1,
    //         created_at : -1
    //     })
    // }

    // async Drop_Index_In_OrderItem (){
    //     await mongoose.connect(process.env.dburl)
    //     await OrderItem.collection.dropIndex('order_id_1_created_at_-1')
    //     // process.exit()
    // }

}

module.exports = new Index()