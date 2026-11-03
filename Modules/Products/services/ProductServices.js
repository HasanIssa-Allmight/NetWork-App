const Products = require('../model/Products')


class ProductServices {

    async Add_Product (name , products_v , catigores){
        const info = {}
        const product = await Products.create({
            name: name,
            products_v: products_v,
            catigores: catigores
        })
        if(product){
            info.message = "product added successfull"
            info.satus = 201
            return info
        }
        else{
            info.message = "faild to add product"
            info.satus = 201
            return info
        }
    }
    async Get_Products(){
        const info = {}

        const products = await Products.find()
        if(products){
            info.message = "successfull"
            info.products = products
            info.stauts = 200
            return info
        }
        else{
            info.message = "Products not found"
            info.stauts = 404
            return info
        }
    }

    async Get_Product_ById(id){
        const info = {}

        const product = await Products.findById(id)
        if(product){
            info.message = "successfull"
            info.product = product
            info.stauts = 200
            return info
        }
        else{
            info.message = "Products not found"
            info.stauts = 404
            return info
        }
    }

    async Delete_Product(id){
        const info = {}
        const deleted = await Products.findByIdAndDelete(id)
        if(deleted){
            info.message = "product deleted successfully"
            info.stauts = 200
            return info
        }
        else{
            info.message = "faild to delete product"
            info.stauts = 400
            return info
        }
    }

    async Get_Product_For_Order (product_id){
        const product = await Products.findById(product_id)
        if(product){
            return product
        }
        return null
    }
}

module.exports = new ProductServices()