const { LoginDetails } = require('../routes/models')
// const LoginSystemInfo = require('../models/LoginSystemInfo');
const Crypto = require('crypto')
const { Response } = require('./Response');
const Jwt = require('jsonwebtoken')
const { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } = require('http-status-codes');
require('dotenv').config();
//(JSON RESPONSE) status,token,code,message,data,validity,specialmessage

module.exports = {
    LoginUsingJwt: (req, res) => {
        console.log(req.body)
        let Password = Crypto.createHash('sha256').update(req.body.password).digest('base64')
        console.log(Password)
        LoginDetails.findOne({
            where: {
                email: req.body.email
            }
        }).then((response) => {
            if (response == null) {
                res.send(Response(ReasonPhrases.UNAUTHORIZED, null, StatusCodes.UNAUTHORIZED, "UserNotFound", null, 0, ""))
            }
            else {
                if (response.dataValues.password == Password) {
                    console.log(response.dataValues)
                    const Token=generateAccessToken(response.dataValues)
                    res.send(Response(ReasonPhrases.OK, Token, StatusCodes.OK, "Success", response.dataValues, 1, ""))
                }
                else {
                    res.send(Response(ReasonPhrases.UNAUTHORIZED, null, StatusCodes.UNAUTHORIZED, "Incorrect Password", null, 0, ""))
                }
            }
        }).catch((error) => {
            res.send(Response(ReasonPhrases.UNAUTHORIZED, null, StatusCodes.UNAUTHORIZED, error.message, null, 0, ""))
        })
    },
}

function generateAccessToken(user) {
    return Jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })
}