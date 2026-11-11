const mongoose = require('mongoose')

const productschema = new mongoose.Schema({
    name:{
        type:String ,
        required: true
    },
    products_v:{
        price:{
            type:Number , required:true
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
        image:{
            type:String,
            get: function(rawValue) {
                return rawValue ? `http://localhost:4000/uploads/${rawValue}` : null;
            }
        }
    },
    catigores:{
        type:String,
        required: true
    }},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


productschema.set('toJSON', { getters: true });
productschema.set('toObject', { getters: true });

const Products =  mongoose.model('Products' , productschema)

module.exports = Products