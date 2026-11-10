const OrderServ = require('../services/OrderServices')

class OrderController {

    async CreateOrder (req , res){
        try{
            const user_id = req.userId
            const data = await OrderServ.Create_Order(user_id)
            if(data){
                return res.status(data.status).json({
                    message: data.message
                })
            }
        }
        catch(error){
            return res.status(500).json({
                message: error.message
            })
        }
    }

    async GetOrderes(req , res){
        try{
            const user_id = req.userId
            const data = await OrderServ.Get_Orderes(user_id)
            if(data){
                return res.status(data.status).json({
                    orderes: data.data,
                    message: data.message
                })
            }
        }
        catch(error){
            return res.status(500).json({
                message: error.message
            })
        }
    }

    async GetOrderesWithIndex(req , res){
        try{
            const user_id = req.userId
            const data = await OrderServ.Get_Order_WithIndex(user_id)
            if(data){
                return res.status(data.status).json({
                    orderes: data.data,
                    message: data.message
                })
            }
        }
        catch(error){
            return res.status(500).json({
                message: error.message
            })
        }
    }

    async GetOrderById (req , res){
    try{
            const order_id = req.params.order_id
            const data = await OrderServ.Get_Order_ById(order_id)
            if(data){
                return res.status(data.status).json({
                    order: data.data,
                    message: data.message
                })
            }
        }
        catch(error){
            return res.status(500).json({
                message: error.message
            })
        }
    }

    async GetOrderByIdWithIndex(req , res){
        try{
            const order_id = req.params.order_id
            const data = await OrderServ.Get_Order_ById_WithIndex(order_id)
            if(data){
                return res.status(data.status).json({
                    order: data.data,
                    message: data.message
                })
            }
        }
        catch(error){
            return res.status(500).json({
                message: error.message
            })
        }
    }

    async ConfirmOrder(req , res){
        try{
            const data = await OrderServ.Confirm_Order(req.params.order_id)
            if(data){
                return res.status(data.status).json({
                    message: data.message
                })
            }
        }
        catch(error){
            return res.status(500).json({
                message: error.message
            })
        }

    }
   
}

module.exports = new OrderController()