const { message } = require('../SchemaValidator/CustomerRegisterValid')
const UserServ = require('../services/UserServices')

class UserController{

    async CustomerRegister(req , res){
        try{
            const {user_name , email , password} = req.body

            const data = await UserServ.Customer_Register(user_name , email , password)
            if(data.status == 201){
                return res.status(data.status).json({
                    message: data.message,
                    token: data.token
                })
            }
            else{
                return res.status(data.status).json({
                    message: data.message,
                })
            }
        }
        catch(err){
            return res.status(500).json({
                message: err.message,
            })
        }
    }
    async UserLogin(req,res){
        try{
          const {email,password} = req.body
          const data = await UserServ.User_Login(email,password)
          if (data.status==200){
            return res.status(data.status).json({
                message:data.message,
                token: data.token
            })
          }else{
            return res.status(data.status).json({
                message:data.message
            })
          }
        }catch(err){
          return res.status(500).json({
            message:err.message
          })
        }
    }

    
}

module.exports = new UserController()