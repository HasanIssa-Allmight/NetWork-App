const express = require('express')
const routes = express.Router()

const ProductsController = require('../controller/ProductsController')
const CartController = require('../controller/CartController')
const valid = require('../../../middleware/validerror')
const requireAuth = require('../../../middleware/AuthMiddelWare')

const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
                    destination: function(req,file,cb){
                        cb(null , "./uploads")
                    },
                    filename: function(req , file , cb){
                        cb(null , Date.now() + path.extname(file.originalname))
                    }
                })
const upload = multer({storage : storage})

routes.post('/AddProduct' , [requireAuth , upload.single('image')] , ProductsController.AddProduct)
routes.get('/GetProducts' , ProductsController.GetProducts)
routes.get('/GetProductById/:id' , ProductsController.GetProductById)
routes.delete('/DeleteProduct/:id' ,requireAuth, ProductsController.DeleteProduct)

routes.post('/AddToCart/:product_id',requireAuth , CartController.AddToCart)
routes.get('/GetProductCart',requireAuth,CartController.GetProductCart)
routes.delete('/DeleteProductCart/:product_id' ,requireAuth, CartController.DeleteProductcart)
//redis
routes.post('/AddToCartRedis/:product_id',requireAuth , CartController.AddToCartRedis)
routes.get('/GetProductCartRedis',requireAuth,CartController.GetProductCartRedis)
routes.delete('/DeleteProductCartRedis/:product_id' ,requireAuth, CartController.DeleteProductcartRedis)

module.exports = routes