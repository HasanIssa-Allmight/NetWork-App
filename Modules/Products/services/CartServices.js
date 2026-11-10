const Cart = require('../model/Cart')
const Response = require('../../../Response/response')
const redis = require('../../../infrastructure/redis/redis')
const {logResults} = require('../../../Logging/Logger')

class CartServices{

  async Add_To_Cart(user_id , product_id , amount){
      const cart = await Cart.findOne({
          user_id: user_id
      })
      if(cart){
          const product = await Cart.findOne({
              user_id: user_id,
              product_id: product_id
          })
          if(product){
              product.quantity = product.quantity + amount
              await product.save()
              const res = Response.success(null)
              return res
          }
          else{
              await Cart.create({
                  user_id: user_id,
                  product_id: product_id,
                  quantity: amount
              })
              const res = Response.createdSuccess()
              return res
          }
      }
      else{
        await Cart.create({
                  user_id: user_id,
                  product_id: product_id,
                  quantity: amount
              })
              const res = Response.createdSuccess()
              return res
      }
  }


  async Get_ProductCart(user_id){
      const cart = await Cart.find({
          user_id: user_id
      })
      if (cart){
            logResults('cartlog' , 'Befor_Index' , {
                stage: state.queryPlanner.winningPlan.stage,
                docsExamined: state.executionStats.totalDocsExamined,
                returned: state.executionStats.nReturned,
                timeMs: state.executionStats.executionTimeMillis,
            })
          const res = Response.success(cart)
          return res
      }
      else{
          const res = Response.notFound()
          return res
      }
  }

  async Delete_Productcart(user_id , product_id){
        const cartItem = await Cart.findOne({
            user_id:user_id,
            product_id:product_id
          })
        if (cartItem.length < 0) {
            const res = Response.notFound()
            return res
        }
        if(cartItem.quantity > 1){
            cartItem.quantity -= 1
            await cartItem.save();
            const res = Response.success(null)
            return res
        }
        else{
            await Cart.findOneAndDelete({
                user_id, 
                product_id 
              });
            const res = Response.success(null)
            return res
        }
      }
    async Get_CartItem(user_id){
        const cart = await Cart.find({
            user_id: user_id
        })
        if(cart){
            return cart
        }
        else{
            return null
        }
    }
  
  //redis
  async Add_To_Cart_Redis(user_id , product_id , amount){
    const cart_key =`cart:${user_id}`
      const cart = await redis.exists(cart_key)
      if(cart){
          const product = await redis.hExists(cart_key,String(product_id))
          if(product){
             await redis.multi()
           .hIncrBy(cart_key,String(product_id), amount)               
           .expire(cart_key, 1200)
           .exec();
              const res = Response.success(null)
              return res
          }
          else{
            
        await redis.multi()
        .hSet(cart_key, String(product_id), amount)            
        .expire(cart_key, 1200)
        .exec();
              const res = Response.createdSuccess()
              return res
          }
      }
      else{
        await redis.multi()
        .hSet(cart_key, String(product_id), amount)            
        .expire(cart_key, 1200)
        .exec();
              const res = Response.createdSuccess()
              return res
      }
  }
  async Get_ProductCart_Redis(user_id){
      const cart_key =`cart:${user_id}`
      const cart=  await redis.hGetAll(cart_key)
      if (cart){  
            logResults('cartlog' , 'Befor_Index' , {
                stage: state.queryPlanner.winningPlan.stage,
                docsExamined: state.executionStats.totalDocsExamined,
                returned: state.executionStats.nReturned,
                timeMs: state.executionStats.executionTimeMillis,
            })
          const res = Response.success(cart)
          return res
      }
      else{
        await Cart.find({
          user_id: user_id
      })
          const res = Response.notFound()
          return res
      }
  }
  async Delete_Productcart_Redis(user_id , product_id){
    const cart_key = `cart:${user_id}`
    const product = await redis.hGet(cart_key,String(product_id))

        if (Number(product) > 1) {
             await redis.multi()
             .hIncrBy(cart_key,String(product_id),-1)
             .expire(cart_key,1200)
             .exec()
           const res = Response.success(null)
            return res
        }
        else{
            await redis.hDel(cart_key,String(product_id))
            const res = Response.success(null)
            return res
        }
      }
}
  
module.exports= new CartServices()