const express = require('express')
const ConnectDB = require('./database/connection')
const cors = require('cors') 
const server = express()

server.use(express.json())
server.use(
    cors({
        origin:'*',
        credentials : true
    })
)

ConnectDB()

server.listen('4000' , (err)=>{
    if(err){
        console.log('server not connect')
    }
    else{
        console.log('server is runinng on port 4000 ...')
    }
})