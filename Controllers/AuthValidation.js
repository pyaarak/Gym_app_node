const jwt=require('jsonwebtoken');
require('dotenv').config();
const {Response} = require('./Response');
const { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } = require('http-status-codes');


function getTokenFromHeaders(req){
    // console.log(req.headers)
    const token =
        req.body.token || req.query.token || req.headers['authorization']

    if (!token) return token
    return token.split(" ")[1]
}

module.exports={
    ValidateToken:(req,res,next)=>{
        const Token=getTokenFromHeaders(req)
        if(Token){
            jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.send(Response(ReasonPhrases.UNAUTHORIZED, null, StatusCodes.UNAUTHORIZED, err.message , null, 0, ""))
                } else {
                    req.decoded = decoded
                    req.token=Token
                    next()
                }
            })
        }
        else{
            console.log("LIIIIIIIIIIIIIIIIIII")
        }
    }
}