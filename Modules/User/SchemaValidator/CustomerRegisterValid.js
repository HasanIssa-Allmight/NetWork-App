const Joi = require('joi')

const Customerregistervalid = Joi.object({
    user_name:Joi.string().required().min(3),
    email:Joi.string().email().required(),
    password:Joi.string().min(8).required(),
    password_confirmation:Joi.string().valid(Joi.ref('password')).required()
})

module.exports = Customerregistervalid