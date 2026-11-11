const Products = require('../model/Products')
const Inventory = require('../../../src/grpc/inventoryClient')
const mongoose = require('mongoose')

class ProductServices {

    async Add_Product (name , products_v , catigores , quantity){
        const info = {}
        const product = await Products.create({
            name: name,
            products_v: products_v,
            catigores: catigores
        })
        const pro = await Products.findById(product._id).read('secondary')
        const idToString = pro._id.toString()
        const quant = await Inventory.addQuantity(quantity , idToString)
        if(product){
            info.message = quant.message
            info.satuts = 201
            return info
        }
        else{
            info.message = "faild to add product"
            info.satuts = 400
            return info
        }
    }
    async Get_Products(){
        const info = {}

        const products = await Products.find().sort({_id:1}).read('secondary')
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

        const product = await Products.findById(id).read('secondary')
        if(product){
            const idToString = product._id.toString()
            const quantity = await Inventory.getAmount(idToString)
            if(quantity.stauts != 404)  {
                info.quantity = quantity.quantity
                info.message = "successfull"
                info.product = product
                info.stauts = 200
                return info
            }
            else{
                info.message = "product not found in inventory"
                info.stauts = 404
                return info
            }

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
        const product = await Products.findById(product_id).read('secondary')
        if(product){
            return product
        }
        return null
    }

    async Get_Products_By_Ids(ids) {
        const objId = ids.map(id => new mongoose.Types.ObjectId(id))
        return await Products.find({ _id: { $in: objId } }).lean()
    }
}

module.exports = new ProductServices()