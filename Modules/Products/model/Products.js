const mongoose = require('mongoose')

const productschema = new mongoose.Schema({
    name:{
        type:String ,
        required: true
    },
    products_v:{
        price:{
            type:Number , require:true
        },
        discreption:{
            type:String,
            required:true
        },
        type:{
            type:String,
            enum:['xl' , 'med' , 'l'],
            default: 'l',
            required: true
        },
        colore:{
            type:String,
            required:true
        },
    },
    image:{
        type:String,
        required: true
    },
    created_at:{
        type:Date,
        default: Date.now
    }
})

const Products =  mongoose.model('Products' , productschema)

module.exports = Products