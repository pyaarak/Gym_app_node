const Crypto = require('crypto')
const { Response } = require('./Response');
const Jwt = require('jsonwebtoken')
const { Users, Report, workouts, LoginDetails, Enquiry } = require('../routes/models')
const sgMail = require('@sendgrid/mail')
const fs = require('fs');
const AWS = require('aws-sdk');
const { Op,fn,col } = require('sequelize');
// const Sequelize = require('sequelize');
const { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } = require('http-status-codes');
require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId: "AKIAQ4A5WZDG3CRE3ZSU",
    secretAccessKey: "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"
});

const uploadFile = async (fileName) => {
       let dataLocation=""
       const params = {
           Bucket: 'fikadocs', // pass your bucket name
           Key: fileName.name, // file will be saved as testBucket/contacts.csv
           Body: fileName.data,
           ACL: "public-read"
       };
       const promise= new Promise(function(resolve,reject){
          s3.upload(params, async function(s3Err, data) {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)
            dataLocation= await data.Location
            resolve(dataLocation)
          })
       })
       return promise
       
};

module.exports={
    CreateEnquiry:(req,res)=>{
        Enquiry.create(req.body).then((response) => {
            res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response.dataValues, 1, getReasonPhrase(StatusCodes.OK)))
        }).catch((error) => {
            res.send(Response(ReasonPhrases.INTERNAL_SERVER_ERROR, req.token, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null, 1, null))
        }) 
    },
    DeleteEnquiry:(req,res)=>{
        Enquiry.destroy({
            where:{
                id:req.params.id
            }
        }).then((response) => {
            res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response.dataValues, 1, getReasonPhrase(StatusCodes.OK)))
        }).catch((error) => {
            res.send(Response(ReasonPhrases.INTERNAL_SERVER_ERROR, req.token, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null, 1, null))
        }) 
    },
    CreateUser:(req,res)=>{
        Users.create(req.body).then((response) => {
            res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response.dataValues, 1, getReasonPhrase(StatusCodes.OK)))
        }).catch((error) => {
            res.send(Response(ReasonPhrases.INTERNAL_SERVER_ERROR, req.token, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null, 1, null))
        }) 
    },
    EnquiryDetails:(req,res)=>{
        Enquiry.findAll({
           where:{
             status:1
           }
        }).then((response)=>{
            console.log(response)
            if(response.length > 0){
                res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response, 1, getReasonPhrase(StatusCodes.OK)))
            }
            else{
                res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response, 1, getReasonPhrase(StatusCodes.OK)))
            }
        }).catch((error)=>{
            res.send(Response(ReasonPhrases.INTERNAL_SERVER_ERROR, req.token, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null, 1, null)) 
        })
    },
    UserDetails:(req,res)=>{
        Users.findAll({
           where:{
             status:1
           }
        }).then((response)=>{
            console.log(response)
            if(response.length > 0){
                res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response, 1, getReasonPhrase(StatusCodes.OK)))
            }
            else{
                res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response, 1, getReasonPhrase(StatusCodes.OK)))
            }
        }).catch((error)=>{
            res.send(Response(ReasonPhrases.INTERNAL_SERVER_ERROR, req.token, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null, 1, null)) 
        })
    },
    TrainerDetails:(req,res)=>{
       LoginDetails.findAll({
        where:{
            role:2
        }
       }).then((response)=>{
           res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response, 1, getReasonPhrase(StatusCodes.OK)))
       }).catch((error)=>{
           res.send(Response(ReasonPhrases.INTERNAL_SERVER_ERROR, req.token, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null, 1, null))
       })
    },
    UniqUserDetails:(req,res)=>{
        Users.findOne({
            where:{
                id:req.params.id
            },
            include: [
               {model:Report},{model:workouts}
            ]
        }).then((response)=>{
            if(response.dataValues != undefined){
                res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response, 1, getReasonPhrase(StatusCodes.OK)))
            }
            else{
                res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response, 1, getReasonPhrase(StatusCodes.OK)))
            }
        }).catch((error)=>{
            res.send(Response(ReasonPhrases.INTERNAL_SERVER_ERROR, req.token, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null, 1, null))
        })
    },
    UniqWorkoutDetails:(req,res)=>{
        workouts.findOne({
            where:{
                id:req.params.id
            }
        }).then((response)=>{
            if(response.dataValues != undefined){
                res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response, 1, getReasonPhrase(StatusCodes.OK)))
            }
            else{
                res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response, 1, getReasonPhrase(StatusCodes.OK)))
            }
        }).catch((error)=>{
            res.send(Response(ReasonPhrases.INTERNAL_SERVER_ERROR, req.token, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null, 1, null))
        })
    },
    UpdateUserDetails:(req,res)=>{
        Users.update(req.body,{
            where:{
                id:req.params.id
            }
        }).then((response)=>{
            res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response, 1, getReasonPhrase(StatusCodes.OK)))
        }).catch((error)=>{
            res.send(Response(ReasonPhrases.INTERNAL_SERVER_ERROR, req.token, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null, 1, null))
        })
    },
    CreateReport:async (req,res)=>{
        console.log(req.files.file,"liiii")
        // console.log(req.body)
        const email=req.body.email
        // console.log(email)
        sgMail.setApiKey("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")
        const msg = {
            to: email,
            from: 'alifdeen.haja@codoid.com',
            subject: 'Rport From Fika',
            text: `This is your ${req.body.reportcycle} report`,
            attachments: [
                {
                  content: req.files.file.data.toString("base64"),
                  filename: "attachment.pdf",
                  type: "application/pdf",
                  disposition: "attachment"
                }
              ],
          }
          sgMail
            .send(msg)
            .then(async (response) => {
              await uploadFile(req.files.file).then((res1)=>{
                Report.findOne({
                    where:{
                        User_id:req.body.User_id,
                        status:0,
                        reportdate:{[Op.ne]:null}
                    }
                }).then((response)=>{
                    if(response == null){
                        req.body.status = 0
                        req.body.reportdate=new Date().getFullYear()+"-"+String(Number(new Date().getMonth())+1)+"-"+new Date().getDate()
                        let reportremaider=new Date(new Date().setDate(new Date().getDate() + 45))
                        req.body.report_document=res1
                        req.body.reportremaider=reportremaider.getFullYear()+"-"+String(Number(reportremaider.getMonth())+1)+"-"+reportremaider.getDate()
                        console.log('Email sent')
                        Report.create(req.body).then((response) => {
                                // console.log(response)
                                
                                res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response.dataValues, 1, getReasonPhrase(StatusCodes.OK)))
                        }).catch((error) => {
                                // console.log(error)
                                res.send(Response(ReasonPhrases.INTERNAL_SERVER_ERROR, req.token, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null, 1, null))
                        }) 
                    } 
                    else{
                       Report.update({status:1},{
                           where:{
                              id:response.id
                           }
                       }).then((response)=>{
                        req.body.status = 0
                        req.body.reportdate=new Date().getFullYear()+"-"+String(Number(new Date().getMonth())+1)+"-"+new Date().getDate()
                        let reportremaider=new Date(new Date().setDate(new Date().getDate() + 45))
                        req.body.report_document=res1
                        req.body.reportremaider=reportremaider.getFullYear()+"-"+String(Number(reportremaider.getMonth())+1)+"-"+reportremaider.getDate()
                        console.log('Email sent')
                        Report.create(req.body).then((response) => {
                                // console.log(response)
                                
                            res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response.dataValues, 1, getReasonPhrase(StatusCodes.OK)))
                        }).catch((error) => {
                                // console.log(error)
                            res.send(Response(ReasonPhrases.INTERNAL_SERVER_ERROR, req.token, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null, 1, null))
                        }) 
                       })
                    }
                })
              })
            })
            .catch((error) => {
              console.error(error)
            })
    },
    CreateAttendance:async (req,res)=>{
        // console.log(req.files.file,"liiii")
        // console.log(req.body)
        sgMail.setApiKey("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")
        const msg = {
            to: req.body.email,
            from: 'alifdeen.haja@codoid.com',
            subject: 'Attendance From Fika',
            text: `This is your ${req.body.attandancecycle} attedance report`,
            attachments: [
                {
                  content: req.files.file.data.toString("base64"),
                  filename: "attachment.pdf",
                  type: "application/pdf",
                  disposition: "attachment"
                }
              ],
          }
          sgMail
            .send(msg)
            .then(async (response) => {
              await uploadFile(req.files.file).then((res1)=>{
                    Report.findOne({
                        where:{
                            User_id:req.body.User_id,
                            status:0,
                            attendancedate:{[Op.ne]:null}
                        }
                    }).then((response)=>{
                        if(response == null){
                            req.body.status = 0
                            req.body.attendancedate=new Date().getFullYear()+"-"+String(Number(new Date().getMonth())+1)+"-"+new Date().getDate()
                            let reportremaider=new Date(new Date().setDate(new Date().getDate() + 45))
                            req.body.attendance_document=res1
                            req.body.attendanceremainder=reportremaider.getFullYear()+"-"+String(Number(reportremaider.getMonth())+1)+"-"+reportremaider.getDate()
                            console.log('Email sent')
                            Report.create(req.body).then((response) => {
                                // console.log(response)
                                res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response.dataValues, 1, getReasonPhrase(StatusCodes.OK)))
                            }).catch((error) => {
                                // console.log(error)
                                res.send(Response(ReasonPhrases.INTERNAL_SERVER_ERROR, req.token, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null, 1, null))
                            })
                        } 
                        else{
                           Report.update({status:1},{
                               where:{
                                  id:response.id
                               }
                           }).then((response)=>{
                            req.body.status = 0
                            req.body.attendancedate=new Date().getFullYear()+"-"+String(Number(new Date().getMonth())+1)+"-"+new Date().getDate()
                            let reportremaider=new Date(new Date().setDate(new Date().getDate() + 45))
                            req.body.attendance_document=res1
                            req.body.attendanceremainder=reportremaider.getFullYear()+"-"+String(Number(reportremaider.getMonth())+1)+"-"+reportremaider.getDate()
                            console.log('Email sent')
                            Report.create(req.body).then((response) => {
                                // console.log(response)
                                res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response.dataValues, 1, getReasonPhrase(StatusCodes.OK)))
                            }).catch((error) => {
                                // console.log(error)
                                res.send(Response(ReasonPhrases.INTERNAL_SERVER_ERROR, req.token, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null, 1, null))
                            })
                           })
                        }
                    })
              })
            })
            .catch((error) => {
              console.error(error)
            })
    },
    CreateWorkouts:(req,res)=>{
        workouts.create(req.body).then((response) => {
            res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response.dataValues, 1, getReasonPhrase(StatusCodes.OK)))
        }).catch((error) => {
            res.send(Response(ReasonPhrases.INTERNAL_SERVER_ERROR, req.token, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null, 1, null))
        }) 
    },
    WorkoutsUpdate:(req,res)=>{
        console.log(req.body)
        workouts.update(req.body,{
            where:{
                id:req.params.id
            }
        }).then((response)=>{
            res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response.dataValues, 1, getReasonPhrase(StatusCodes.OK)))
        }).catch((error)=>{
            res.send(Response(ReasonPhrases.INTERNAL_SERVER_ERROR, req.token, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null, 1, null))
        })
    },
    ReportRemainders:(req,res)=>{
        // =new Date();
        const date=new Date(new Date().setDate(new Date().getDate() + 3))
        const date1=date.getFullYear()+"-"+String(Number(date.getMonth())+1)+"-"+date.getDate()
        console.log(date1)
        Report.findAll({
            where:{
                reportremaider:{[Op.lte]:date1},
                status:0
            },
            include:[
               {model:Users,where:{status:1}} 
            ]
         }).then((response)=>{
            if(response.length > 0){
                // console.log(response,"liii")
                res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response, 1, getReasonPhrase(StatusCodes.OK)))
            }
            else{
                res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", [], 1, getReasonPhrase(StatusCodes.OK)))
            }
         }).catch((error)=>{
             console.log(error)
             res.send(Response(ReasonPhrases.INTERNAL_SERVER_ERROR, req.token, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null, 1, null)) 
         })
    },
    AttendanceRemainders:(req,res)=>{
        // const date=new Date();
        const date=new Date(new Date().setDate(new Date().getDate() + 3))
        const date1=date.getFullYear()+"-"+String(Number(date.getMonth())+1)+"-"+date.getDate()
        Report.findAll({
            where:{
                attendanceremainder:{[Op.lte]:date1},
                status:0,
            },
            include:[
                {model:Users,where:{status:1}} 
            ]
        }).then((response)=>{
            if(response.length > 0){
                res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response, 1, getReasonPhrase(StatusCodes.OK)))
            }
            else{
                res.send(Response(ReasonPhrases.OK, req.token, StatusCodes.OK, "Success", response, 1, getReasonPhrase(StatusCodes.OK)))
            }
        }).catch((error)=>{
             res.send(Response(ReasonPhrases.INTERNAL_SERVER_ERROR, req.token, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null, 1, null)) 
        })
    }
}