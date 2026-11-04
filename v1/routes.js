const express = require('express')

const router = express.Router()

//routes
const ProductRoutes =   require('../Modules/Products/routes/routes')
const UserRoutes = require('../Modules/User/routes/routes')
const OrderRoutes = require('../Modules/Order/routes/routes')

router.use('/product' , ProductRoutes)
router.use('/user' , UserRoutes)
router.use('/order' , OrderRoutes)

module.exports = router

