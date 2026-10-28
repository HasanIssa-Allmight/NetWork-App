const Joi = require('joi')

const photoschema = Joi.object({
        photo:Joi.object({
        fieldname : Joi.string().required(),
        originalname : Joi.string().required(),
        encoding : Joi.string().required(),
        mimetype : Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required()
                .messages({'any.only' : "the image must be png , jpg or jpeg"}),
        buffer: Joi.binary().required()
})})

module.exports = photoschema