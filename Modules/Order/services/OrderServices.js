const Order = require('../model/Order')
const OrderItem = require('../model/OrderItems')
const UserServ = require('../../User/services/UserServices')
const ProductServ = require('../../Products/services/ProductServices')
const Response = require('../../../Response/response')
const CartServ = require('../../../Modules/Products/services/CartServices')

class  OrderServices{

    async Create_Order(user_id){
        const cart_item = await CartServ.Get_CartItem(user_id)
        const user = await UserServ.Get_User_ById(user_id)

        if(user && cart_item.length > 0){
            const order = await Order.findOne({
                user_id:user_id
            })
            if(order){
                return Response.validate('order already exist')
            }
            const UserOrder = await Order.create({
                user_id: user_id,
                name: `${user.user_name} order`,
                status: 'draft'
            })
            if(UserOrder){
                let price = 0
                for(let i=0 ; i<cart_item.length ; i++){
                    const product = await ProductServ.Get_Product_For_Order(cart_item[i].product_id)
                    if(product){
                        const Orderitem = await OrderItem.create({
                            order_id: UserOrder._id,
                            product_id: product._id,
                            price: cart_item[i].quantity*product.products_v.price,
                            amount: cart_item[i].quantity
                        })
                        price = price + Orderitem.price
                    }
                }
                UserOrder.price = price
                await UserOrder.save()
                return Response.createdSuccess(null)
            }
            else{
                return Response.serverErorr()
            }
        }
    }
    async Get_Orderes(user_id){
        const orderes = await Order.find({
            user_id: user_id
        })
        if(orderes){
            return Response.success(orderes)
        }
        else{
            return Response.notFound()
        }
    }

    async Get_Order_ById(order_id){
        const order = await Order.findById(order_id)
        if(order){
            const orderItem = await OrderItem.find({
                order_id: order._id
            })
            if(orderItem){
                return Response.success(orderItem)
            }
            else{
                return Response.notFound()
            }
        }
        else{
            return Response.notFound()
        }
    }
}

module.exports = new OrderServices()