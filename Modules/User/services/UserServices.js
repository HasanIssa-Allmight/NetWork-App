const User = require('../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UserServices{
    async Customer_Register(user_name,email,password){
        const info={}
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password,salt)
        let token = null
        const user = await User.create(
            {
                user_name:user_name,
                email:email,
                password:hashpassword,
                role:'customer'
            }
        ) 
        if(user){
          token= jwt.sign({
                id:user._id,
                role:user.role
          },process.env.JWT_SECRET)

          info.token= token
          info.message="User created Successfully"
          info.status=201
          return info
        }
        else{
          info.message="faild to create user"
          info.status=200
          return info
        }
    }
     async Admin_Register(user_name,email,password){
        const info={}
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password,salt)
        let token = null
        const user = await User.create(
            {
                user_name:user_name,
                email:email,
                password:hashpassword,
                role:'admin'
            }
        ) 
        if(user){
          token= jwt.sign({
            id:user._id,
            role:user.role
          },process.env.JWT_SECRET)

          info.token= token
          info.message="User created Successfully"
          info.status=201
          return info
        }
        else{
          info.message="faild to create user"
          info.status=200
          return info
        }
    }
    async User_Login(email,password){
        const info={}

        const user = await User.findOne({
            email: email
        })
        if(user){
            const isMatch = await bcrypt.compare(password , user.password)
            if(isMatch){
                const token= jwt.sign({
                    id:user._id,
                    role:user.role
                },process.env.JWT_SECRET)
                const role = user.role
                if(role == "customer"){
                    info.token= token
                    info.message="customer Login Successfully"
                    info.status=200
                    return info
                }
                else{
                    info.token= token
                    info.message="Admin Login Successfully"
                    info.status=200
                    return info
                }
            }
            else{
                info.message="Password is not correct"
                info.status=404
                return info
            }   
        }
        else{
            info.message="user not found"
            info.status=404
            return info
        }
    }
}

module.exports = new UserServices()