const ProductServ = require('../services/ProductServices')
const photoschema = require('../SchemaValidator/PhotoSchema')

class ProductsController {

    async AddProduct(req , res){
        try{
            const {name , products_v} = req.body
            let photo_path = null
                if(req.file){
                    const validate_photo = {
                        photo : req.file
                    }
                    const {err} = photoschema.validate(validate_photo , {abortEarly: false })
                    if(err){
                        return res.status(400).json({
                            message : "photo error"
                        })
                    }
                    photo_path = validate_photo.photo.filename
                }
            const data = await ProductServ.Add_Product(name , products_v , photo_path)
            
            if(data){
                return res.status(data.satus).json({
                    message: data.message,
                })
            }
        }
        catch(err){
            return res.status(500).json({
                message:err.message
            })
        }
    }

    async GetProducts (req , res){
        try{
            const data = await ProductServ.Get_Products()
        
            if(data.products){
                return res.status(data.stauts).json({
                    message: data.message,
                    products: data.products
                })
            }
            else{
                return res.satuts(data.status).json({
                    message:data.message,
                })
            }
        }
        catch(err){
            return res.status(500).json({
                message:err.message
            })
        }
    }

    async GetProductById(req , res){
        try{
            const data = await ProductServ.Get_Product_ById(req.params.id)
        
            if(data.product){
                return res.status(data.stauts).json({
                    message: data.message,
                    product: data.product
                })
            }
            else{
                return res.satuts(data.status).json({
                    message:data.message,
                })
            }
        }
        catch(err){
            return res.status(500).json({
                message:err.message
            })
        }
    }

    async DeleteProduct(req , res){
        try{
            const data = await ProductServ.Delete_Product(req.params.id)
        
            if(data){
                return res.status(data.stauts).json({
                    message: data.message,
                })
            }
        }
        catch(err){
            return res.status(500).json({
                message:err.message
            })
        }
    }
}

module.exports = new ProductsController()