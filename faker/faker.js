const {faker} = require('@faker-js/faker')

const User = require('../Modules/User/model/User')
const Order = require('../Modules/Order/model/Order')
const Products = require('../Modules/Products/model/Products')
const OrderItem = require('../Modules/Order/model/OrderItems')
const Cart = require('../Modules/Products/model/Cart')

const bcrypt = require('bcryptjs')


class Faker {


    async UserFaker (){

        const Total_User = 1000
        let user = []
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash("12345678",salt)
        const roles = ["admin","customer"]

        for(let i=0; i<Total_User ; i++){
            user[i] = {
                user_name : faker.person.fullName(),
                email: `user${i}_${faker.internet.email().toLowerCase()}`,
                password : hashpassword,
                role: faker.helpers.arrayElement(roles)
            } 
        }
        await User.insertMany(user , {ordered:false})
        process.exit()
    }

    async OrderFaker(){
        const Total_Order = 100000
        const Batch_Size = 10
        const Status = ['draft ' ,'confirmed' ,'complete']

        const users = await User.find().select('_id').lean()
        
        for(let i= 0 ; i<Total_Order ; i +=Batch_Size){
            const batch = Array.from({length: Batch_Size} , ()=>({
                user_id: users[Math.floor(Math.random()*users.length)]._id,
                name: faker.commerce.productName(),
                price: faker.number.int({min:10 , max:100}),
                status : faker.helpers.arrayElement(Status),
                created_at : faker.date.past({years:2})
            }))
            await Order.insertMany(batch , {ordered:false})
        }
        process.exit()
    }

    async ProductsFaker (){
        const TotalProducts = 1000
        let product = []
        const types = ['xl' , 'med' , 'l']
        const colores = ['red' , 'green' , 'blue' , 'black']
        const catigores = ['shose' , 'suite' , 'bag']
        for(let i=0 ; i<TotalProducts ; i++){
            product[i] ={
                name: `prod ${i}`,
                products_v:{
                    price: faker.number.int({min:20 , max:1000}),
                    discreption:"its cool product",
                    type: faker.helpers.arrayElement(types),
                    colore: faker.helpers.arrayElement(colores),
                    image: "1794130843703.png",
                },
                catigores: faker.helpers.arrayElement(catigores)
            }
        }
        await Products.insertMany(product)
        process.exit()
    }

    async OrderItemFaker(){
        const order = await Order.find().select('_id').lean()
        const product = await Products.find().select('_id').lean()
        const TotalOrderItem = order.length
        let orderItem = []
        for(let i=0 ; i<TotalOrderItem ; i++){
            orderItem[i] = {
                order_id :  order[Math.floor(Math.random()*order.length)]._id,
                product_id : product[Math.floor(Math.random()*product.length)]._id,
                amount : faker.number.int({min:1 , max:10}),
                price :  faker.number.int({min:100 , max:1000})
            }
        }
        await OrderItem.insertMany(orderItem)
        process.exit()
    }

    async CartFaker(){
        const Total = 1000
        let cart = []
        const users = await User.find().select('_id').lean()
        const product = await Products.find().select('_id').lean()
        for(let i=0 ; i<Total ; i++){
            cart[i] = {
                user_id: users[i]._id,
                product_id: product[Math.floor(Math.random()*product.length)]._id,
                quantity : faker.number.int({min:1 , max:10}),
            }
        }
        await Cart.insertMany(cart)
    }
}
module.exports = new Faker()