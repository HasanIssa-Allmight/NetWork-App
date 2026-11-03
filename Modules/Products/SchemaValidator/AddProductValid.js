const Joi = require('joi')
const value =['xl' , 'l' , 'med']

const Addproductvalid = Joi.object({
    name:Joi.string().required(),
    products_v: Joi.object({
        price:Joi.number().integer().min(0).required(),
        discreption:Joi.string().required(),
        type:Joi.string().valid(...value).required(),
        colore:Joi.string().required(),
        image:Joi.object({
                fieldname : Joi.string().required(),
                originalname : Joi.string().required(),
                encoding : Joi.string().required(),
                mimetype : Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required()
                        .messages({'any.only' : "the image must be png , jpg or jpeg"}),
                buffer: Joi.binary()
        }).unknown(true).required(),
    }),
    catigores:Joi.string().required(),
    quantity: Joi.number().required().min(0)
})

module.exports = Addproductvalid