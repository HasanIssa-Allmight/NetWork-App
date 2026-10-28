const express = require('express')
const ConnectDB = require('./database/connection')
const cors = require('cors') 
const body_parser = require('body-parser')
const server = express()

server.use(express.json())
server.use(body_parser.json())
server.use(body_parser.urlencoded({extended : true}))
server.use(
    cors({
        origin:'*',
        credentials : true
    })
)


ConnectDB()

//files
server.use('/uploads', express.static('uploads'));

//model
require('./Modules/Products/model/Products')

//routes
const ProductRoutes =require('./Modules/Products/routes/routes')


server.use('/' , ProductRoutes)

server.listen('4000' , (err)=>{
    if(err){
        console.log('server not connect')
    }
    else{
        console.log('server is runinng on port 4000 ...')
    }
})