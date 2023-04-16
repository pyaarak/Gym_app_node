const Router=require('express').Router()

module.exports={
    Response:(status,token,code,message,data,validity,specialmessage)=>{
        return {
            "session": {
                "token":token,
                "validity":validity,
                "specialMessage": specialmessage
            },
            "data":data,
            "status": {
                "code":code,
                "status":status,
                "message": message
            }
        }
    }
}