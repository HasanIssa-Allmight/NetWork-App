
class Response {

    success(data){
        const info = {}
        info.message = "successfull"
        info.status = 200
        if(data != null){
            info.data = data
            return info
        }
        return info
    }

    notFound(){
        return {
            message: "not found",
            status : 401
        }
    }

    createdSuccess(){
        return {
            message: "data created successfully",
            status: 201
        }
    }

    UnAuthanticated(){
        return {
            message: "unAuthanticated",
            status: 401
        }
    }

    serverErorr(){
        return {
            message: "server error",
            status: 500
        }
    }
    
    validate(message){
        return {
            message: "message",
            status : 400
        }
    }
}

module.exports = new Response()