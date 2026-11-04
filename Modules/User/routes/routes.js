const express = require('express')

const routes = express.Router()
const loginLimiter = require('../Limiter/loginlimiter')

const UserController = require('../controller/UserController')
const valid = require('../../../middleware/validerror')
const costumerregistervalid = require('../SchemaValidator/CustomerRegisterValid')
const LoginValid = require('../SchemaValidator/LoginValid')

routes.post('/CustomerRegister',valid(costumerregistervalid), UserController.CustomerRegister)
routes.post('/Login',[valid(LoginValid) , loginLimiter ] ,UserController.UserLogin)
routes.post('/AdminRegister' , valid(costumerregistervalid) , UserController.AdminRegister)

module.exports = routes