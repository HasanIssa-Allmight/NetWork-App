const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    user_name :{
     type:String,
     unique:true,
     required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","customer"]
    }
    
})
const User = mongoose.model('User',userschema)

module.exports = User