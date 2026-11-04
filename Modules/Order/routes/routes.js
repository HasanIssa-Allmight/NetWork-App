const express = require('express')
const routes = express.Router()

const OrderController = require('../controller/OrderController')
const requireAuth = require('../../../middleware/AuthMiddelWare')

routes.post('/CreateOrder' , requireAuth , OrderController.CreateOrder)
routes.get('/GetOrderes' , requireAuth , OrderController.GetOrderes)
routes.get('/GetOrderById/:order_id' , requireAuth , OrderController.GetOrderById)
routes.post('/ConfirmOrder/:order_id' , requireAuth , OrderController.ConfirmOrder)


module.exports = routes