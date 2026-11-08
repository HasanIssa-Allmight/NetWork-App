const {faker} = require('@faker-js/faker')

const User = require('../Modules/User/model/User')
const Order = require('../Modules/Order/model/Order')

class Faker {


    async UserFaker (){

        const Total_User = 1
        let user = []
        for(let i=0; i<Total_User ; i++){
            user[i] = {
                user_name : faker.person.fullName(),
                email: `user${i}_${faker.internet.email().toLowerCase()}`,
                password : faker.internet.password()
            } 
        }
        await User.insertMany(user , {ordered:false})
        process.exit()
    }

    async OrderFaker(){
        const Total_Order = 10
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



}
module.exports = new Faker()