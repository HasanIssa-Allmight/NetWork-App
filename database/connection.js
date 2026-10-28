const Mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:'./.env'})

const ConnectDB = async ()=>{
    try{
        await Mongoose.connect(process.env.dburl)
        console.log('database connected successfullu ...')
    }
    catch(err){
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = ConnectDB