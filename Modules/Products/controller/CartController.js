const CartServ = require('../services/CartServices')

class CartController{
    async AddToCart(req,res){
        try{
       
        const data = await CartServ.Add_To_Cart(req.params.id)
            if (data) {
                return res.status(data,status).json({
                     message: data.message,
                })
            }else{

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
            const data = await CartServ.Get_ProductCart(req.params.id)
        
            if(data.products){
                return res.status(data.stauts).json({
                    message: data.message,
                    products: data.products
                })
            }
            else{
                return res.satuts(data.status).json({
                    message:data.message,
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
                 const data = await CartServ.Delete_Productcart(req.params.id)
             
                 if(data){
                     return res.status(data.stauts).json({
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