const express = require('express')
const routes = express.Router()

const ProductsController = require('../controller/ProductsController')
const valid = require('../../../middleware/validerror')
// const requireAuth = require('../../../middleware/AuthMiddelWare')
const Addproductvalid = require('../SchemaValidator/AddProductValid')

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

routes.post('/AddProduct' , [upload.single('photo'),valid(Addproductvalid)] , ProductsController.AddProduct)
routes.get('/GetProducts' , ProductsController.GetProducts)
routes.get('/GetProductById/:id' , ProductsController.GetProductById)
routes.delete('/DeleteProduct/:id' , ProductsController.DeleteProduct)


module.exports = routes