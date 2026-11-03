const mongoos = require('mongoose')

const OrderShcema = new mongoos.Schema({
    user_id:{
        type:Number,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true,
        default:0
    },
    created_at:{
        type:Date,
        default: Date.now
    }
})

const Order = mongoos.model('Order' , OrderShcema)

module.exports = Order