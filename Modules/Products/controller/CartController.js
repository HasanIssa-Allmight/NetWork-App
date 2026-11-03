const CartServ = require('../services/CartServices')
const Response = require('../../../Response/response')

class CartController{
    async AddToCart(req,res){
        try{
            const user_id = req.userId
            const {amount} = req.body
            if(!amount){
                const resp = Response.validate("amounnt is required")
                return res.satuts(resp.status).json({
                    message : resp.message
                })
            }
            if(amount < 0){
                const resp = Response.validate("amount should be greater than 0")
                return res.satuts(resp.status).json({
                    message : resp.message
                })
            }
            const data = await CartServ.Add_To_Cart(user_id , req.params.product_id , amount)
            if (data) {
                return res.status(data.status).json({
                    message: data.message,
                })
            }
        }
        catch(err){
            return res.status(500).json({
                message:err.message
            })
        }
    }
    async GetProductCart(req,res){
        try{
            const user_id = req.userId
            const data = await CartServ.Get_ProductCart(user_id)
            if(data){
                return res.status(data.status).json({
                    message: data.message,
                    products: data.data
                })
            }
        }
        catch(err){
            return res.status(500).json({
                message:err.message
            })
        }
    }
    async DeleteProductcart(req , res){
        try{
            const user_id = req.userId
            const data = await CartServ.Delete_Productcart(user_id , req.params.product_id)
            if(data){
                return res.status(data.status).json({
                    message: data.message,
                })
            }
        }
        catch(err){
            return res.status(500).json({
                message:err.message
            })
        }
    }
}
module.exports= new CartController()