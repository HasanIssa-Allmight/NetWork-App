const Cart = require('../model/Cart')

class CartServices{

  async Add_To_Cart(user_id,product_id){
    const info={}
  const cart = await Cart.findOne({user_id:user_id})
  if(!cart){
    cart =await Cart.create({user_id:cart.user_id,
        product_id:cart.product_id,
        quantity:cart.quantity})
  }else
    {
    const product = cart.findOne({
     product_id: product_id
  })
  if(product){
    cart.quantity +=1
   await cart.save()
    info.message="product added to cart"
    info.status=200
    return info
  }else{
    const new_product = cart.create({user_id:cart.user_id,product_id:cart.product_id,quantity:cart.quantity})
    info.message="product added to cart"
    info.status=200
    return info
  }}
  }
 async Get_ProductCart(cart_id){
    const info={}
    const cart = await Cart.find({cart_id:{cart_id}})
    if (cart){
      info.message="successfull"
      info.cart= cart
      info.status=200
      return info
    }else{
       info.message="Product Not Found "
      info.status=404
      return info
    }
 }
 async Delete_Productcart(product_id){
    const info ={}
    const deleted = await Cart.findByIdAndDelete({product_id:{product_id}})
    if(deleted){
            info.message = "product deleted successfully"
            info.stauts = 200
            return info
        }
        else{
            info.message = "faild to delete product"
            info.stauts = 400
            return info
        }
 }
}
module.exports= new CartServices()