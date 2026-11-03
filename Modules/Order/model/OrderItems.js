const mongoos = require('mongoose')

const OrderItemSchema = new  mongoos.Schema({
    order_id :{
        type:mongoos.Schema.Types.ObjectId,
        required:true
    },
    product_id:{
        type:mongoos.Schema.Types.ObjectId,
        required: true,
    },
    amount:{
        type:Number,
        required: true,
    },
    price:{
        type:Number,
        required: true
    },
    created_at:{
        type:Date,
        default: Date.now
    }
})

const OrderItem = mongoos.model('OrderItem' , OrderItemSchema)

module.exports = OrderItem