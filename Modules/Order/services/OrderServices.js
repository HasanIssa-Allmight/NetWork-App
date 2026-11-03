const Order = require('../model/Order')
const OrderItem = require('../model/OrderItems')
const UserServ = require('../../User/services/UserServices')
const ProductServ = require('../../Products/services/ProductServices')

class  OrderServices{

    async Create_Order(cart_id , user_id){
        const info = {}
        // const cart_item = await Get_CartItem(cart_id)
        const user = await UserServ.Get_User_ById(user_id)
        if(user && cart_item.length > 0){
            const UserOrder = await Order.create({
                user_id: user_id,
                name: `${user.user_name} order`
            })
            if(UserOrder){
                for(let i=0 ; i<cart_item.length ; i++){
                    const product = await ProductServ.Get_Product_ById(cart_item[i].product_id)
                    const Orderitem = await OrderItem.create({
                        order_id: UserOrder.id,
                        // product_id: cart_item[i].product_id
                        price: cart_item[i].amount*product.price,
                        amount: cart_item[i].amount
                    })
                }
            }
        }
    }
    async Get_Orderes(user_id){
        const info = {}
        const orderes = await Order.find({
            user_id: user_id
        })
        if(orderes){
            info.orderes = orderes
            info.message = "user order" 
            info.status = 200
            return info
        }
        else{
            info.message = "orders not found"
            info.status = 404
            return info 
        }
    }

    async Get_Order_ById(order_id){
        const info = {}
        const order = await Order.findById(order_id)
        if(order){
            info.order = order
            info.message = "user order"
            info.status = 200
            return info
        }
        else{
            info.message = "order not found"
            info.status = 404
            return info
        }
    }
}

module.exports = new OrderServices()