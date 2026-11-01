const ProductServ = require('../services/ProductServices')
const photoschema = require('../SchemaValidator/PhotoSchema')
const Addproductvalid = require('../SchemaValidator/AddProductValid')

class ProductsController {

    async AddProduct(req , res){
        try{
            if(req.roleId != 'admin'){
                return res.status(401).json({
                    message:'unAuthanticated'
                })
            }
            const valid_obj = {
                name: req.body.name,
                products_v: {
                    price: req.body.products_v.price, 
                    discreption: req.body.products_v.discreption,
                    type: req.body.products_v.type ,
                    colore: req.body.products_v.colore ,
                    image: req.file
                },
                catigores: req.body.catigores
            }
            const {error} = Addproductvalid.validate(valid_obj)
            if (error) {
                const formattedErrors = error.details.map(err => ({
                    field: err.context.key, 
                    message: err.message.replace(/"/g, '')
                }));

                return res.status(400).json({
                    success: false,
                    errors: formattedErrors
                });
            }
            const {name , products_v , catigores} = valid_obj
            products_v.image = valid_obj.products_v.image.filename
            const data = await ProductServ.Add_Product(name , products_v , catigores)
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
            if(req.roleId != 'admin'){
                return res.status(401).json({
                    message:'unAuthanticated'
                })
            }
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