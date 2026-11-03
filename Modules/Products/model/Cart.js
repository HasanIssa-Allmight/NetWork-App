const mongoose = require('mongoose')

const cartschema = new mongoose.Schema({
  user_id :{
     type: mongoose.Schema.Types.ObjectId,
    required:true,
    unique:true
  },
  prodect_id :{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    unique:true
  },
  quantity:{
    type:Number,
    default:1,

  }
})

const Cart = mongoose.model('Cart',cartschema)
module.exports =Cart