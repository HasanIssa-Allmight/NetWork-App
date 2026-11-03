const Cart = require('../model/Cart')
const Response = require('../../../Response/response')

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
  }

module.exports= new CartServices()