const Joi = require('joi')
const value =['xl' , 'l' , 'med']

const Addproductvalid = Joi.object({
    name:Joi.string().required(),
    products_v: Joi.object({
        price:Joi.number().integer().min(0).required(),
        discreption:Joi.string().required(),
        type:Joi.string().valid(...value).required(),
        colore:Joi.string().required(),
    })
})

module.exports = Addproductvalid